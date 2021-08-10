import React from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";
const PER_PAGE = 10;
class Reason extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedData: [],
            currentPage: 0,
            loading: false,
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    componentDidMount() {
        // https://trw-backend-api.herokuapp.com/
        axios
            .get(`https://lakshy12.herokuapp.com/reason/fetch`)
            .then((res) => {
                const fetchedData = res.data;
                console.log(fetchedData);
                this.setState({ fetchedData, loading: true });
            });
        this.unsubscribe = axios
            .get(`https://lakshy12.herokuapp.com/reason/fetch`)
            .then((res) => {
                const fetchedData = res.data;
                console.log(fetchedData);
                this.setState({ fetchedData, loading: true });
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
                        `https://lakshy12.herokuapp.com/reason/delete/${_id}`
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
            this.state.fetchedData.length>0 &&
            this.state.fetchedData.reverse().slice(offset, offset + PER_PAGE).map((item, index) => {
                return (

                    item && (
                        < tr key={index} >
                            <td>{++count}</td>
                            <td>
                                <div className="limited-text">{item.reason}</div>
                            </td>
                            <td>
                                <span
                                    className="btn"
                                    onClick={this.deleteItem.bind(this, item._id)}
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
                        <div className="admin-head">Contact Reason</div>
                        <div className="admin-data">
                            {this.state.loading ? (
                                <>
                                    <div className="col-lg-12 p-0 text-right mb-30">
                                        <a href="add_reason">
                                            <button className="button button-contactForm boxed-btn">
                                                Add New
                                            </button>
                                        </a>
                                    </div>
                                    <div className="table-responsive admin-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Reason</th>
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

export default Reason;
