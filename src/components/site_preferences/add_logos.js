import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import SimpleReactValidator from "simple-react-validator";
import '../../App.css'
import Loader from "react-loader-spinner";


class AddLogos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            frontendImage: "",
            backendImage: "",
            mobile_message: "",
            fetchedData: [],
            loading: false,
            validError: false,
        };
        // this.handleChange = this.handleChange.bind(this);

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
    onFileChange(event) {
        this.setState({
            [event.target.name]: event.target.files[0],
        });
    }
    // handleChange(event) {
    //     this.setState({
    //         [event.target.name]: event.target.value,
    //     });
    // }
    async componentDidMount() {
        let res = await axios.get("https://trw-backend-api.herokuapp.com/logo/fetch_logo");
        const fetchedData = res.data;
        this.setState({ fetchedData })
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        const formdata = new FormData();
        formdata.append("frontendImage", this.state.frontendImage);
        formdata.append("backendImage", this.state.backendImage);
        this.setState({ loading: true })
        axios
            .post(
                "https://trw-backend-api.herokuapp.com/logo/add_logo",
                formdata
            )
            .then(function (response) {
                // handle success
                console.log(response.data);
                if (response.data) {
                    window.location.reload();
                }
                this.props.history.push("/add_logos");
                this.setState({ formdata });
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
                        <div className="admin-head">Logos</div>
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
                                                        <label className="col-lg-2 p-0 mt-1">Frontend Logo</label>
                                                        <input
                                                            className="form-control col-lg-5 InputFiled"
                                                            name="frontendImage"
                                                            onChange={this.onFileChange}
                                                            type="file"
                                                            onfocus="this.placeholder = 'Menu Name'"
                                                            onblur="this.placeholder = ''"
                                                            placeholder=""
                                                        />

                                                        {this.validator.message(
                                                            "frontendImage",
                                                            this.state.frontendImage,
                                                            "required|whitespace|min:1|max:20"
                                                        )}
                                                    </div>
                                                    <img className="logoImg" src={this.state.fetchedData.map(item => item.frontendImage)} alt="Frontend Img">
                                                    </img>
                                                    <div className="form-group tags-field row m-0 ">
                                                        <label className="col-lg-2 p-0 mt-1">Backend Logo</label>
                                                        <input
                                                            className="form-control col-lg-5 InputFiled"
                                                            name="backendImage"
                                                            onChange={this.onFileChange}
                                                            type="file"
                                                            onfocus="this.placeholder = 'Menu Name'"
                                                            onblur="this.placeholder = ''"
                                                            placeholder=""
                                                        />
                                                        {this.validator.message(
                                                            "backendImage",
                                                            this.state.backendImage,
                                                            "required|whitespace|min:1|max:40"
                                                        )}
                                                    </div>
                                                    <img className="logoImg" src={this.state.fetchedData.map(item => item.backendImage)} alt="Backend Img">
                                                    </img>

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

export default AddLogos;
