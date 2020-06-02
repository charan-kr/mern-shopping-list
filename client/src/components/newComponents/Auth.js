import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Auth.css";
import { NavLink, Alert } from "reactstrap";
import { registerUser } from "../../actions/userAction";
import { loginUser } from "../../actions/userAction";

function Auth(props) {
  const error = useSelector(state => state.error);
  const auth = useSelector(state => state.auth.isAuthenticated);
  const { msg } = error;

  useEffect(() => {
    auth && props.history.push("/");
    msg && setAlert("alert error");
  }, [auth, msg]);

  const [overlay, setOverlay] = useState("contain");
  const [alert, setAlert] = useState("alert");
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });
  const clear = () => {
    setLogin({ email: "", password: "" });
    setRegister({ email: "", password: "", name: "" });
    setAlert("alert");
  };
  const dispatch = useDispatch();

  const signUpOverlay = () => {
    setOverlay("contain right-panel-active");
    clear();
  };
  const signInOverlay = () => {
    setOverlay("contain");
    clear();
  };

  const handleRegister = e => {
    const { name, value } = e.target;
    setRegister(prevState => ({
      ...prevState,
      [name]: value
    }));
    setAlert("alert");
  };

  const handleLogin = e => {
    const { name, value } = e.target;
    setLogin(prevState => ({
      ...prevState,
      [name]: value
    }));
    setAlert("alert");
  };

  const submitRegister = e => {
    e.preventDefault();
    dispatch(registerUser(register));
  };

  const submitLogin = e => {
    e.preventDefault();
    dispatch(loginUser(login));
  };

  return (
    <div className="auth">
      <div className={overlay} id="contain">
        <NavLink style={{ width: "fit-content" }} className="m-0" href="/">
          <i className="fa fa-window-close" aria-hidden="true"></i>
        </NavLink>
        <div className="form-contain sign-up-contain">
          <form>
            <h1>Create Account</h1>
            <div className="social-contain">
              <a href="/" className="social">
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="/" className="social">
                <i className="fa fa-google-plus" aria-hidden="true"></i>
              </a>
              <a href="/" className="social">
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={register.name}
              onChange={handleRegister}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={register.email}
              onChange={handleRegister}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={register.password}
              onChange={handleRegister}
            />
            <button onClick={submitRegister}>Sign Up</button>
          </form>
        </div>
        <div className="form-contain sign-in-contain">
          <Alert color="warning" className={alert}>
            {msg}
          </Alert>
          <form>
            <h1>Sign in</h1>
            <div className="social-contain">
              <a href="/" className="social">
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="/" className="social">
                <i className="fa fa-google-plus" aria-hidden="true"></i>
              </a>
              <a href="/" className="social">
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </a>
            </div>
            <span>or use your account</span>
            <input
              value={login.email}
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleLogin}
            />
            <input
              value={login.password}
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleLogin}
            />
            <a href="/">Forgot your password?</a>
            <button onClick={submitLogin}>Sign In</button>
          </form>
        </div>
        <div className="overlay-contain">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button onClick={signInOverlay} className="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button onClick={signUpOverlay} className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
