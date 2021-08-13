import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import SimpleReactValidator from "simple-react-validator";
import '../../App.css'
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";

class Section3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heading: "",
            fetchedData: [],
            image:"",
            mobile_message: "",
            subtext:"",
            buttonname:"",
            buttonurl:"",
            buttontext:"",
            loading: false,
            validError: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFileChange=this.onFileChange.bind(this);
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
    async componentDidMount() {
        let res = await axios.get("https://lakshy12.herokuapp.com/home/fetch_section2");
        // const fetchedData = res.data;
        console.log(res.data);
        this.setState({
            heading: res.data[0]?.heading,
            subtext:res.data[0]?.subtext,
            buttonname:res.data[0]?.buttonname,
            buttonurl:res.data[0]?.buttonurl,
            buttontext:res.data[0]?.buttontext,
            image:res.data[0]?.image
        })
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
        e.preventDefault();
        console.log(this.state);
    if(this.validator.allValid())
    {
        this.setState({ loading: true })
        const formdata = new FormData();
        formdata.append("heading",this.state.heading);
        formdata.append("subtext",this.state.subtext);
        formdata.append("buttonname",this.state.buttonname);
        formdata.append("url",this.state.buttonurl);
        formdata.append("file",this.state.image);
        formdata.append("buttontext",this.state.buttontext);
        console.log(formdata);
        axios
            .post(
                "https://lakshy12.herokuapp.com/home/add_section2",
                formdata
            )
            .then(function (response) {
                // handle success
                console.log(response.data);
                if (response.data) {
                    window.location.reload()
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
     }
     else
     {
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
                        <div className="admin-head">Section2</div>
                        <div className="admin-data">
                            {this.state.loading === false ? (
                                <>
                                    <div className="col-lg-12 p-0 text-right mb-30">
                                        <a onClick={() => window.history.back()}>
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
                                                        <label className="col-lg-2 p-0">Heading</label>
                                                        <textarea
                                                            className="form-control col-lg-8"
                                                            name="heading"
                                                            onChange={this.handleChange}
                                                            value={this.state.heading}
                                                            type="textarea"
                                                            onfocus="this.placeholder = 'Menu Name'"
                                                            onblur="this.placeholder = ''"
                                                            placeholder=""
                                                            
                                                        />
                                                         {this.validator.message(
                            "heading",
                            this.state.heading,
                            "required|whitespace|min:1|max:500"
                          )}
                                                    </div>
                                                    <div className="form-group tags-field row m-0">
                                                        <label className="col-lg-2 p-0">Heading(Subtext)</label>
                                                        <textarea
                                                            className="form-control col-lg-8"
                                                            name="subtext"
                                                            onChange={this.handleChange}
                                                            value={this.state.subtext}
                                                            type="textarea"
                                                            onfocus="this.placeholder = 'Menu Name'"
                                                            onblur="this.placeholder = ''"
                                                            placeholder=""
                                                            
                                                        />
                                                         {this.validator.message(
                            "Subtext",
                            this.state.subtext,
                            "required|whitespace|min:1|max:1000"
                          )}
                                                    </div>
                                                    <div className="form-group tags-field row m-0">
                                                        <label className="col-lg-2 p-0">Button(text)</label>
                                                        <textarea
                                                            className="form-control col-lg-8"
                                                            name="buttontext"
                                                            onChange={this.handleChange}
                                                            value={this.state.buttontext}
                                                            type="textarea"
                                                            onfocus="this.placeholder = 'Menu Name'"
                                                            onblur="this.placeholder = ''"
                                                            placeholder=""
                                                            
                                                        />
                                                         {this.validator.message(
                            "Buttontext",
                            this.state.buttontext,
                            "required|whitespace|min:1|max:100"
                          )}
                                                    </div>
                                                    <div className="form-group tags-field row m-0">
                                                        <label className="col-lg-2 p-0">CTA Button(U.R.L)</label>
                                                        <input
                                                            className="form-control col-lg-8"
                                                            name="buttonurl"
                                                            onChange={this.handleChange}
                                                            value={this.state.buttonurl}
                                                            type="textarea"
                                                            onfocus="this.placeholder = 'Menu Name'"
                                                            onblur="this.placeholder = ''"
                                                            placeholder=""
                                                            
                                                        />
                                                         {this.validator.message(
                            "Buttonurl",
                            this.state.buttonurl,
                            "required|whitespace|min:1|max:1000"
                          )}
                                                    </div>
                                                    <div className="form-group tags-field row m-0">
                                                        <label className="col-lg-2 p-0">CTA Button(Name)</label>
                                                        <textarea
                                                            className="form-control col-lg-8"
                                                            name="buttonname"
                                                            onChange={this.handleChange}
                                                            value={this.state.buttonname}
                                                            type="textarea"
                                                            onfocus="this.placeholder = 'Menu Name'"
                                                            onblur="this.placeholder = ''"
                                                            placeholder=""
                                                            
                                                        />
                                                         {this.validator.message(
                            "buttonname",
                            this.state.buttonname,
                            "required|whitespace|min:1|max:30"
                          )}
                                                    </div>
                                                    <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Section Images</label>
                        <input
                          type="file"
                          onChange={this.onFileChange}
                          name="file"
                          className="form-control col-lg-8"
                        />

                        {this.validator.message(
                          "Image",
                          this.state.image,
                          "required"
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
                                </>
                            ) :
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
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Section3.modules = {
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
  
  Section3.formats = [
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
  
  Section3.propTypes = {
    placeholder: PropTypes.string,
  };
export default Section3;
