require('dotenv/config');
const path = require('path');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const uploadsMiddleware = require('./uploads-middleware');
const errorMiddleware = require('./error-middleware');
// const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
}

app.use(express.static(publicPath));
app.use(express.json());

app.post('/api/auth/sign-up', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(400, 'email and password are required fields');
  }

  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
      insert into "users" ("email", "hashedPassword")
      values ($1, $2)
      returning "userId", "email", "createdAt"
      `;

      const params = [email, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(400, 'invalid login');
  }

  const sql = `
  select "userId",
         "hashedPassword"
     from "users"
    where "email" = $1
  `;
  const params = [email];

  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, email };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

// app.use(authorizationMiddleware);

app.post('/api/profiles', uploadsMiddleware, (req, res, next) => {
  const { name, gender, height, weight, birthdate } = req.body;
  const userId = 3;
  // const userId = req.user.userId;

  if (!name || !gender) {
    throw new ClientError(400, 'name and gender are required');
  }

  const photoUrl = '/images/' + req.file.filename;

  const sql = `
  insert into "babies" ("userId", "name", "gender", "height", "weight", "birthdate", "photoUrl")
  values ($1, $2, $3, $4, $5, $6, $7)
  returning *
  `;

  const params = [userId, name, gender, height, weight, birthdate, photoUrl];

  db.query(sql, params)
    .then(result => {
      const [image] = result.rows;
      res.status(201).json(image);
    })
    .catch(err => next(err));
});

app.get('/api/profiles', (req, res, next) => {
  // const userId = Number(req.user.userId);

  const sql = `
  select *
    from "babies"
  `;

  db.query(sql)
    .then(result => {
      const [baby] = result.rows;
      res.json(baby);
    })
    .catch(err => next(err));
});

app.post('/api/babyLogs', (req, res, next) => {
  const { typeOfCare } = req.body;

  // const babyId = req.baby.babyId;
  const babyId = 8;

  if (!typeOfCare) {
    throw new ClientError(400, 'typeOfCare is required');
  }

  const sql = `
  insert into "babyLogs" ("babyId", "typeOfCare")
  values ($1, $2)
  returning
    "babyLogId",
    "babyId",
    "typeOfCare",
    to_char("createdAt", 'YYYY-MM-DD') as "createdAt"
`;

  const params = [babyId, typeOfCare];

  db.query(sql, params)
    .then(result => {
      const log = result.rows[0];
      res.status(201).json(log);
    })
    .catch(err => next(err));

});

app.get('/api/babyLogs', (req, res, next) => {
  const sql = `
  select *
  from "babyLogs"
  `;

  db.query(sql)
    .then(result => {
      const logs = result.rows;

      let group = logs.reduce((ac, a) => {
        const key = new Date(a.createdAt).toISOString().split('T')[0];
        ac[key] = (ac[key] || []).concat(a);
        return ac;
      }, {});

      group = Object.entries(group).map(([k, v]) => ({ [k]: v }));

      const reversed = group.reverse();
      res.json(reversed);
    })
    .catch(err => next(err));
});

app.delete('/api/babyLogs/:babyLogId', (req, res, next) => {
  const babyLogId = Number(req.params.babyLogId);

  if (!Number.isInteger(babyLogId) || babyLogId < 0) {
    throw new ClientError(400, 'babyLogId must be positive integer');
  }

  const sql = `
  delete from "babyLogs"
  where "babyLogId" = $1
  returning
  "babyLogId",
    to_char("createdAt", 'YYYY-MM-DD') as "createdAt"
`;

  const params = [babyLogId];

  db.query(sql, params)
    .then(result => {
      const log = result.rows[0];

      if (!log) {
        res.status(404).json({
          error: `cannot find babyLog with babyLogId ${babyLogId}`
        });
        return;
      }
      res.json(log);
    }).catch(err => next(err));

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
