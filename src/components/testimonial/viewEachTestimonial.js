import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Loader from "react-loader-spinner";
class ViewTestimonial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            subtitle: "",
            description: "",
            image: "",
            loading: false,
        };
    }
    componentDidMount() {
        const { _id } = this.props.match.params;
        console.log(_id);
        axios
            .get(`https://trw-backend-api.herokuapp.com/home/update_testimonial/${_id}`)
            .then((res) => {
                console.log(res.data);
                const testimonialData = {
                    title: res.data.title,
                    subtitle: res.data.subtitle,
                    description: res.data.description,
                    image: res.data.image,
                };
                console.log(testimonialData.title);
                this.setState({
                    title: testimonialData.title,
                    subtitle: testimonialData.subtitle,
                    description: testimonialData.description,

                    image: testimonialData.image,
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
                        <div className="admin-head">Home Testimonials - View</div>
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
                                                <td>{this.state.title}</td>
                                            </tr>
                                            <tr>
                                                <td valign="top" width="150px;">
                                                    <b>Company/Designation</b>
                                                </td>
                                                <td>{this.state.subtitle}</td>
                                            </tr>
                                            <tr>
                                                <td valign="top" width="150px;">
                                                    <b>Description</b>
                                                </td>
                                                <td>{this.state.description}</td>
                                            </tr>

                                            <tr>
                                                <td valign="top" width="150px;">
                                                    <b>image</b>
                                                </td>
                                                <td>
                                                    <img src={this.state.image} />
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
