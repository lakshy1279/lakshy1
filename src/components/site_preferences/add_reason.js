import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import {useHistory } from "react-router-dom";

function AddReason() {
  const [reason, setReason] = useState("");

  const handleChange = (e) => {
    setReason(e.target.value);
  };
  const history=useHistory();
  const AddReason = (e) => {
    e.preventDefault();
   console.log(reason);
    axios
      .post("https://lakshy12.herokuapp.com/reason/save", {
       reason:reason
      })
      .then((response)=> {
        // handle success
        console.log(response.data);
        history.push("/reason");
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
          <div className="admin-head">Reason</div>
          <div className="admin-data">
            <div className="container-fluid p-0">
              <form
                className="form-contact contact_form"
                onSubmit={AddReason}
              >
                <div className="row m-0">
                  <div className="col-lg-12 p-0">
                    <div className="form-group tags-field row m-0">
                      <label className="col-lg-2 p-0">Reason</label>
                      <input
                        className="form-control col-lg-6"
                        onChange={handleChange}
                        value={reason}
                        type="text"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = ''"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 p-0">
                    <div className="form-group tags-field  row m-0">
                      <label className="col-lg-2 p-0" />
                      <div className="col-lg-6 p-0">
                        <button className="button button-contactForm boxed-btn">
                          Save
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

export default AddReason;
