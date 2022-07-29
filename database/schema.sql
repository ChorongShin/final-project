set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."babies" (
	"babyId" serial NOT NULL,
  "userId" integer NOT NULL,
	"name" TEXT NOT NULL,
	"gender" TEXT NOT NULL,
	"height" integer NOT NULL,
	"weight" integer NOT NULL,
	"birthdate" TIMESTAMPTZ NOT NULL,
  "photoUrl" TEXT NOT NULL,
	CONSTRAINT "babies_pk" PRIMARY KEY ("babyId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."journals" (
	"journalId" serial NOT NULL,
  "babyId" integer NOT NULL,
	"title" TEXT NOT NULL,
	"photoUrl" TEXT NOT NULL,
	"note" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ NOT NULL default now(),
	CONSTRAINT "journals_pk" PRIMARY KEY ("journalId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."growths" (
	"growthId" serial NOT NULL,
  "babyId" integer NOT NULL,
	"date" DATE NOT NULL,
	"weight" integer NOT NULL,
	"height" integer NOT NULL,
	"headCircumference" integer NOT NULL,
	CONSTRAINT "growths_pk" PRIMARY KEY ("growthId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."babyLogs" (
	"babyLogId" serial NOT NULL,
  "babyId" integer NOT NULL,
	"typeOfCare" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL default now(),
	CONSTRAINT "babyLogs_pk" PRIMARY KEY ("babyLogId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "babies" ADD CONSTRAINT "babies_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "journals" ADD CONSTRAINT "journals_fk0" FOREIGN KEY ("babyId") REFERENCES "babies"("babyId");
ALTER TABLE "growths" ADD CONSTRAINT "growths_fk0" FOREIGN KEY ("babyId") REFERENCES "babies"("babyId");
ALTER TABLE "babyLogs" ADD CONSTRAINT "babyLogs_fk0" FOREIGN KEY ("babyId") REFERENCES "babies"("babyId");
