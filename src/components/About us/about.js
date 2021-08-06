import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import SimpleReactValidator from "simple-react-validator";
import '../../App.css'
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heading: "",
            ourObjective: "",
            Mission: "",
            Vision: "",
            fetchedData: [],
            mobile_message: "",
            subtext:"",
            loading: false,
            validError: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
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
        let res = await axios.get("https://lakshy12.herokuapp.com/about1/fetch_about");
        // const fetchedData = res.data;
        console.log(res.data);
        this.setState({
            heading: res.data[0]?.heading,
            ourObjective: res.data[0]?.ourObjective,
            Mission: res.data[0]?.Mission,
            Vision: res.data[0]?.Vision,
            subtext:res.data[0]?.subtext,
        })
    }
    onChange(html) {
        this.setState({ ourObjective: html });
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
       handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        this.setState({ loading: true })
        const data = {
            heading: this.state.heading,
            ourObjective: this.state.ourObjective,
            Mission: this.state.Mission,
            Vision: this.state.Vision,
            subtext:this.state.subtext
        };
        axios
            .post(
                "https://lakshy12.herokuapp.com/about1/add_about",
                data
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
    render() {
        return (
            <div>
                <Sidebar></Sidebar>
                <div className="admin-wrapper col-12">
                    <div className="admin-content">
                        <div className="admin-head">About Us</div>
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
                                                    </div>
                                                    <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Our Objective</label>

                        <ReactQuill
                          className=" col-lg-8"
                          theme={this.state.theme}
                          onChange={this.onChange}
                          value={this.state.ourObjective}
                          modules={About.modules}
                          formats={About.formats}
                          bounds={".app"}
                          placeholder={this.props.placeholder}
                        />
                      </div>
                                                    <div className="form-group tags-field row m-0 ">
                                                        <label className="col-lg-2 p-0">Mission</label>
                                                        <textarea
                                                            className="form-control col-lg-8"
                                                            name="Mission"
                                                            onChange={this.handleChange}
                                                            value={this.state.Mission}
                                                            type="textarea"
                                                            onfocus="this.placeholder = 'Menu Name'"
                                                            onblur="this.placeholder = ''"
                                                            placeholder=""
                                                            row={3}
                                                        />
                                                        {this.validator.message(
                                                            "Mission",
                                                            this.state.Mission,
                                                            "required|whitespace|min:1|max:40"
                                                        )}
                                                    </div>
                                                    <div className="form-group tags-field row m-0 ">
                                                        <label className="col-lg-2 p-0">Vision</label>
                                                        <textarea
                                                            className="form-control col-lg-8"
                                                            name="Vision"
                                                            onChange={this.handleChange}
                                                            value={this.state.Vision}
                                                            type="textarea"
                                                            onfocus="this.placeholder = 'Menu Name'"
                                                            onblur="this.placeholder = ''"
                                                            placeholder=""
                                                            row={3}
                                                        />
                                                        {this.validator.message(
                                                            "Vision",
                                                            this.state.Vision,
                                                            "required|whitespace|min:1|max:40"
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
About.modules = {
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
  
  About.formats = [
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
  
  About.propTypes = {
    placeholder: PropTypes.string,
  };
export default About;
