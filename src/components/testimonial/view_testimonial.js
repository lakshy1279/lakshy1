import React from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import swal from "sweetalert";
import Loader from "react-loader-spinner";
const PER_PAGE = 10;


class Testimonial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testimonialData: [],
            currentPage: 0,
            loading: true,
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        axios
            .get(`http://localhost:5000/testimonial/fetch
`)
            .then((res) => {
                const testimonialData = res.data;
                console.log("testimonialData", testimonialData);
                this.setState({ testimonialData, loading: true });
            });
        this.unsubscribe = axios
            .get(`http://localhost:5000/testimonial/fetch
`)
            .then((res) => {
                const testimonialData = res.data;
                console.log(testimonialData);
                this.setState({ testimonialData, loading: true });
            });
    }

    deleteItem(_id) {
        swal({
            title: "Are you sure?",
            text: "Do your really want to remove?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                console.log(_id);

                axios
                    .delete(
                        `http://localhost:5000/testimonial/delete/${_id}`
                    )
                    .then((res) => {
                        console.log(res);
                        console.log(res.data);
                    });
                this.componentDidMount();
            } else {
            }
        });
    }

    handlePageClick({ selected: selectedPage }) {
        this.setState({
            currentPage: selectedPage,
        });
    }
    render() {
        const styles = { height: 400, width: "100%" };
        const offset = this.state.currentPage * PER_PAGE;

        const currentPageData =
            this.state.testimonialData &&
            this.state.testimonialData.slice(offset, offset + PER_PAGE).map((home, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{home.name}</td>
                        <td>{home.location}</td>
                        <td>
                           {new Date(Date.now(home.createdAt)).toDateString()}
                        </td>
                        {/* <td>{home.subtitle}</td> */}

                        <td>
                            <Link to={`/view_testimonial/${home._id}`}>
                                <span className="btn">View</span>
                            </Link>

                            <Link to={`/edit_testimonial/${home._id}`}>
                                <span className="btn">Edit</span>
                            </Link>
                            <span
                                className="btn"
                                onClick={this.deleteItem.bind(this, home._id)}
                            >
                                Delete
                            </span>
                        </td>
                    </tr>
                );
            });

        const pageCount = Math.ceil(
            this.state.testimonialData && this.state.testimonialData.length / PER_PAGE
        );
        return (
            <div>
                <Sidebar></Sidebar>
                <div className="admin-wrapper col-12">
                    <div className="admin-content">
                        <div className="admin-head">Testimonials</div>
                        {this.state.loading ? (
                            <div className="admin-data">
                                <div className="col-lg-12 p-0 text-right mb-30">
                                    <a href="add_testimonial">
                                        <button className="button button-contactForm boxed-btn">
                                            + Add New
                                        </button>
                                    </a>
                                </div>
                                <div className="table-responsive admin-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Name</th>
                                                <th>Location</th>
                                                <th>Added On</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>{currentPageData}</tbody>
                                    </table>
                                </div>

                                <div className="paginationstyle">
                                    <ReactPaginate
                                        previousLabel={"Previous"}
                                        nextLabel={"Next"}
                                        pageCount={pageCount}
                                        onPageChange={this.handlePageClick.bind(this)}
                                        containerClassName={"pagination"}
                                        previousLinkClassName={"pagination__link"}
                                        nextLinkClassName={"pagination__link"}
                                        disabledClassName={"pagination__link--disabled"}
                                        activeClassName={"pagination__link--active"}
                                    />
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
            </div >
        )
    }
}
export default Testimonial
