import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import SimpleReactValidator from "simple-react-validator";
class AddSubMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submenu: "",
      description: "Default Description!",
      image: "",
      menu: "Default Description!",
      date: Date.now(),
      mobile_message: "",
      validError: false,
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
  componentDidMount() {
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

  handleSubmit(event) {
    event.preventDefault();
    if (this.validator.allValid()) {
      console.log(this.state.image);
      const data = new FormData();
      data.append("submenu", this.state.submenu);
      // data.append("image", this.state.image);
      // data.append("description", this.state.description);
      data.append("menu", this.state.menu);
      // data.append("date", this.state.date);
      console.log(data.append("image", this.state.image.name));
      // console.log(this.state.image);

      axios
        .post(`https://trw-backend-api.herokuapp.com/admin/add_sub_menu`, data)
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });

      this.props.history.push("/sub_menu");
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   const data = new FormData();
  //   data.append("submenu", this.state.submenu);
  //   data.append("file", this.state.image);
  //   data.append("description", this.state.description);
  //   data.append("menu", this.state.menu);
  //   data.append("date", this.state.date);
  //   console.log(data);
  //   fetch("https://localhost:5000/admin/add_sub_menu", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: data,
  //   });
  // }

  // add = (e) => {
  //   e.preventDefault();

  //   console.log(Banner);

  //   const formdata = new FormData();

  //   formdata.append("title", title);
  //   formdata.append("file", Banner.bannerimage);
  //   formdata.append("category", category);
  //   formdata.append("startdate", startdate);
  //   formdata.append("enddate", enddate);
  //   formdata.append("status", status);

  //   axios
  //     .post("https://api.shott.tech/admin/Addbanner", formdata)
  //     .then(function (response) {
  //       // handle success

  //       console.log(response.data);

  //       setBanner(response.data);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     });
  // };

  //   subMenuNameChange(e) {
  //     this.setState({
  //       menu: e.target.value,
  //     });
  //     if (this.state.validError != true) {
  //       axios.get(`https://trw-backend-api.herokuapp.com/admin/menus`).then((res) => {
  //         if (this.state.menu > 0) {
  //           this.setState({
  //             mobile_message: "Menu already exist",
  //             validError: false,
  //           });
  //         } else {
  //           this.setState({ mobile_message: "", validError: true });
  //         }
  //       });
  //     }
  //   }

  onFileChange(e) {
    this.setState({ image: e.target.files[0] });
  }

  render() {
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Sub Menu - Add New</div>
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

                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Upload Image</label>
                        <input
                          type="file"
                          onChange={this.onFileChange}
                          className="form-control col-lg-10"
                        />

                        {this.validator.message(
                          "Image",
                          this.state.image,
                          "required"
                        )}
                      </div>

                      <div className="form-group tags-field row m-0">
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
                          "required|whitespace|min:40|max:70"
                        )}
                      </div>

                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Menu Name</label>

                        <select
                          className="form-control col-lg-10"
                          name="menu"
                          onChange={this.handleChange}
                        >
                          <option>Select Menu</option>
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
          </div>
        </div>
      </div>
    );
  }
}

export default AddSubMenu;
