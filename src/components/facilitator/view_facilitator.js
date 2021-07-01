import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import renderHTML from "react-render-html";
import Loader from "react-loader-spinner";
import * as moment from "moment";
class ViewFacilitator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            profile: "",
            photo:"",
            loading: false,
        };
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        // https://trw-backend-api.herokuapp.com/
        axios
            .get(`http://localhost:5000/facilitator/fetch/${id}`)
            .then((res) => {
                console.log(res.data);
                const post = {
                    firstname: res.data.firstname,
                    lastname: res.data.lastname,
                    profile: res.data.profile,
                    photo: res.data.photo,
                };
                console.log(post);
                this.setState({
                    firstname: post.firstname,
                    lastname: post.lastname,
                    profile: post.profile,
                    photo: post.photo,
                    loading:true
                });
            });
    }

    render() {
        return (
            <div>
                <Sidebar></Sidebar>
                <div className="admin-wrapper col-12">
                    <div className="admin-content">
                        <div className="admin-head">Facilitator - View</div>
                        <div className="admin-data">
                            {this.state.loading ? (
                                <>
                                    <div className="col-lg-12 p-0 text-right mb-30">
                                        {/* <a href={}> */}
                                        <button onClick={() => window.history.back()} className="button button-contactForm boxed-btn">
                                            Back
                                        </button>
                                        {/* </a> */}
                                    </div>

                                    <div className="table-responsive admin-table demo">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>First Name</b>
                                                    </td>
                                                    <td>{this.state.firstname}</td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>Last Name</b>
                                                    </td>
                                                    <td>{this.state.lastname}</td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>Photo</b>
                                                    </td>
                                                    <td>
                                                        <img
                                                            src={this.state.photo}
                                                            width="100px"
                                                            height="70px"
                                                        />
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>Description</b>
                                                    </td>
                                                    <td>{renderHTML(this.state.profile)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </>
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
            </div>
        );
    }
}

export default ViewFacilitator;
