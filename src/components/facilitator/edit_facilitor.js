import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SimpleReactValidator from "simple-react-validator";
import '../../App.css'
class EditFacilitator extends React.Component {
    constructor(props) {
        super(props);
        this.organisation=React.createRef();
        this.organisationList=[];
        console.log(this.props.match.params.id);
        this.state = {
            organisation:[],
            organisationName:[],
            suggestions:[],
            firstname: "",
            contactno:"",
            email:"",
            lastname: "",
            photo: "",
            profile:"",
            data:"",
            country:"",
            date: Date.now(),
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

    componentDidMount() {
        const _id  = this.props.match.params.id;
        console.log(_id);
        axios
            .get(`https://lakshy12.herokuapp.com/facilitator/fetch/${_id}`)
            .then((res) => {
                const data = res.data;
                console.log(data);
                this.setState({ firstname:data.firstname,lastname:data.lastname,country:data.country,photo:data.photo,profile:data.profile,organisation:data.organisation,email:data.email,contactno:data.contactno});
            });
            axios
      .get(`https://lakshy12.herokuapp.com/organisation/fetch`)
      .then((res) => {
        res?.data.map((name) => {
          this.setState({
            organisationName: [
              ...this.state.organisationName,
              `${name.name}`,
            ]
          });
        });
      });
    }

    handleChange(html) {
        this.setState({ profile: html });
        console.log(this.state.profile);
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
    onTextChanged(e)
  {
    this.setState({text:e.target.value});
    let suggestions=[];
    if(this.state.text.length>0)
    {
      const regex=new RegExp(`^${this.state.text}`, "i");
      suggestions=this.state.organisationName.sort().filter((v)=>regex.test(v));
    }
    this.setState({
      suggestions:suggestions
    })
  }
  //set Faciliatator
  setOrganisation(organisation)
  {
    this.organisation.current.value="";
    if(!this.organisationList.includes(organisation))
    {
      this.organisationList.push(organisation);
    }
    this.setState({
      organisation:this.organisationList,
      suggestions:[],
      text:"",
    })
  }
  // focus facilitator input
  focusInput()
  {
    this.organisation.current.focus();
  }
    handleSubmit(e) {
        e.preventDefault();
        const _id  = this.props.match.params.id;
        if (this.validator.allValid()) {
            console.log(this.state);
            const formdata = new FormData();
            formdata.append("firstname", this.state.firstname);
            formdata.append("lastname", this.state.lastname);
            formdata.append("profile", this.state.profile);
            formdata.append("photo", this.state.photo);
            formdata.append("country",this.state.country);
            formdata.append("email",this.state.email);
            formdata.append("contactno",this.state.contactno);
            for(let i=0;i<this.state.organisation.length;i++)
            {
                formdata.append("organisation",this.state.organisation[i]);
            }
            axios
                .put(
                    `https://lakshy12.herokuapp.com/facilitator/save/${_id}`,
                    formdata
                )
                .then(function (response) {
                    // handle success

                    console.log(response.data);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            this.props.history.push("/facilitator");
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
                        <div className="admin-head">Edit Facilitator</div>
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
                                                <label className="col-lg-2 p-0">First Name</label>
                                                <input
                                                    className="form-control col-lg-10"
                                                    name="firstname"
                                                    onChange={this.onChange}
                                                    value={this.state.firstname}
                                                    type="text"
                                                    onfocus="this.placeholder = 'Menu Name'"
                                                    onblur="this.placeholder = ''"
                                                    placeholder="First Name"
                                                />
                                                {this.validator.message(
                                                    "firstname",
                                                    this.state.firstname,
                                                    "required|whitespace|min:1|max:150"
                                                )}
                                                {/* {this.state.mobile_message} */}
                                            </div>
                                            
                                            <div className="form-group tags-field row m-0">
                                                <label className="col-lg-2 p-0">Last Name</label>
                                                <input
                                                    className="form-control col-lg-10"
                                                    name="lastname"
                                                    onChange={this.onChange}
                                                    value={this.state.lastname}
                                                    type="text"
                                                    onfocus="this.placeholder = 'Menu Name'"
                                                    onblur="this.placeholder = ''"
                                                    placeholder="Last Name"
                                                />
                                                {this.validator.message(
                                                    "lastname",
                                                    this.state.lastname,
                                                    "required|whitespace|min:1|max:150"
                                                )}
                                                {/* {this.state.mobile_message} */}
                                            </div>
                                            <div className="form-group tags-field row m-0">
                                                <label className="col-lg-2 p-0">Email Address</label>
                                                <input
                                                    className="form-control col-lg-10"
                                                    name="email"
                                                    onChange={this.onChange}
                                                    value={this.state.email}
                                                    type="text"
                                                    onfocus="this.placeholder = 'Menu Name'"
                                                    onblur="this.placeholder = ''"
                                                    placeholder="Enter Your Email"
                                                />
                                                {this.validator.message(
                                                    "email",
                                                    this.state.email,
                                                    "required|whitespace|min:1|max:100"
                                                )}
                                                {/* {this.state.mobile_message} */}
                                            </div>
                                            <div className="form-group tags-field row m-0">
                                                <label className="col-lg-2 p-0">Contact No</label>
                                                <input
                                                    className="form-control col-lg-10"
                                                    name="contactno"
                                                    onChange={this.onChange}
                                                    value={this.state.contactno}
                                                    type="text"
                                                    onfocus="this.placeholder = 'Menu Name'"
                                                    onblur="this.placeholder = ''"
                                                    placeholder="Enter you contact No"
                                                />
                                                {this.validator.message(
                                                    "contactno",
                                                    this.state.contactno,
                                                    "required|whitespace|min:1|max:100"
                                                )}
                                                {/* {this.state.mobile_message} */}
                                            </div>
                                            <div className="form-group tags-field row m-0">
                                                <label className="col-lg-2 p-0">Country</label>
                                                <input
                                                    className="form-control col-lg-10"
                                                    name="country"
                                                    onChange={this.onChange}
                                                    value={this.state.country}
                                                    type="text"
                                                    onfocus="this.placeholder = 'Menu Name'"
                                                    onblur="this.placeholder = ''"
                                                    placeholder="Country"
                                                />
                                                {this.validator.message(
                                                    "lastname",
                                                    this.state.lastname,
                                                    "required|whitespace|min:1|max:150"
                                                )}
                                                {/* {this.state.mobile_message} */}
                                            </div>
                                            <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Add Organisation</label>
                        <input
                          className="form-control col-lg-7"
                          name="organisation"
                          ref={this.organisation}
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
                                onClick={this.setOrganisation.bind(this, item)}
                              >
                                {item}
                              </li>
                            );
                          })}
                        </ul>

                        {this.state.mobile_message}
                      </div>
                      {this.state.organisation.length > 0 ? (
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">
                            Added Organisation
                          </label>
                          <ul>
                            {this.state.organisation.length>0&&this.state.organisation.map((items) => {
                              return <li>{items}</li>;
                            })}
                          </ul>
                        </div>
                      ) : null}
                                            <div className="form-group tags-field row m-0">
                                                <label className="col-lg-2 p-0">Photo</label>
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
                                                <label className="col-lg-2 p-0">Profile</label>

                                                <ReactQuill
                                                    className=" col-lg-10 height"
                                                    // theme={this.state.theme}
                                                    onChange={this.handleChange}
                                                    value={this.state.profile}
                                                    // modules={AddEvent.modules}
                                                    // formats={AddEvent.formats}
                                                    // bounds={".app"}
                                                    // placeholder={this.props.placeholder}
                                                />

                                                {this.validator.message(
                                                    "Description",
                                                    this.state.photo,
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

export default EditFacilitator;
