import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import renderHTML from "react-render-html";
import Loader from "react-loader-spinner";
import * as moment from "moment";
class ViewBlog1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      category: "",
      image: "",
      date: "",
      featured: false,
      loading: false,
    };
  }
  componentDidMount() {
    const { _id } = this.props.match.params;
    console.log(_id);
    axios
      .get(`https://lakshy12.herokuapp.com/blog/update_blog1/${_id}`)
      .then((res) => {
        console.log(res.data);
        const post = {
          title: res.data.title,
          description: res.data.description,
          category: res.data.category,
          image: res.data.image,
          date: res.data.date,
          author: res.data.author,
          featured: res.data.featured,
        };
        console.log(post.featured);
        this.setState({
          title: post.title,
          description: post.description,
          category: post.category,
          image: post.image,
          date: post.date,
          author: post.author,
          loading: true,
          featured: post.featured,
        });
      });
  }

  render() {
    const timeElapsed = parseInt(this.state.date);
    const today = new Date(timeElapsed);
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Article - View</div>
            <div className="admin-data">
              {this.state.loading ? (
                <>
                  <div className="col-lg-12 p-0 text-right mb-30">
                    <a href="/article">
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
                            <b>Title</b>
                          </td>
                          <td>{this.state.title}</td>
                        </tr>
                        <tr>
                          <td valign="top" width="150px;">
                            <b>Author</b>
                          </td>
                          <td>{this.state.author}</td>
                        </tr>
                        <tr>
                          <td valign="top" width="150px;">
                            <b>Image</b>
                          </td>
                          <td>
                            <img
                              src={this.state.image}
                              width="100px"
                              height="70px"
                            />
                          </td>
                        </tr>

                        <tr>
                          <td valign="top" width="150px;">
                            <b>Description</b>
                          </td>
                          <td>{renderHTML(this.state.description)}</td>
                        </tr>
                        <tr>
                          <td valign="top" width="150px;">
                            <b>category</b>
                          </td>
                          <td>{this.state.category}</td>
                        </tr>
                        {console.log(this.state.featured)}
                        <tr>
                          <td valign="top" width="150px;">
                            <b>Featured</b>
                          </td>
                          <td>{this.state.featured?"True":"False"}</td>
                        </tr>
                        <tr>
                          <td valign="top" width="150px;">
                            <b>Date</b>
                          </td>
                          <td>{today.toDateString()}</td>
                        </tr>
                      </tbody>
                    </table>
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

export default ViewBlog1;
