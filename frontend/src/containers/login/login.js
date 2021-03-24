import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from 'react-router-dom';
import { login } from "../../actions/auth";
import { setMessage, clearMessage } from "../../actions/message";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message: login_error_message } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();
  const location = useLocation();

  const onChangeUsername = ({ target: { value }}) => {
    setUsername(value)
  };

  const onChangePassword = ({ target: { value }}) => {
    setPassword(value)
  };

  useEffect(() => {
    if(!isLoggedIn && login_error_message !== undefined && loading) {
      setLoading(false)
      dispatch(setMessage('Your credentials are not correct'))
      return
    }
  }, [login_error_message, isLoggedIn, dispatch, loading])

  useEffect(() => {
    if(isLoggedIn) {
      dispatch(clearMessage())
    }
  }, [isLoggedIn, dispatch])

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(setMessage(''))

    if (!username || !password) {
      dispatch(setMessage('Username or password not inserted'))
      return
    }

    setLoading(true)
    const { from } = location.state || { from: { pathname: "/" } };
    dispatch(login(username, password, from));
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span> Login</span>
            </button>
          </div>

          {message && message !== '' && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login
