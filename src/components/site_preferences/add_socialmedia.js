import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import SimpleReactValidator from "simple-react-validator";
import '../../App.css'
import Loader from "react-loader-spinner";


class AddSocialMedia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            twitter: "",
            facebook: "",
            linkedIn: "",
            instagram: "",
            youtube: "",
            mobile_message: "",
            validError: false,
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);

        // this.onFileChange = this.onFileChange.bind(this);

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
    async componentDidMount() {
        let res = await axios.get("https://trw-backend-api.herokuapp.com/social/fetch_socialmedia");
        // const fetchedData = res.data;
        this.setState({
            twitter: res.data[0]?.twitter,
            facebook: res.data[0]?.facebook,
            instagram: res.data[0]?.instagram,
            youtube: res.data[0]?.youtube,
            linkedIn: res.data[0]?.linkedIn,
        })
    }
    // onFileChange(e) {
    //     this.setState({ image: e.target.files[0] });
    // }
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
            facebook: this.state.facebook,
            twitter: this.state.twitter,
            instagram: this.state.instagram,
            youtube: this.state.youtube,
            linkedIn: this.state.linkedIn,
        };
        axios
            .post(
                "https://trw-backend-api.herokuapp.com/social/add_social_media",
                data
            )
            .then(function (response) {
                // handle success
                console.log(response.data);
                if (response.data) {
                    window.location.reload();
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
                        <div className="admin-head">Social Media Details</div>
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
                                                        <label className="col-lg-2 p-0 mt-1">Facebook</label>
                                                        <input
                                                            className="form-control col-lg-5"
                                                            name="facebook"
                                                            onChange={this.handleChange}
                                                            value={this.state.facebook}
                                                            type="text"
                                                            onfocus="this.placeholder = 'Menu Name'"
                                                            onblur="this.placeholder = ''"
                                                            placeholder=""
                                                        />
                                                        {this.validator.message(
                                                            "facebook",
                                                            this.state.facebook,
                                                            "required|whitespace|min:1|max:20"
                                                        )}
                                                    </div>
                                                    <div className="form-group tags-field row m-0 ">
                                                        <label className="col-lg-2 p-0 mt-1">Twitter</label>
                                                        <input
                                                            className="form-control col-lg-5"
                                                            name="twitter"
                                                            onChange={this.handleChange}
                                                            value={this.state.twitter}
                                                            type="text"
                                                            onfocus="this.placeholder = 'Menu Name'"
                                                            onblur="this.placeholder = ''"
                                                            placeholder=""
                                                        />
                                                        {this.validator.message(
                                                            "twitter",
                                                            this.state.twitter,
                                                            "required|whitespace|min:1|max:40"
                                                        )}
                                                    </div>
                                                    <div className="form-group tags-field row m-0 ">
                                                        <label className="col-lg-2 p-0 mt-1">LinkedIn</label>
                                                        <input
                                                            className="form-control col-lg-5"
                                                            name="linkedIn"
                                                            onChange={this.handleChange}
                                                            value={this.state.linkedIn}
                                                            type="text"
                                                            onfocus="this.placeholder = 'Menu Name'"
                                                            onblur="this.placeholder = ''"
                                                            placeholder=""
                                                        />
                                                        {this.validator.message(
                                                            "linkedIn",
                                                            this.state.linkedIn,
                                                            "required|whitespace|min:1|max:40"
                                                        )}
                                                    </div>
                                                    <div className="form-group tags-field row m-0 ">
                                                        <label className="col-lg-2 p-0 mt-1">Instagram</label>
                                                        <input
                                                            className="form-control col-lg-5"
                                                            name="instagram"
                                                            onChange={this.handleChange}
                                                            value={this.state.instagram}
                                                            type="text"
                                                            onfocus="this.placeholder = 'Menu Name'"
                                                            onblur="this.placeholder = ''"
                                                            placeholder=""
                                                        />
                                                        {this.validator.message(
                                                            "instagram",
                                                            this.state.instagram,
                                                            "required|whitespace|min:1|max:40"
                                                        )}
                                                    </div>
                                                    <div className="form-group tags-field row m-0 ">
                                                        <label className="col-lg-2 p-0 mt-1">Youtube</label>
                                                        <input
                                                            className="form-control col-lg-5"
                                                            name="youtube"
                                                            onChange={this.handleChange}
                                                            value={this.state.youtube}
                                                            type="text"
                                                            onfocus="this.placeholder = 'Menu Name'"
                                                            onblur="this.placeholder = ''"
                                                            placeholder=""
                                                        />
                                                        {this.validator.message(
                                                            "youtube",
                                                            this.state.youtube,
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

export default AddSocialMedia;
