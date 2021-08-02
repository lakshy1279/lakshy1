import axios from "axios";
import React from "react";
import Sidebar from "../Sidebar";
import renderHTML from "react-render-html";
import Loader from "react-loader-spinner";
import * as moment from "moment";
class ViewProgram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heading: "",
            description: "",
           
            photo:"",
            apply:"",
           
            loading: false,
        };
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        // https://lakshy12.herokuapp.com/
        axios
            .get(`https://lakshy12.herokuapp.com/program/fetch/${id}`)
            .then((res) => {
                console.log(res.data);
                const post = {
                    heading: res.data.heading,
                    description: res.data.description,
                    photo: res.data.photo,
                    apply:res.data.apply,
                };
                console.log(post);
                this.setState({
                    heading: post.heading,
                    description: post.description,
                   
                    photo: post.photo,
                    apply:post.apply,
                   
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
                        <div className="admin-head">Program - View</div>
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
                                                        <b>Heading</b>
                                                    </td>
                                                    <td>{this.state.heading}</td>
                                                </tr>
                                               
                                                <tr>
                                                    <td valign="top" width="150px;">
                                                        <b>Apply</b>
                                                    </td>
                                                    <td>{this.state.apply}</td>
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
                                                    <td>{renderHTML(this.state.description)}</td>
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

export default ViewProgram;
