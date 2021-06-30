import React from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";
import moment from "moment";
const PER_PAGE = 10;
class EventUpcoming extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            currentPage: 0,
            loading: false,
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    componentDidMount() {
        // https://trw-backend-api.herokuapp.com/
        axios
            .get(`https://trw-backend-api.herokuapp.com/blog/get_all_events`)
            .then((res) => {
                const events = res.data.map(item => {
                    // console.log(moment(new Date(item.date).toLocaleString()))
                    if (new Date(item.date).getMonth() >= new Date(Date.now()).getMonth()) {
                        if (new Date(item.date).getDate() === new Date(Date.now()).getDate()) {
                            if (new Date(item.date).getHours() > new Date(Date.now()).getHours()) {
                                return item;
                            } else {
                                return false;
                            }
                        } else if (new Date(item.date).getDate() > new Date(Date.now()).getDate()) {
                            return item;
                        } else {
                            return false;
                        }
                    } else {
                        return false
                    }
                });
                const eventRes = res.data;
                console.log(events);
                console.log(eventRes);
                this.setState({ events, loading: true });
            });
        this.unsubscribe = axios
            .get(`https://trw-backend-api.herokuapp.com/blog/get_all_events`)
            .then((res) => {
                const events = res.data.map(item => {
                    // console.log(moment(new Date(item.date).toLocaleString()))
                    if (new Date(item.date).getMonth() >= new Date(Date.now()).getMonth()) {
                        if (new Date(item.date).getDate() === new Date(Date.now()).getDate()) {
                            if (new Date(item.date).getHours() > new Date(Date.now()).getHours()) {
                                return item;
                            } else {
                                return false;
                            }
                        } else if (new Date(item.date).getDate() > new Date(Date.now()).getDate()) {
                            return item;
                        } else {
                            return false;
                        }
                    } else {
                        return false
                    }
                });
                // const events = res.data;
                console.log(events);
                this.setState({ events, loading: true });
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
                        `https://trw-backend-api.herokuapp.com/blog/delete_event/${_id}`
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
        let count = 0;
        const currentPageData =
            this.state.events &&
            this.state.events.reverse().slice(offset, offset + PER_PAGE).map((blog, index) => {
                return (

                    blog && (
                        < tr key={index} >
                            <td>{++count}</td>

                            <td>
                                <div className="limited-text">{blog.title}</div>
                            </td>
                            <td>{blog.category}</td>
                            <td>{blog.type}</td>
                            {/* <td>{ }</td> */}
                            <td>{new Date(blog.date).toDateString() + "," + new Date(blog.date).toLocaleTimeString()}</td>
                            <td>
                                <Link to={`/view_events/${blog._id}`}>
                                    <span className="btn">View</span>
                                </Link>

                                <Link to={`/edit_event/${blog._id}`}>
                                    <span className="btn">Edit</span>
                                </Link>
                                <span
                                    className="btn"
                                    onClick={this.deleteItem.bind(this, blog._id)}
                                >
                                    Delete
                                </span>
                            </td>
                        </tr >
                    )
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
                        <div className="admin-head">Upcoming Events</div>
                        <div className="admin-data">
                            {this.state.loading ? (
                                <>
                                    <div className="col-lg-12 p-0 text-right mb-30">
                                        <a onClick={() => window.history.back()}>
                                            <button className="button button-contactForm boxed-btn">
                                                Back
                                            </button>
                                        </a>
                                    </div>
                                    <div className="table-responsive admin-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Title</th>
                                                    <th>category</th>
                                                    <th>Type</th>
                                                    <th>Date/Time</th>
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
            </div >
        );
    }
}

export default EventUpcoming;
