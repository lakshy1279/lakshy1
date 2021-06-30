import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Loader from "react-loader-spinner";
import SimpleReactValidator from "simple-react-validator";
class ViewEventType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event_type: "",
            mobile_message: "",
            validError: false,
            loading: false,
        };
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
        const { _id } = this.props.match.params;
        console.log(_id);
        // https://trw-backend-api.herokuapp.com
        axios
            .get(
                `https://trw-backend-api.herokuapp.com/blog/get_event_typeById/${_id}`
            )
            .then((res) => {
                console.log(res.data);
                const menu = {
                    event_type: res.data.event_type,
                };

                this.setState({
                    event_type: menu.event_type,
                    loading: true,
                });
            });
    }

    render() {
        return (
            <div>
                <Sidebar></Sidebar>
                <div className="admin-wrapper col-12">
                    <div className="admin-content">
                        <div className="admin-head">Event Type - View</div>
                        {this.state.loading ? (
                            <div className="admin-data">
                                <div className="col-lg-12 p-0 text-right mb-30">
                                    <a href="/event_types">
                                        <button className="button button-contactForm boxed-btn">
                                            Back
                                        </button>
                                    </a>
                                </div>
                                <div className="table-responsive admin-table demo">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td valign="top" width="150px;">
                                                    <b>Type</b>
                                                </td>
                                                <td>{this.state.event_type}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
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
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
export default ViewEventType;