import React from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";
const PER_PAGE = 10;
class Home1_1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home1_1: [],
      currentPage: 0,
      loading: false,
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    axios
      .get(`https://trw-backend-api.herokuapp.com/home/home1_1s`)
      .then((res) => {
        const home1_1s = res.data;
        console.log(home1_1s);
        this.setState({ home1_1s, loading: true });
      });
    this.unsubscribe = axios
      .get(`https://trw-backend-api.herokuapp.com/home/home1_1s`)
      .then((res) => {
        const home1_1s = res.data;
        console.log(home1_1s);
        this.setState({ home1_1s, loading: true });
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
            `https://trw-backend-api.herokuapp.com/home/delete_home1_1/${_id}`
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
      this.state.home1_1s &&
      this.state.home1_1s
        .slice(offset, offset + PER_PAGE)
        .map((home, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <iframe
                  width="50"
                  height="50"
                  src={home.video}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </td>

              <td>
                <Link to={`/view_home1_1/${home._id}`}>
                  <span className="btn">View</span>
                </Link>

                <Link to={`/edit_home1_1/${home._id}`}>
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
      this.state.home1_1s && this.state.home1_1s.length / PER_PAGE
    );
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Home Section 1 Video</div>
            {this.state.loading ? (
              <div className="admin-data">
                <div className="col-lg-12 p-0 text-right mb-30">
                  <a href="add_home1_1">
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
                        <th>video</th>

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

export default Home1_1;
