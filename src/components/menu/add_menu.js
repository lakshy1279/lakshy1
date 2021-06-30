import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import SimpleReactValidator from "simple-react-validator";
class AddMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: "",
      description: "Default Description",
      data: Date.now(),
      mobile_message: "",
      validError: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.menuNameChange = this.menuNameChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validator = new SimpleReactValidator({
      className: "text-danger",
      validators: {
        passwordvalid: {
          message:
            "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
            "ter and 1 alphabet.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,30}$/i
              ) && params.indexOf(val) === -1
            );
          },
        },
        passwordMismatch: {
          message: "confirm password must match with password field.",
          rule: function (val, params, validator) {
            return document.getElementById("password_input").value === val
              ? true
              : false;
          },
        },
        whitespace: {
          message: "The :attribute not allowed first whitespace   characters.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /[^\s\\]/) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialChar: {
          message: "The :attribute not allowed special   characters.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialCharText: {
          message: "The :attribute may only contain letters, dot and spaces.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },

        zip: {
          message: "Invalid Pin Code",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^(\d{5}(\d{4})?)?$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        website: {
          message: "The Url should be example.com ",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /(https(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
              ) && params.indexOf(val) === -1
            );
          },
        },
        Fax: {
          message: "Invalid fax number ",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i
              ) && params.indexOf(val) === -1
            );
          },
        },
      },
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validator.allValid()) {
      const menu = {
        menu: this.state.menu,
        description: this.state.description,
        date: Date.now(),
      };
      console.log(menu);
      axios
        .post(`https://trw-backend-api.herokuapp.com/admin/add_menu`, menu)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          this.props.history.push("/menu");
        });

    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  menuNameChange(e) {
    this.setState({
      menu: e.target.value,
    });
    if (this.state.validError != true) {
      axios
        .get(`https://trw-backend-api.herokuapp.com/admin/menus`)
        .then((res) => {
          if (this.state.menu > 0) {
            this.setState({
              mobile_message: "Menu already exist",
              validError: false,
            });
          } else {
            this.setState({ mobile_message: "", validError: true });
          }
        });
    }
  }
  render() {
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Menu - Add New</div>
            <div className="admin-data">
              <div className="container-fluid p-0">
                <form
                  className="form-contact contact_form"
                  onSubmit={this.handleSubmit}
                >
                  <div className="row m-0">
                    <div className="col-lg-12 p-0"></div>
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Menu Name</label>
                        <input
                          className="form-control col-lg-10"
                          name="menu"
                          onChange={this.menuNameChange}
                          value={this.state.menu}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder="Alt Text"
                        />
                        {this.validator.message(
                          "Menu Name",
                          this.state.menu,
                          "required|whitespace|min:1|max:20"
                        )}
                        {this.state.mobile_message}
                      </div>
                      {/* <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Description</label>
                        <textarea
                          className="form-control col-lg-10"
                          name="description"
                          onChange={this.handleChange}
                          value={this.state.description}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder=""
                        />
                        {this.validator.message(
                          "Description",
                          this.state.description,
                          "required|whitespace|min:40|max:200"
                        )}
                      </div> */}
                    </div>

                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field  row m-0">
                        <label className="col-lg-2 p-0" />
                        <div className="col-lg-6 p-0">
                          <button
                            className="button button-contactForm boxed-btn"
                            type="submit"
                          >
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
}

export default AddMenu;
