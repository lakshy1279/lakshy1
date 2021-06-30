import React from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";

const PER_PAGE = 10;
class EventCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            currentPage: 0,
            loading: false,
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        axios
            .get(`https://trw-backend-api.herokuapp.com/blog/get_event_cat`)
            .then((res) => {
                const categories = res.data;
                console.log(categories);
                this.setState({ categories, loading: true });
            });
        this.unsubscribe = axios
            .get(`https://trw-backend-api.herokuapp.com/blog/get_event_cat`)
            .then((res) => {
                const categories = res.data;
                console.log(categories);
                this.setState({ categories, loading: true });
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
                // https://trw-backend-api.herokuapp.com/
                axios
                    .delete(
                        `https://trw-backend-api.herokuapp.com/blog/delete_cat/${_id}`
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
        const offset = this.state.currentPage * PER_PAGE;

        const currentPageData =
            this.state.categories &&
            this.state.categories.slice(offset, offset + PER_PAGE).map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                            <div className="limited-text">{item.event_category}</div>
                        </td>
                        <td>
                            <Link to={`/view_event_cat/${item._id}`}>
                                <span className="btn">View</span>
                            </Link>

                            <Link to={`/edit_event_cat/${item._id}`}>
                                <span className="btn">Edit</span>
                            </Link>
                            <span
                                className="btn"
                                onClick={this.deleteItem.bind(this, item._id)}
                            >
                                Delete
                            </span>
                        </td>
                    </tr>
                );
            });

        const pageCount = Math.ceil(
            this.state.blogs && this.state.blogs.length / PER_PAGE
        );
        return (
            <div>
                <Sidebar></Sidebar>
                <div className="admin-wrapper col-12">
                    <div className="admin-content">
                        <div className="admin-head">Event - Category</div>
                        <div className="admin-data">
                            {this.state.loading ? (
                                <>
                                    <div className="col-lg-12 p-0 text-right mb-30">
                                        <a href="add_new_event_cat">
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
                                                    <th>Category</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody> {currentPageData}</tbody>
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

export default EventCategory;
