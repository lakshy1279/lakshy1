import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import renderHTML from "react-render-html";
import Loader from "react-loader-spinner";
import * as moment from "moment";
class ViewOrganisation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            logo: "",
            url:"",
            facilitator:[],
            profile:"",
            loading: false,
        };
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        // https://lakshy12.herokuapp.com/
        axios
            .get(`https://lakshy12.herokuapp.com/organisation/fetch/${id}`)
            .then((res) => {
               const data=res.data;
               console.log(data)
                this.setState({
                    name:data.name,
                    logo:data.logo,
                    profile:data.profile,
                    facilitator:data.facilitator,
                    url:data.url,
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
                        <div className="admin-head">Organisation - View</div>
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
                                                        <b>Name</b>
                                                    </td>
                                                    <td>{this.state.name}</td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>U.R.L</b>
                                                    </td>
                                                    <td>{this.state.url}</td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>Faciliatator</b>
                                                    </td>
                                                    <td>{this.state.facilitator.toString()}</td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>logo</b>
                                                    </td>
                                                    <td>
                                                        <img
                                                            src={this.state.logo}
                                                            width="100px"
                                                            height="70px"
                                                        />
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>Profile</b>
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

export default ViewOrganisation;
