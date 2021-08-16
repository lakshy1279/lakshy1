import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import '../../App.css';
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";
const PER_PAGE=10;
class Home1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          blogs: [],
          currentPage: 0,
          loading: false,
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
      }
      
      componentDidMount() {
        axios
          .get(`https://lakshy12.herokuapp.com/home/fetch_home`)
          .then((res) => {
            const blogs = res.data.reverse();
            console.log(blogs);
            this.setState({ blogs, loading: true });
          });
        this.unsubscribe = axios
          .get(`https://lakshy12.herokuapp.com/home/fetch_home`)
          .then((res) => {
            const blogs = res.data.reverse();
            console.log(blogs);
            this.setState({ blogs, loading: true });
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
                `https://lakshy12.herokuapp.com/home/delete/${_id}`
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
          this.state.blogs &&
          this.state.blogs.slice(offset, offset + PER_PAGE).map((blog, index) => {
            const timeElapsed = parseInt(blog.date);
            const today = new Date(timeElapsed);
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="limited-text">{blog.heading}</div>
                </td>
                <td>{new Date(blog.updatedAt).toDateString()}</td>
                <td>
                  <Link to={`/view_home/${blog._id}`}>
                    <span className="btn">View</span>
                  </Link>
    
                  <Link to={`/edit_home/${blog._id}`}>
                    <span className="btn">Edit</span>
                  </Link>
                  <span
                    className="btn"
                    onClick={this.deleteItem.bind(this, blog._id)}
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
                <div className="admin-head">Home</div>
                <div className="admin-data">
                  {this.state.loading ? (
                    <>
                      <div className="col-lg-12 p-0 text-right mb-30">
                        <a href="home">
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
                              <th>Title</th>
                              <th>Date</th>
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
export default Home1;
