import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Link, Route, useParams, Redirect, useHistory } from "react-router-dom";
import { isAutheticated } from "../auth";

function Changepassword() {
  const {
    user: { name, _id, email },
  } = isAutheticated();

  const [Password, setPassword] = useState({
    password: "",
    passwordnew: "",
  });

  const handleChange = (e) => {
    setPassword({ password: e.target.value });
  };

  const handleChang = (e) => {
    setPassword({ passwordnew: e.target.value });
  };

  const updatepassword = (e) => {
    e.preventDefault();

    axios
      .post("https://trw-backend-api.herokuapp.com/admin/changepassword", {
        userid: _id,
        password: Password.password,
        passwordnew: Password.passwordnew,
      })
      .then(function (response) {
        // handle success

        console.log(response.data);
        alert(response.data.Error);
        setPassword(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <div>
      <Sidebar></Sidebar>
      <div className="admin-wrapper col-12">
        <div className="admin-content">
          <div className="admin-head">Change Password</div>
          <div className="admin-data">
            <div className="container-fluid p-0">
              <form
                className="form-contact contact_form"
                onSubmit={updatepassword}
              >
                <div className="row m-0">
                  <div className="col-lg-12 p-0">
                    <div className="form-group tags-field row m-0">
                      <label className="col-lg-2 p-0">Current Password</label>
                      <input
                        className="form-control col-lg-6"
                        onChange={handleChange}
                        value={Password.password}
                        type="password"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = ''"
                        placeholder="*******"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 p-0">
                    <div className="form-group tags-field  row m-0">
                      <label className="col-lg-2 p-0">New Password</label>
                      <input
                        className="form-control col-lg-6"
                        onChange={handleChang}
                        value={Password.passwordnew}
                        type="password"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = ''"
                        placeholder="*******"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 p-0">
                    <div className="form-group tags-field  row m-0">
                      <label className="col-lg-2 p-0" />
                      <div className="col-lg-6 p-0">
                        <button className="button button-contactForm boxed-btn">
                          Save Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Changepassword;
