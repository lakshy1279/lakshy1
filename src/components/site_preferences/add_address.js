import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import SimpleReactValidator from "simple-react-validator";
import '../../App.css'
import Loader from "react-loader-spinner";


class AddAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            pincode: "",
            fetchedData: [],
            mobile_message: "",
            loading: false,
            validError: false,
        };
        this.handleChange = this.handleChange.bind(this);
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
        let res = await axios.get("https://trw-backend-api.herokuapp.com/address/fetch_address");
        // const fetchedData = res.data;
        this.setState({
            name: res.data[0]?.name,
            addressLine1: res.data[0]?.addressLine1,
            addressLine2: res.data[0]?.addressLine2,
            city: res.data[0]?.city,
            state: res.data[0]?.state,
            pincode: res.data[0]?.pincode,
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
            name: this.state.name,
            addressLine1: this.state.addressLine1,
            addressLine2: this.state.addressLine2,
            city: this.state.city,
            state: this.state.state,
            pincode: this.state.pincode,
        };
        axios
            .post(
                "https://trw-backend-api.herokuapp.com/address/add_address",
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
                        <div className="admin-head">Address Details</div>
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
                                                        <label className="col-lg-2 p-0 mt-1">Name</label>
                                                        <input
                                                            className="form-control col-lg-5"
                                                            name="name"
                                                            onChange={this.handleChange}
                                                            value={this.state.name}
                                                            type="text"
                                                            onfocus="this.placeholder = 'Menu Name'"
                                                            onblur="this.placeholder = ''"
                                                            placeholder=""
                                                        />
                                                        {this.validator.message(
                                                            "Name",
                                                            this.state.name,
                                                            "required|whitespace|min:1|max:20"
                                                        )}
                                                    </div>
                                                    <div className="form-group tags-field row m-0 ">
                                                        <label className="col-lg-2 p-0 mt-1">Address line 1</label>
                                                        <input
                                                            className="form-control col-lg-5"
                                                            name="addressLine1"
                                                            onChange={this.handleChange}
                                                            value={this.state.addressLine1}
                                                            type="text"
                                                            onfocus="this.placeholder = 'Menu Name'"
                                                            onblur="this.placeholder = ''"
                                                            placeholder=""
                                                        />
                                                        {this.validator.message(
                                                            "addressLine1",
                                                            this.state.addressLine1,
                                                            "required|whitespace|min:1|max:40"
                                                        )}
                                                    </div>
                                                    <div className="form-group tags-field row m-0 ">
                                                        <label className="col-lg-2 p-0 mt-1">Address line 2</label>
                                                        <input
                                                            className="form-control col-lg-5"
                                                            name="addressLine2"
                                                            onChange={this.handleChange}
                                                            value={this.state.addressLine2}
                                                            type="text"
                                                            onfocus="this.placeholder = 'Menu Name'"
                                                            onblur="this.placeholder = ''"
                                                            placeholder=""
                                                        />
                                                        {this.validator.message(
                                                            "addressLine2",
                                                            this.state.addressLine2,
                                                            "required|whitespace|min:1|max:40"
                                                        )}
                                                    </div>
                                                    <div className="form-group tags-field row m-0 ">
                                                        <label className="col-lg-2 p-0 mt-1">City</label>
                                                        <input
                                                            className="form-control col-lg-5"
                                                            name="city"
                                                            onChange={this.handleChange}
                                                            value={this.state.city}
                                                            type="text"
                                                            onfocus="this.placeholder = 'Menu Name'"
                                                            onblur="this.placeholder = ''"
                                                            placeholder=""
                                                        />
                                                        {this.validator.message(
                                                            "city",
                                                            this.state.city,
                                                            "required|whitespace|min:1|max:40"
                                                        )}
                                                    </div>
                                                    <div className="form-group tags-field row m-0 ">
                                                        <label className="col-lg-2 p-0 mt-1">State</label>
                                                        <input
                                                            className="form-control col-lg-5"
                                                            name="state"
                                                            onChange={this.handleChange}
                                                            value={this.state.state}
                                                            type="text"
                                                            onfocus="this.placeholder = 'Menu Name'"
                                                            onblur="this.placeholder = ''"
                                                            placeholder=""
                                                        />
                                                        {this.validator.message(
                                                            "state",
                                                            this.state.state,
                                                            "required|whitespace|min:1|max:40"
                                                        )}
                                                    </div>
                                                    <div className="form-group tags-field row m-0 ">
                                                        <label className="col-lg-2 p-0 mt-1">Pincode</label>
                                                        <input
                                                            className="form-control col-lg-5"
                                                            name="pincode"
                                                            onChange={this.handleChange}
                                                            value={this.state.pincode}
                                                            type="text"
                                                            onfocus="this.placeholder = 'Menu Name'"
                                                            onblur="this.placeholder = ''"
                                                            placeholder=""
                                                        />
                                                        {this.validator.message(
                                                            "pincode",
                                                            this.state.pincode,
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

export default AddAddress;
