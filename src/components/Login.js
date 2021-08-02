import React, { useState } from "react";
import axios from "axios";
import { Link, Route, useParams, Redirect, useHistory } from "react-router-dom";

function Login() {
  const [User, setUser] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const { email, password } = User;
  
  const handleChange = (email) => (event) => {
    setUser({ ...User, [email]: event.target.value });
  };

  console.log(email, password);

  const Lo = () => {
    axios
      .post("https://lakshy12.herokuapp.com/admin/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));

        history.push("/dashboard");
      });
  };

  return (
    <div>
      <div className="h-100 w-100 bg-color">
        <div className="login-box">
          <div className="login-logo">
            <img src="assets/img/logo/logo.svg" />
          </div>
          <form className="form-contact contact_form">
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <input
                    className="form-control"
                    onChange={handleChange("email")}
                    value={email}
                    name="email"
                    type="text"
                    onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Username'"
                    placeholder="Username*"
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="password"
                    onChange={handleChange("password")}
                    value={password}
                    name="password"
                    onfocus="this.placeholder = ''"
                    onblur="this.placeholder = '******'"
                    placeholder="******"
                  />
                </div>
              </div>
            </div>
            <div className="form-group mt-3 mb-0">
              <div className="w-100 btn  boxed-btn" onClick={Lo()}>
                Login
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
