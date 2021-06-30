import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import SimpleReactValidator from "simple-react-validator";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loader from "react-loader-spinner";
class EditEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            category: "",
            description: "",
            type: "",
            image: "",
            date: "",
            eventCategories: [],
            eventtypes: [],
            theme: "snow",
            mobile_message: "",
            validError: false,
            loading: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
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
        const { _id } = this.props.match.params;
        console.log(_id);
        // https://trw-backend-api.herokuapp.com/
        let res = await axios.get(`https://trw-backend-api.herokuapp.com/blog/get_event_ById/${_id}`);
        console.log(res.data);
        const post = {
            title: res.data.title,
            category: res.data.category,
            type: res.data.type,
            image: res.data.image,
            description: res.data.description,
            date: res.data.date,
        };
        console.log(post);
        this.setState({
            title: post.title,
            category: post.category,
            type: post.type,
            image: post.image,
            description: post.description,
            date: post.date,
            loading: true,
        });
        let resCat = await axios.get(`https://trw-backend-api.herokuapp.com/blog/get_event_cat`)
        const eventCategories = resCat.data;
        console.log(eventCategories);
        this.setState({ eventCategories });
        let resType = await axios.get(`https://trw-backend-api.herokuapp.com/blog/get_event_type`)
        const eventtypes = resType.data;
        console.log(eventtypes);
        this.setState({ eventtypes });
    }
    handleChange(html) {
        this.setState({ description: html });
    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    onFileChange(e) {
        this.setState({ image: e.target.files[0] });
    }
    handleThemeChange(newTheme) {
        if (newTheme === "core") newTheme = null;
        this.setState({ theme: newTheme });
    }

    //   handleSubmit(e) {
    //     const { _id } = this.props.match.params;
    //     e.preventDefault();
    //     if (this.validator.allValid()) {
    //       const post = {
    //         title: this.state.title,
    //         category: this.state.category,
    //         description: this.state.description,
    //       };
    //       axios
    //         .put(
    //           `https://trw-backend-api.herokuapp.com/blog/update_blog1_patch/${_id}`,
    //           post
    //         )
    //         .then((res) => console.log(res.data));

    //       this.props.history.push("/article");
    //     } else {
    //       this.validator.showMessages();
    //       this.forceUpdate();
    //     }
    //   }

    handleSubmit(e) {
        const { _id } = this.props.match.params;
        e.preventDefault();
        if (this.validator.allValid()) {
            console.log(this.state)
            const formdata = new FormData();
            formdata.append("title", this.state.title);
            formdata.append("category", this.state.category);
            formdata.append("type", this.state.type);
            formdata.append("description", this.state.description);
            formdata.append("file", this.state.image);
            formdata.append("date", this.state.date);

            // https://trw-backend-api.herokuapp.com/
            axios
                .put(
                    `https://trw-backend-api.herokuapp.com/blog/update_event/${_id}`,
                    formdata
                )
                .then((res) => {
                    console.log(res.data);
                    window.history.back();
                })

            // this.props.history.push("/article");
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
                        <div className="admin-head">Event - Edit</div>
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
                                                    "category",
                                                    this.state.category,
                                                    "required"
                                                )}
                                            </div>
                                            <div className="form-group tags-field row m-0 ">
                                                <label className="col-lg-2 p-0">Select Type</label>
                                                <div className="radioBtn">
                                                    {this.state.eventtypes &&
                                                        this.state.eventtypes.map((data, index) => {
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
                                                        "type",
                                                        this.state.type,
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
                                                    name="date"
                                                    onChange={this.onChange}
                                                    className="form-control col-lg-10"
                                                    value={this.state.date}
                                                />
                                                {this.validator.message(
                                                    "Date",
                                                    this.state.date,
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
                                                    modules={EditEvent.modules}
                                                    formats={EditEvent.formats}
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
EditEvent.modules = {
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

EditEvent.formats = [
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

EditEvent.propTypes = {
    placeholder: PropTypes.string,
};
export default EditEvent;
