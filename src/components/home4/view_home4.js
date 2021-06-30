import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Loader from "react-loader-spinner";
class ViewHome4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      image: "",
      loading: false,
    };
  }
  componentDidMount() {
    const { _id } = this.props.match.params;
    console.log(_id);
    axios
      .get(`https://trw-backend-api.herokuapp.com/home/update_home4/${_id}`)
      .then((res) => {
        console.log(res.data);
        const home4 = {
          title: res.data.title,
          description: res.data.description,
          image: res.data.image,
          url: res.data.url,
        };
        console.log(home4.title);
        this.setState({
          title: home4.title,
          description: home4.description,
          url: home4.url,
          image: home4.image,
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
            <div className="admin-head">Home Section 4 - View</div>
            {this.state.loading ? (
              <div className="admin-data">
                <div className="col-lg-12 p-0 text-right mb-30">
                  <a href="/home_section_4">
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
                        <td>{this.state.description}</td>
                      </tr>

                      <tr>
                        <td valign="top" width="150px;">
                          <b>image</b>
                        </td>
                        <td>
                          <img src={this.state.image} />
                        </td>
                      </tr>
                      <tr>
                        <td valign="top" width="150px;">
                          <b>Link</b>
                        </td>
                        <td>{this.state.url}</td>
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

export default ViewHome4;
