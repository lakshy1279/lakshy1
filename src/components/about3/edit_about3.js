import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import SimpleReactValidator from "simple-react-validator";
import Loader from "react-loader-spinner";
class EditAbout3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      designation: "",
      image: "",
      twitter: "",
      facebook: "",
      google: "",
      linkedIn: "",
      mobile_message: "",
      validError: false,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);

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
    const { _id } = this.props.match.params;
    console.log(_id);
    axios
      .get(
        `https://trw-backend-api.herokuapp.com/about/update_about3/${_id}`
      )
      .then((res) => {
        console.log(res.data);
        const about3 = {
          name: res.data.name,
          designation: res.data.designation,
          image: res.data.image,
          twitter: res.data.twitter,
          facebook: res.data.facebook,
          google: res.data.google,
          linkedIn: res.data.linkedIn ? res.data.linkedIn : "",
        };
        console.log(about3.title);
        this.setState({
          name: about3.name,
          designation: about3.designation,
          image: about3.image,
          twitter: about3.twitter,
          facebook: about3.facebook,
          google: about3.google,
          linkedIn: about3.linkedIn,
          loading: true,
        });
      });
  }

  onFileChange(e) {
    this.setState({ image: e.target.files[0] });
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
      formdata.append("name", this.state.name);
      formdata.append("designation", this.state.designation);
      formdata.append("file", this.state.image);
      formdata.append("twitter", this.state.twitter);
      formdata.append("facebook", this.state.facebook);
      formdata.append("google", this.state.google);
      formdata.append("linkedIn", this.state.linkedIn);

      axios
        .put(
          `https://trw-backend-api.herokuapp.com/about/update_about3_patch/${_id}`,
          formdata
        )
        .then((res) => console.log(res.data));

      this.props.history.push("/about_section_3");
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Edit Leadership Team</div>
            {this.state.loading ? (
              <div className="admin-data">
                <div className="col-lg-12 p-0 text-right mb-30">
                  <a href="/about_section_3">
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
                          <label className="col-lg-2 p-0">Name</label>
                          <input
                            className="form-control col-lg-10"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.name}
                            type="text"
                            onfocus="this.placeholder = 'Menu Name'"
                            onblur="this.placeholder = ''"
                            placeholder=""
                          />
                          {this.validator.message(
                            "Name",
                            this.state.name,
                            "required|whitespace|min:1|max:20"
                          )}
                        </div>
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">Designation</label>
                          <input
                            className="form-control col-lg-10"
                            name="designation"
                            onChange={this.handleChange}
                            value={this.state.designation}
                            type="text"
                            onfocus="this.placeholder = 'Menu Name'"
                            onblur="this.placeholder = ''"
                            placeholder=""
                          />
                          {this.validator.message(
                            "Designation",
                            this.state.designation,
                            "required|whitespace|min:1|max:40"
                          )}
                        </div>

                        <div className="form-group tags-field row m-0">
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
                          <label className="col-lg-2 p-0">Twitter Link</label>
                          <input
                            className="form-control col-lg-10"
                            name="twitter"
                            onChange={this.handleChange}
                            value={this.state.twitter}
                            type="text"
                            onfocus="this.placeholder = 'Menu Name'"
                            onblur="this.placeholder = ''"
                            placeholder=""
                          />
                          {this.validator.message(
                            "Twitter Link",
                            this.state.twitter,
                            "url"
                          )}
                        </div>
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">Facebook Link</label>
                          <input
                            className="form-control col-lg-10"
                            name="facebook"
                            onChange={this.handleChange}
                            value={this.state.facebook}
                            type="text"
                            onfocus="this.placeholder = 'Menu Name'"
                            onblur="this.placeholder = ''"
                            placeholder=""
                          />
                          {this.validator.message(
                            "Facebook Link",
                            this.state.facebook,
                            "url"
                          )}
                        </div>
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">Google Link</label>
                          <input
                            className="form-control col-lg-10"
                            name="google"
                            onChange={this.handleChange}
                            value={this.state.google}
                            type="text"
                            onfocus="this.placeholder = 'Menu Name'"
                            onblur="this.placeholder = ''"
                            placeholder=""
                          />
                          {this.validator.message(
                            "Google Link",
                            this.state.google,
                            "url"
                          )}
                        </div>
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">LinkedIn Link</label>
                          <input
                            className="form-control col-lg-10"
                            name="linkedIn"
                            onChange={this.handleChange}
                            value={this.state.linkedIn}
                            type="text"
                            onfocus="this.placeholder = 'Menu Name'"
                            onblur="this.placeholder = ''"
                            placeholder=""
                          />
                          {this.validator.message(
                            "LinkedIn Link",
                            this.state.linkedIn,
                            "url"
                          )}
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

export default EditAbout3;
