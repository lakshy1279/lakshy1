import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Loader from "react-loader-spinner";
class ViewTestimonial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            location:"",
            content:"",
            photo:"",
            loading: false,
        };
    }
    componentDidMount() {
        const { _id } = this.props.match.params;
        console.log(_id);
        axios
            .get(`https://lakshy12.herokuapp.com/testimonial/fetch/${_id}`)
            .then((res) => {
                console.log(res.data);
                const temp=res.data;
                const testimonialData = {
                  name:temp.name,
                  location:temp.location,
                  content:temp.content,
                  photo:temp.photo
                };
                console.log(testimonialData);
                this.setState({
                    name:testimonialData.name,
                    location:testimonialData.location,
                    content:testimonialData.content,
                    photo:testimonialData.photo,
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
                        <div className="admin-head">Testimonials - View</div>
                        {this.state.loading ? (
                            <div className="admin-data">
                                <div className="col-lg-12 p-0 text-right mb-30">
                                    <a href="/testimonials">
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
                                                    <b>Name</b>
                                                </td>
                                                <td>{this.state.name}</td>
                                            </tr>
                                            <tr>
                                                <td valign="top" width="150px;">
                                                    <b>Location</b>
                                                </td>
                                                <td>{this.state.location}</td>
                                            </tr>
                                            <tr>
                                                <td valign="top" width="150px;">
                                                    <b>Content</b>
                                                </td>
                                                <td>{this.state.content}</td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <b>Photo</b>
                                                </td>
                                                <td>
                                                        <img
                                                            src={this.state.photo}
                                                            width="150px"
                                                            height="100px"
                                                        />
                                                    </td>
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

export default ViewTestimonial;
