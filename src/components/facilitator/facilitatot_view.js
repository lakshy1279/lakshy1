import React from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";

const PER_PAGE = 10;
class Facilitator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedData: [],
            currentPage: 0,
            loading: false,
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleFeatured=this.handleFeatured.bind(this);
    }

    componentDidMount() {
        axios
            .get(`https://lakshy12.herokuapp.com/facilitator/fetch`)
            .then((res) => {
                const fetchedData = res.data;
                console.log(fetchedData);
                this.setState({ fetchedData, loading: true });
            });
        this.unsubscribe = axios
            .get(`https://lakshy12.herokuapp.com/facilitator/fetch`)
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
                        `https://lakshy12.herokuapp.com/facilitator/delete/${_id}`
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
    handleFeatured(e,_id)
    {
      console.log(e.target.innerHTML);
      console.log(_id);
      const value=e.target.innerHTML;
      if(value==='featured')
      {
        axios
        .put(
            `https://lakshy12.herokuapp.com/facilitator/update_feature/${_id}`,
            {
                featured:true
            }
        )
        .then((res) => {
            console.log(res.data);
            window.location.reload();
        })
      }
      else
      {
        axios
        .put(
            `https://lakshy12.herokuapp.com/facilitator/update_feature/${_id}`,
            {
              featured:false
            }
        )
        .then((res) => {
            console.log(res.data);
            window.location.reload();
        })
      }
    }
    render() {
        const offset = this.state.currentPage * PER_PAGE;

        const currentPageData =
            this.state.fetchedData &&
            this.state.fetchedData.slice(offset, offset + PER_PAGE).map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                           {item.firstname}
                        </td>
                        <td>
                           {item.lastname}
                        </td>
                        <td>
                           {new Date(item.createdAt).toDateString()}
                        </td>
                        <td>
                            <Link to={`/view_facilitator/${item._id}`}>
                                <span className="btn">View</span>
                            </Link>

                            <Link to={`/edit_facilitator/${item._id}`}>
                                <span className="btn">Edit</span>
                            </Link>
                            <span
                                className="btn"
                                onClick={this.deleteItem.bind(this, item._id)}
                            >
                                Delete
                            </span>
                            <span
                                className="btn"
                                onClick={(e)=>this.handleFeatured(e,item._id)}
                            >
                              {item.featured?'UnFeatured':'featured'}  
                            </span>
                        </td>
                    </tr>
                );
            });

        const pageCount = Math.ceil(
            this.state.fetchedData && this.state.fetchedData.length / PER_PAGE
        );
        return (
            <div>
                <Sidebar></Sidebar>
                <div className="admin-wrapper col-12">
                    <div className="admin-content">
                        <div className="admin-head">Facilitator</div>
                        <div className="admin-data">
                            {this.state.loading ? (
                                <>
                                    <div className="col-lg-12 p-0 text-right mb-30">
                                        <a href="add_facilitator">
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
                                                    <th>First name</th>
                                                    <th>Last name</th>
                                                    <th>Added On</th>
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

export default Facilitator;
