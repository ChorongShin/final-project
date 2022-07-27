import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      });

    // reset the form
    this.setState = {
      email: '',
      password: ''
    };
  }

  render() {
    const { action } = this.props;
    const { handleInputChange, handleSubmit } = this;
    const alternateActionHref = action === 'sign-up'
      ? '#sign-in'
      : '#sign-up';
    const alternateActionText = action === 'sign-up'
      ? 'Sign in instead'
      : 'Register now';
    const submitButtonText = action === 'sign-up'
      ? 'Register'
      : 'Log In';
    return (
        <form className="w-100" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              required
              autoFocus
              id="email"
              type="email"
              name="email"
              onChange={handleInputChange}
              className="form-control bg-light"
              placeholder="name@example.com" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
            required
            id="password"
            type="password"
            name="password"
            onChange={handleInputChange}
            className="form-control bg-light" />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <small>
              <a className="text-muted" href={alternateActionHref}>
                {alternateActionText}
              </a>
            </small>
            <button type="submit" className="btn btn-primary">
              {submitButtonText}
            </button>
          </div>
        </form>
    );
  }
}
