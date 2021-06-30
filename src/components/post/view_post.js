import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import renderHTML from "react-render-html";
import Loader from "react-loader-spinner";
import '../../App.css'
class ViewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      menu: "",
      submenu: "",
      loading: false,
    };
  }
  componentDidMount() {
    const { _id } = this.props.match.params;
    console.log(_id);
    axios
      .get(`https://trw-backend-api.herokuapp.com/update_post/${_id}`)
      .then((res) => {
        console.log(res.data);
        const post = {
          title: res.data.title,
          description: res.data.description,
          menu: res.data.menu,
          submenu: res.data.submenu,
        };
        console.log(post.title);
        this.setState({
          title: post.title,
          description: post.description,
          menu: post.menu,
          submenu: post.submenu,
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
            <div className="admin-head">Post - View</div>
            {this.state.loading ? (
              <div className="admin-data">
                <div className="col-lg-12 p-0 text-right mb-30">
                  <a href="/post">
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
                          <b>Description</b>
                        </td>
                        <td className="allpostData">{renderHTML(this.state.description)}</td>
                      </tr>
                      <tr>
                        <td valign="top" width="150px;">
                          <b>Menu</b>
                        </td>
                        <td>{this.state.menu}</td>
                      </tr>
                      <tr>
                        <td valign="top" width="150px;">
                          <b>Sub Menu</b>
                        </td>
                        <td>{this.state.submenu}</td>
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

export default ViewPost;
