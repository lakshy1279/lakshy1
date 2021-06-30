import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SimpleReactValidator from "simple-react-validator";
import '../../App.css'
class AddEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            category: "",
            eventCategories: [],
            eventTypes: [],
            type: "",
            DateTime: "",
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
        // https://trw-backend-api.herokuapp.com
        axios
            .get(`https://trw-backend-api.herokuapp.com/blog/get_event_cat`)
            .then((res) => {
                const eventCategories = res.data;
                console.log(eventCategories);
                this.setState({ eventCategories });
            });
        // https://trw-backend-api.herokuapp.com
        axios
            .get(`https://trw-backend-api.herokuapp.com/blog/get_event_type`)
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
    //   handleSubmit(event) {
    //     event.preventDefault();
    //     if (this.validator.allValid()) {
    //       const post = {
    //         title: this.state.title,
    //         category: this.state.category,
    //         description: this.state.description,
    //       };

    //       console.log(post);
    //       axios
    //         .post(`https://trw-backend-api.herokuapp.com/blog/AddEvent`, post)
    //         .then((res) => {
    //           console.log(res);
    //           console.log(res.data);
    //         });

    //       this.props.history.push("/article");
    //     } else {
    //       this.validator.showMessages();
    //       this.forceUpdate();
    //     }
    //   }

    handleSubmit(e) {
        e.preventDefault();
        if (this.validator.allValid()) {
            console.log(this.state);
            const formdata = new FormData();
            formdata.append("title", this.state.title);
            formdata.append("category", this.state.category);
            formdata.append("type", this.state.type);
            formdata.append("description", this.state.description);
            formdata.append("file", this.state.image);
            formdata.append("date", this.state.DateTime);
            axios
                .post(
                    "https://trw-backend-api.herokuapp.com/blog/AddEvent",
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
            this.props.history.push("/upcomming_events");
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
                                            <div className="form-group tags-field row m-0 ">
                                                <label className="col-lg-2 p-0">Select Category</label>
                                                <div className="radioBtn">
                                                    {this.state.eventCategories &&
                                                        this.state.eventCategories.map((data, index) => {
                                                            return (
                                                                <div className="radioContent">
                                                                    <input type="radio" className="radio" name="category" onChange={this.onChange} value={data.event_category} id={data._id} />
                                                                    <label htmlFor={data._id}>{data.event_category}</label>
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
                                                <label className="col-lg-2 p-0">Select Type</label>
                                                <div className="radioBtn">
                                                    {this.state.eventTypes &&
                                                        this.state.eventTypes.map((data, index) => {
                                                            return (
                                                                <div className="radioContent">
                                                                    <input type="checkbox" className="radio" id={data._id} name="type" onChange={this.onChange} value={data.event_type} />
                                                                    <label htmlFor={data._id}>{data.event_type}</label>
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                                {
                                                    this.validator.message(
                                                        "category Name",
                                                        this.state.category,
                                                        "required"
                                                    )
                                                }
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
                                                <label className="col-lg-2 p-0">Select Date and Time</label>
                                                <input
                                                    type="datetime-local"
                                                    name="DateTime"
                                                    onChange={this.onChange}
                                                    className="form-control col-lg-10"
                                                />
                                                {this.validator.message(
                                                    "Date",
                                                    this.state.image,
                                                    "required"
                                                )}
                                            </div>

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
