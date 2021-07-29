import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SimpleReactValidator from "simple-react-validator";
class EditOrg extends React.Component {
  constructor(props) {
    super(props);
    this.facilitator=React.createRef();
    this.facilitatorList=[];
    this.state = {
      name: "",
      logo: "",
      url:"",
      facilitator:[],
      facilitatorName:[],
      suggestions:[],
      profile:"",
      text:"",
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
    const id = this.props.match.params.id;
    console.log(id);
    axios
      .get(`https://lakshy12.herokuapp.com/organisation/fetch/${id}`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        this.facilitatorList=data.facilitator;
        this.setState({ name: data.name,logo: data.logo,profile:data.profile,url:data.url,facilitator:data.facilitator });
      });
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
  }

  handleChange(html) {
    this.setState({ profile: html });
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
    this.setState({ logo: e.target.files[0] });
  }
  onTextChanged(e)
  {
    this.setState({text:e.target.value});
    let suggestions=[];
    if(this.state.text.length>0)
    {
      const regex=new RegExp(`^${this.state.text}`, "i");
      suggestions=this.state.facilitatorName.sort().filter((v)=>regex.test(v));
    }
    this.setState({
      suggestions:suggestions
    })
  }
  //set Faciliatator
  setFacilitator(facilitator)
  {
    this.facilitator.current.value="";
    if(!this.facilitatorList.includes(facilitator))
    {
      this.facilitatorList.push(facilitator);
    }
    this.setState({
      facilitator:this.facilitatorList,
      suggestions:[],
      text:"",
    })
  }
  // focus facilitator input
  focusInput()
  {
    this.facilitator.current.focus();
  }
  handleSubmit(e) {
    e.preventDefault();
    const id = this.props.match.params.id;
    if (this.validator.allValid()) {
      console.log(this.state);
      const formdata = new FormData();
      formdata.append("name", this.state.name);
      formdata.append("logo", this.state.logo);
      formdata.append("profile",this.state.profile);
      formdata.append("url",this.state.url);
      for(let i=0;i<this.state.facilitator.length;i++)
      {
        formdata.append("facilitator",this.state.facilitator[i]);
      }
      axios
        .put(
          `https://lakshy12.herokuapp.com/organisation/save/${id}`,
          formdata
        )
        .then((response) => {
          // handle success
          this.props.history.push("/organisation");
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
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Organisation - Edit</div>
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
                        <label className="col-lg-2 p-0">Name</label>
                        <input
                          className="form-control col-lg-10"
                          name="name"
                          onChange={this.onChange}
                          value={this.state.name}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder=""
                        />
                        {this.validator.message(
                          "name",
                          this.state.name,
                          "required|whitespace|min:1|max:150"
                        )}
                        {this.state.mobile_message}
                      </div>
                      <div className="form-group tags-field row mt-1">
                        <label className="col-lg-2 p-0">Logo</label>
                        <input
                          type="file"
                          onChange={this.onFileChange}
                          name="logo"
                          className="form-control col-lg-5"
                        />

                        {this.validator.message(
                          "logo",
                          this.state.logo,
                          "required"
                        )}
                      </div>
                      <img
                        className="logoImg"
                        src={this.state.logo}
                        alt="Frontend Img"
                      ></img>
                          <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Url</label>
                        <input
                          className="form-control col-lg-10"
                          name="url"
                          onChange={this.onChange}
                          value={this.state.url}
                          type="url"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder=""
                        />
                        {this.validator.message(
                          "url",
                          this.state.url,
                          "required|whitespace|min:1|max:150"
                        )}
                        {this.state.mobile_message}
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
                        <label className="col-lg-2 p-0">Profile</label>

                        <ReactQuill
                          className=" col-lg-10 height"
                          theme={this.state.theme}
                          onChange={this.handleChange}
                          value={this.state.profile}
                          modules={EditOrg.modules}
                          formats={EditOrg.formats}
                          bounds={".app"}
                          placeholder={this.props.placeholder}
                        />

                        {this.validator.message(
                          "profile",
                          this.state.profile,
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
EditOrg.modules = {
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

EditOrg.formats = [
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

EditOrg.propTypes = {
  placeholder: PropTypes.string,
};
export default EditOrg;
