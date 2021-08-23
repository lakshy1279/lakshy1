import axios from "axios";
import React from "react";
import Sidebar from "../Sidebar";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SimpleReactValidator from "simple-react-validator";
import '../../App.css'
class AddProgram extends React.Component {
    constructor(props) {
        super(props);
        this.organisation = React.createRef();
        this.facilitator = React.createRef();
        this.organisationList = [];
        this.facilitatorList=[];
        this.state = {
            photo: "",
            description: "",
            heading:"",
            apply: "",
            date:"",
            facilitatorName:[],
            organisationName:[],
            organisationSuggestions: [],
            suggestions:[],
            facilitator:[],
            organisation:[],
            text: "",
            organisationText: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
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

  componentDidMount()
  {
    axios
    .get(`https://lakshy12.herokuapp.com/facilitator/fetch`)
    .then((res) => {
      res?.data.map((name) => {
        this.setState({
          facilitatorName: [
            ...this.state.facilitatorName,
            `${name.firstname} ${name.lastname}`,
          ]
        });
      });
    });
    axios
    .get(`https://lakshy12.herokuapp.com/organisation/fetch`)
    .then((res) => {
      res?.data.map((org) => {
        this.setState({
          organisationName: [...this.state.organisationName, org.name],
        });
      });
    });
  }
  //handle facilitator input
  onTextChanged(e) {
    this.setState({ text: e.target.value });
    let suggestions = [];
    if (this.state.text.length > 0) {
      const regex = new RegExp(`^${this.state.text}`, "i");

      suggestions = this.state.facilitatorName
        .sort()
        .filter((v) => regex.test(v));
    }

    this.setState({
      suggestions: suggestions,
    });
  }
  //set facilitator
  setFacilitator(facilitator) {
    this.facilitator.current.value = "";
    if (!this.facilitatorList.includes(facilitator)) {
      this.facilitatorList.push(facilitator);
    }

    this.setState({
      facilitator: this.facilitatorList,
      suggestions: [],
      text: "",
    });
  }
//   focus facilitator input
focusInput() {
    this.facilitator.current.focus();
}
// handel organisation input
onOrganisationChange(e) {
    this.setState({ organisationText: e.target.value });

    let organisationSuggestions = [];
    if (this.state.organisationText.length > 0) {
      const regex = new RegExp(`^${this.state.organisationText}`, "i");

      organisationSuggestions = this.state.organisationName
        .sort()
        .filter((v) => regex.test(v));
    }
    this.setState({
      organisationSuggestions: organisationSuggestions,
    });
  }
  // set organisation
  setOrganisation(organisation) {
    this.organisation.current.value = "";
    if (!this.organisationList.includes(organisation)) {
      this.organisationList.push(organisation);
    }

    this.setState({
      organisation: this.organisationList,
      organisationSuggestions: [],
      organisationText: "",
    });
  }
  // focus organisation input
  focusOrgInput() {
    this.organisation.current.focus();
  }
    handleChange(html) {
        this.setState({ description: html });
        console.log(this.state.description);
    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleThemeChange(newTheme) {
        if (newTheme === "core") newTheme = null;
        this.setState({ theme: newTheme });
    }

    onFileChange(e) {
        this.setState({ photo: e.target.files[0] });
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.validator.allValid()) {
            console.log(this.state);
            const formdata = new FormData();
            formdata.append("apply", this.state.apply);
            formdata.append("heading", this.state.heading);
            formdata.append("description", this.state.description);
            formdata.append("photo", this.state.photo);
            formdata.append("date", this.state.date);
            for (let i = 0; i < this.state.facilitator.length; i++) {
                formdata.append("facilitator", this.state.facilitator[i]);
              }
              for (let i = 0; i < this.state.organisation.length; i++) {
                formdata.append("organisation", this.state.organisation[i]);
              }
            axios
                .post(
                    "https://lakshy12.herokuapp.com/program/save",
                    formdata
                )
                .then((response)=> {
                    // handle success
                    this.props.history.push("/program");
                    console.log(response.data);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        console.log(this.state)

        return (
            <div>
                <Sidebar></Sidebar>
                <div className="admin-wrapper col-12">
                    <div className="admin-content">
                        <div className="admin-head">Add Program</div>
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
                                                <label className="col-lg-2 p-0">Program Heading</label>
                                                <input
                                                    className="form-control col-lg-10"
                                                    name="heading"
                                                    onChange={this.onChange}
                                                    value={this.state.heading}
                                                    type="text"
                                                    onfocus="this.placeholder = 'Menu Name'"
                                                    onblur="this.placeholder = ''"
                                                    placeholder="Heading"
                                                />
                                                {this.validator.message(
                                                    "heading",
                                                    this.state.heading,
                                                    "required"
                                                )}
                                                {/* {this.state.mobile_message} */}
                                            </div>

                                           

                                            <div className="form-group tags-field row m-0">
                                                <label className="col-lg-2 p-0">Image</label>
                                                <input
                                                    type="file"
                                                    onChange={this.onFileChange}
                                                    name="photo"
                                                    className="form-control col-lg-10"
                                                />

                                                {this.validator.message(
                                                    "photo",
                                                    this.state.photo,
                                                    "required"
                                                )}
                                            </div>
                                            <div className="form-group tags-field row m-0">
                                                <label className="col-lg-2 p-0">Apply</label>
                                                <input
                                                    className="form-control col-lg-10"
                                                    name="apply"
                                                    onChange={this.onChange}
                                                    value={this.state.apply}
                                                    type="text"
                                                    onfocus="this.placeholder = 'Menu Name'"
                                                    onblur="this.placeholder = ''"
                                                    placeholder="Url"
                                                />
                                                {this.validator.message(
                                                    "apply",
                                                    this.state.apply,
                                                    "required"
                                                )}
                                                {/* {this.state.mobile_message} */}
                                            </div>
                                            <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Add Facilitator</label>
                        <input
                          className="form-control col-lg-7"
                          name="facilitator"
                          ref={this.facilitator}
                          onChange={this.onTextChanged.bind(this)}
                          autocomplete="off"
                          value={this.state.text}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder=""
                        />
                        <button
                          onClick={this.focusInput.bind(this)}
                          className=" col-lg-2"
                          style={{ marginLeft: "1rem" }}
                        >
                          Add More +
                        </button>
                        <ul className="autoSuggestionList col-lg-5">
                          {this.state.suggestions.map((item) => {
                            return (
                              <li
                                onClick={this.setFacilitator.bind(this, item)}
                              >
                                {item}
                              </li>
                            );
                          })}
                        </ul>

                        {this.state.mobile_message}
                      </div>
                      {this.state.facilitator.length > 0 ? (
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">
                            Added Facilitator
                          </label>
                          <ul>
                            {this.state.facilitator.map((items) => {
                              return <li>{items}</li>;
                            })}
                          </ul>
                        </div>
                      ) : null}
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Add Organisation</label>
                        <input
                          className="form-control col-lg-7"
                          name="organisation"
                          ref={this.organisation}
                          onChange={this.onOrganisationChange.bind(this)}
                          autocomplete="off"
                          value={this.state.organisationText}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder=""
                        />
                        <button
                          onClick={this.focusOrgInput.bind(this)}
                          className=" col-lg-2"
                          style={{ marginLeft: "1rem" }}
                        >
                          Add More +
                        </button>
                        <ul className="autoSuggestionList col-lg-5">
                          {this.state.organisationSuggestions.map((item) => {
                            return (
                              <li
                                onClick={this.setOrganisation.bind(this, item)}
                              >
                                {item}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      {this.state.organisation.length > 0 ? (
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">
                            Added Organisation
                          </label>
                          <ul>
                            {this.state.organisation.map((items) => {
                              return <li>{items}</li>;
                            })}
                          </ul>
                        </div>
                      ) : null}
                                            <div className="form-group tags-field row m-0">
                                                <label className="col-lg-2 p-0">Date and Time</label>
                                                <input
                                                    className="form-control col-lg-10"
                                                    name="date"
                                                    onChange={this.onChange}
                                                    value={this.state.date}
                                                    type="datetime-local"
                                                    onfocus="this.placeholder = 'Menu Name'"
                                                    onblur="this.placeholder = ''"

                                                />
                                                {this.validator.message(
                                                    "date",
                                                    this.state.date,
                                                    "required"
                                                )}
                                                {/* {this.state.mobile_message} */}
                                            </div>
                                             <div className="form-group tags-field row m-0" >
                                                <label className="col-lg-2 p-0">Description</label>

                                                <ReactQuill
                                                    className=" col-lg-10 height"
                                                    // theme={this.state.theme}
                                                    onChange={this.handleChange}
                                                    value={this.state.description}
                                                // modules={AddEvent.modules}
                                                // formats={AddEvent.formats}
                                                // bounds={".app"}
                                                // placeholder={this.props.placeholder}
                                                />

                                                {this.validator.message(
                                                    "Description",
                                                    this.state.description,
                                                    "required"
                                                )}
                                            </div>

                                        </div>


                                        <div className="col-lg-12 p-0">
                                            <div className="form-group tags-field  row m-0">
                                                <label className="col-lg-2 p-0" />
                                                <div className="col-lg-6 p-0">
                                                    <button
                                                        className="button button-contactForm boxed-btn margin"
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

export default AddProgram;
