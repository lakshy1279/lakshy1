import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Loader from "react-loader-spinner";
import SimpleReactValidator from "simple-react-validator";
class EditSubMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submenu: "",
      // description: "",
      // description1: "",
      // image: "",
      menu: "",
      mobile_message: "",
      validError: false,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    // this.subMenuNameChange = this.subMenuNameChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);

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
                /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
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
  // componentDidMount() {
  //   const { _id } = this.props.match.params;
  //   console.log(_id);
  //   axios
  //     .get(
  //       `https://trw-backend-api.herokuapp.com/admin/update_sub_menu/${_id}`
  //     )
  //     .then((res) => {
  //       console.log(res.data);

  //       this.setState(res.data);
  //     });

  //   this.menu();
  // }

  componentDidMount() {
    const { _id } = this.props.match.params;
    console.log(_id);
    axios
      .get(
        `https://trw-backend-api.herokuapp.com/admin/update_sub_menu/${_id}`
      )
      .then((res) => {
        console.log(res.data);
        const submenu = {
          submenu: res.data.submenu,
          // description: res.data.description,
          // description1: res.data.description1,
          // image: res.data.image,
          menu: res.data.menu,
        };
        console.log(submenu.sub_menu);
        this.setState({
          submenu: submenu.submenu,
          // description: submenu.description,
          // description1: submenu.description1,
          // image: submenu.image,
          menu: submenu.menu,
          loading: true,
        });
      });
    this.menu();
  }
  menu() {
    axios
      .get(`https://trw-backend-api.herokuapp.com/admin/menus`)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
        console.log(menus);
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(e) {
    const { _id } = this.props.match.params;
    e.preventDefault();
    if (this.validator.allValid()) {
      const formdata = new FormData();
      formdata.append("submenu", this.state.submenu);
      // formdata.append("description", this.state.description);
      // formdata.append("description1", this.state.description1);
      formdata.append("menu", this.state.menu);
      // formdata.append("file", this.state.image);
      axios
        .put(
          `https://trw-backend-api.herokuapp.com/admin/update_sub_menu_patch/${_id}`,
          formdata
        )

        .then((res) => console.log(res.data));

      this.props.history.push("/sub_menu");
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  onFileChange(e) {
    this.setState({ image: e.target.files[0] });
  }
  render() {
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Edit Sub Menu</div>
            {this.state.loading ? (
              <div className="admin-data">
                <div className="col-lg-12 p-0 text-right mb-30">
                  <a href="/sub_menu">
                    <button className="button button-contactForm boxed-btn">
                      Back
                    </button>
                  </a>
                </div>
                <div className="container-fluid p-0">
                  <form
                    className="form-contact contact_form"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="row m-0">
                      <div className="col-lg-12 p-0"></div>
                      <div className="col-lg-12 p-0">
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">Sub Menu Name</label>
                          <input
                            className="form-control col-lg-10"
                            name="submenu"
                            onChange={this.handleChange}
                            value={this.state.submenu}
                            type="text"
                            onfocus="this.placeholder = 'Menu Name'"
                            onblur="this.placeholder = ''"
                            placeholder=""
                          />
                          {this.validator.message(
                            "Sub Menu Name",
                            this.state.submenu,
                            "required|whitespace|min:1|max:20"
                          )}
                          {this.state.mobile_message}
                        </div>

                        {/* <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">Upload Image</label>
                          <input
                            type="file"
                            onChange={this.onFileChange}
                            name="file"
                            className="form-control col-lg-10"
                          />

                          {this.validator.message(
                            "Image",
                            this.state.image,
                            "required"
                          )}
                        </div>

                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">
                            Short Description
                          </label>
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
                            "required|whitespace|min:40|max:70"
                          )}
                        </div>
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">
                            Expand Description
                          </label>
                          <textarea
                            className="form-control col-lg-10"
                            name="description1"
                            onChange={this.handleChange}
                            value={this.state.description1}
                            type="text"
                            onfocus="this.placeholder = 'Menu Name'"
                            onblur="this.placeholder = ''"
                            placeholder=""
                          />
                          {this.validator.message(
                            "Description",
                            this.state.description1,
                            "required|whitespace|min:70|max:200"
                          )}
                        </div> */}

                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">Menu Name</label>

                          <select
                            className="form-control col-lg-10"
                            name="menu"
                            onChange={this.handleChange}
                          >
                            <option>{this.state.menu}</option>
                            {this.state.menus &&
                              this.state.menus.map((data, index) => {
                                return (
                                  <option value={data.menu} key={index}>
                                    {data.menu}
                                  </option>
                                );
                              })}
                          </select>

                          {this.validator.message(
                            "Menu Name",
                            this.state.menu,
                            "required"
                          )}
                          {this.state.mobile_message}
                        </div>
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
            ) : (
              <div style={{ marginLeft: "500px", marginTop: "200px" }}>
                {" "}
                <Loader
                  type="Circles"
                  color="#0029ff"
                  height={100}
                  width={100}
                  timeout={3000} //3 secs
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default EditSubMenu;
