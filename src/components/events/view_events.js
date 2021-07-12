import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import renderHTML from "react-render-html";
import Loader from "react-loader-spinner";
import * as moment from "moment";
class ViewEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            category: "",
            type: "",
            image: "",
            fromdate: "",
            enddate:"",
            eventby:"",
            loading: false,
        };
    }
    componentDidMount() {
        const { _id } = this.props.match.params;
        console.log(_id);
        // https://trw-backend-api.herokuapp.com/
        axios
            .get(`https://lakshy12.herokuapp.com/blog/get_event_ById/${_id}`)
            .then((res) => {
                console.log(res.data);
                const post = {
                    title: res.data.title,
                    description: res.data.description,
                    category: res.data.category,
                    type: res.data.type,
                    image: res.data.image,
                    fromdate: res.data.fromdate,
                    enddate:res.data.enddate,
                    eventby:res.data.eventby
                };
                console.log(post);
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    category: res.data.category,
                    type: res.data.type,
                    image: res.data.image,
                    fromdate: res.data.fromdate,
                    enddate:res.data.enddate,
                    eventby:res.data.eventby,
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
                        <div className="admin-head">Event - View</div>
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
                                                        <b>Title</b>
                                                    </td>
                                                    <td>{this.state.title}</td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>Image</b>
                                                    </td>
                                                    <td>
                                                        <img
                                                            src={this.state.image}
                                                            width="100px"
                                                            height="70px"
                                                        />
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>Description</b>
                                                    </td>
                                                    <td>{renderHTML(this.state.description)}</td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>category</b>
                                                    </td>
                                                    <td>{this.state.category}</td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>type</b>
                                                    </td>
                                                    <td>{this.state.type}</td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>From Date</b>
                                                    </td>
                                                    <td>{new Date(this.state.fromdate).toString()}</td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>End Date</b>
                                                    </td>
                                                    <td>{new Date(this.state.enddate).toString()}</td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>Event By</b>
                                                    </td>
                                                    <td>{this.state.eventby}</td>
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

export default ViewEvents;
