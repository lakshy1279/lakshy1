import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SimpleReactValidator from "simple-react-validator";
import "../../App.css";
import { createRef } from "react/cjs/react.production.min";
class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.facilitator = React.createRef();
    this.organisation = React.createRef();
    this.speaker = React.createRef();
    this.language=React.createRef();
    this.facilitatorList = [];
    this.organisationList = [];
    this.speakersList = [];
    this.languageList=[];
    this.state = {
      title: "",
      category: "",
      eventCategories: [],
      eventTypes: [],
      type: "",
      FromDate: "",
      EndDate: "",
      eventby: "",
      facilitator: [],
      organisation: [],
      speaker: [],
      language:[],
      languageName:[],
      facilitatorName: [],
      organisationName: [],
      speakerName: [],
      suggestions: [],
      organisationSuggestions: [],
      speakerSuggestion: [],
      languageSuggestion:[],
      text: "",
      organisationText: "",
      languageText:"",
      speakerText: "",
      description: "",
      image: "",
      theme: "snow",
      mobile_message: "",
      validError: false,
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
    // https://lakshy12.herokuapp.com
    axios
      .get(`https://lakshy12.herokuapp.com/blog/get_event_cat`)
      .then((res) => {
        const eventCategories = res.data;
        console.log(eventCategories);
        this.setState({ eventCategories });
      });
    // fetch facilitators or speakers
    axios
      .get(`https://lakshy12.herokuapp.com/facilitator/fetch`)
      .then((res) => {
        res?.data.map((name) => {
          this.setState({
            facilitatorName: [
              ...this.state.facilitatorName,
              `${name.firstname} ${name.lastname}`,
            ],
            speakerName: [
              ...this.state.speakerName,
              `${name.firstname} ${name.lastname}`,
            ],
          });
        });
      });
    // fetch facilitators
    axios
      .get(`https://lakshy12.herokuapp.com/organisation/fetch`)
      .then((res) => {
        res?.data.map((org) => {
          this.setState({
            organisationName: [...this.state.organisationName, org.name],
          });
        });
      });
      //languagename
      axios
      .get(`https://lakshy12.herokuapp.com/language/fetch`)
      .then((res) => {
        console.log("language",res.data)
        res?.data.map((org) => {
          this.setState({
            languageName: [...this.state.languageName, org.language],
          });
        });
      });
    // https://lakshy12.herokuapp.com
    axios
      .get(`https://lakshy12.herokuapp.com/blog/get_event_type`)
      .then((res) => {
        const eventTypes = res.data;
        console.log(eventTypes);
        this.setState({ eventTypes });
      });
  }

  handleChange(html) {
    this.setState({ description: html });
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
    this.setState({ image: e.target.files[0] });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      console.log(this.state);
      const formdata = new FormData();
      for (let i = 0; i < this.state.speaker.length; i++) {
        formdata.append("speaker", this.state.speaker[i]);
      }
      for (let i = 0; i < this.state.facilitator.length; i++) {
        formdata.append("facilitator", this.state.facilitator[i]);
      }
      for (let i = 0; i < this.state.organisation.length; i++) {
        formdata.append("organisation", this.state.organisation[i]);
      }
      for (let i = 0; i < this.state.language.length; i++) {
        formdata.append("language", this.state.language[i]);
      }
      formdata.append("title", this.state.title);
      formdata.append("category", this.state.category);
      formdata.append("type", this.state.type);
      formdata.append("description", this.state.description);
      formdata.append("file", this.state.image);
      formdata.append("fromdate", this.state.FromDate);
      formdata.append("enddate", this.state.EndDate);

      axios
        .post("http://localhost:5000/blog/AddEvent", formdata)
        .then((response)=> {
          // handle success
          this.props.history.push("/upcomming_events");
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
  // handel facilitator input
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
  // set facilitator
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
  // focus facilitator input
  focusInput() {
    this.facilitator.current.focus();
  }

  // handelSpeaker input
  onSpeakerChange(e) {
    this.setState({ speakerText: e.target.value });

    let speakerSuggestion = [];
    if (this.state.speakerText.length > 0) {
      const regex = new RegExp(`^${this.state.speakerText}`, "i");

      speakerSuggestion = this.state.speakerName
        .sort()
        .filter((v) => regex.test(v));
    }
    this.setState({
      speakerSuggestion: speakerSuggestion,
    });
  }
  //handle language change
  onLanguageChange(e) {
    this.setState({ languageText: e.target.value });

    let languageSuggestion = [];
    if (this.state.languageText.length > 0) {
      const regex = new RegExp(`^${this.state.languageText}`, "i");

      languageSuggestion = this.state.languageName
        .sort()
        .filter((v) => regex.test(v));
    }
    this.setState({
      languageSuggestion: languageSuggestion,
    });
  }
  // set speaker
  setSpeaker(speaker) {
    this.speaker.current.value = "";
    if (!this.speakersList.includes(speaker)) {
      this.speakersList.push(speaker);
    }

    this.setState({
      speaker: this.speakersList,
      speakerSuggestion: [],
      speakerText: "",
    });
  }
  //set Language
  setLanguage(language) {
    this.language.current.value = "";
    if (!this.languageList.includes(language)) {
      this.languageList.push(language);
    }

    this.setState({
      language: this.languageList,
      languageSuggestion: [],
      languageText: "",
    });
  }
  // focus speaker input
  focusSpeakerInput() {
    this.speaker.current.focus();
  }
  focusLanguageInput()
  {
    this.language.current.focus();
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
  render() {
    console.log(this.state);

    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Event - Add New</div>
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
                        <label className="col-lg-2 p-0">Title</label>
                        <input
                          className="form-control col-lg-10"
                          name="title"
                          onChange={this.onChange}
                          value={this.state.title}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder=""
                        />
                        {this.validator.message(
                          "Title",
                          this.state.title,
                          "required|whitespace|min:1|max:150"
                        )}
                        {this.state.mobile_message}
                      </div>
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Language</label>
                        <input
                          className="form-control col-lg-6"
                          name="title"
                          onChange={this.onLanguageChange.bind(this)}
                          value={this.state.languageText}
                          ref={this.language}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder=""
                        />
                        {this.validator.message(
                          "language",
                          this.state.language,
                          "required|whitespace|min:1|max:150"
                        )}
                          <button
                          onClick={this.focusLanguageInput.bind(this)}
                          className=" col-lg-2"
                          style={{ marginLeft: "1rem" }}
                        >
                          Add More +
                        </button>
                        <ul className="autoSuggestionList col-lg-5">
                          {this.state.languageSuggestion.map((item) => {
                            return (
                              <li
                                onClick={this.setLanguage.bind(this, item)}
                              >
                                {item}
                              </li>
                            );
                          })}
                        </ul>
                        {this.state.mobile_message}
                      </div>
                      {this.state.language.length > 0 ? (
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">
                            Added Language
                          </label>
                          <ul>
                            {this.state.language.map((items) => {
                              return <li>{items}</li>;
                            })}
                          </ul>
                        </div>
                      ) : null}
                      <div className="form-group tags-field row m-0 ">
                        <label className="col-lg-2 p-0">Select Category</label>
                        <div className="radioBtn">
                          {this.state.eventCategories &&
                            this.state.eventCategories.map((data, index) => {
                              return (
                                <div className="radioContent">
                                  <input
                                    type="radio"
                                    className="radio"
                                    name="category"
                                    onChange={this.onChange}
                                    value={data.event_category}
                                    id={data._id}
                                  />
                                  <label htmlFor={data._id}>
                                    {data.event_category}
                                  </label>
                                </div>
                              );
                            })}
                        </div>
                        {this.validator.message(
                          "category Name",
                          this.state.category,
                          "required"
                        )}
                      </div>
                      <div className="form-group tags-field row m-0 ">
                        <label className="col-lg-2 p-0">Select Theme</label>
                        <div className="radioBtn">
                          {this.state.eventTypes &&
                            this.state.eventTypes.map((data, index) => {
                              return (
                                <div className="radioContent">
                                  <input
                                    type="checkbox"
                                    className="radio"
                                    id={data._id}
                                    name="type"
                                    onChange={this.onChange}
                                    value={data.event_type}
                                  />
                                  <label htmlFor={data._id}>
                                    {data.event_type}
                                  </label>
                                </div>
                              );
                            })}
                        </div>
                        {this.validator.message(
                          "category Name",
                          this.state.category,
                          "required"
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
                        <label className="col-lg-2 p-0">
                          From Date and Time
                        </label>
                        <input
                          type="datetime-local"
                          name="FromDate"
                          onChange={this.onChange}
                          className="form-control col-lg-10"
                        />
                        {this.validator.message(
                          "FromDate",
                          this.state.FromDate,
                          "required"
                        )}
                      </div>
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">
                          End Date and Time
                        </label>
                        <input
                          type="datetime-local"
                          name="EndDate"
                          onChange={this.onChange}
                          className="form-control col-lg-10"
                        />
                        {this.validator.message(
                          "EndDate",
                          this.state.EndDate,
                          "required"
                        )}
                      </div>
                      {/* Add Facilitator */}
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
                      {/* Add Speakers*/}
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Add Speaker</label>
                        <input
                          className="form-control col-lg-7"
                          name="speaker"
                          ref={this.speaker}
                          onChange={this.onSpeakerChange.bind(this)}
                          autocomplete="off"
                          value={this.state.speakerText}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder=""
                        />
                        <button
                          onClick={this.focusSpeakerInput.bind(this)}
                          className=" col-lg-2"
                          style={{ marginLeft: "1rem" }}
                        >
                          Add More +
                        </button>
                        <ul className="autoSuggestionList col-lg-5">
                          {this.state.speakerSuggestion.map((item) => {
                            return (
                              <li onClick={this.setSpeaker.bind(this, item)}>
                                {item}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      {this.state.speaker.length > 0 ? (
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">Added Speakers</label>
                          <ul>
                            {this.state.speaker.map((items) => {
                              return <li>{items}</li>;
                            })}
                          </ul>
                        </div>
                      ) : null}
                      {/* Add Organisation */}

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
                        <label className="col-lg-2 p-0">Description</label>

                        <ReactQuill
                          className=" col-lg-10 height"
                          theme={this.state.theme}
                          onChange={this.handleChange}
                          value={this.state.description}
                          modules={AddEvent.modules}
                          formats={AddEvent.formats}
                          bounds={".app"}
                          placeholder={this.props.placeholder}
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
AddEvent.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

AddEvent.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

AddEvent.propTypes = {
  placeholder: PropTypes.string,
};
export default AddEvent;
