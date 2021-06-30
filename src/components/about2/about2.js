import React from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";
const PER_PAGE = 10;
class About2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      About2: [],
      currentPage: 0,
      loading: false,
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount() {
    axios
      .get(`https://trw-backend-api.herokuapp.com/about/about2s`)
      .then((res) => {
        const about2s = res.data;
        console.log(about2s);
        this.setState({ about2s, loading: true });
      });
    this.unsubscribe = axios
      .get(`https://trw-backend-api.herokuapp.com/about/about2s`)
      .then((res) => {
        const about2s = res.data;
        console.log(about2s);
        this.setState({ about2s, loading: true });
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
            `https://trw-backend-api.herokuapp.com/about/delete_about2/${_id}`
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
      this.state.about2s &&
      this.state.about2s
        .slice(offset, offset + PER_PAGE)
        .map((about, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{about.title}</td>

              <td>
                <Link to={`/view_about2/${about._id}`}>
                  <span className="btn">View</span>
                </Link>

                <Link to={`/edit_about2/${about._id}`}>
                  <span className="btn">Edit</span>
                </Link>
                <span
                  className="btn"
                  onClick={this.deleteItem.bind(this, about._id)}
                >
                  Delete
                </span>
              </td>
            </tr>
          );
        });

    const pageCount = Math.ceil(
      this.state.about2s && this.state.about2s.length / PER_PAGE
    );
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Values & Principles</div>
            {this.state.loading ? (
              <div className="admin-data">
                <div className="col-lg-12 p-0 text-right mb-30">
                  <a href="add_about2">
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
      </div>
    );
  }
}

export default About2;
