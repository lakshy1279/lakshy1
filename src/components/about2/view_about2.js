import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Loader from "react-loader-spinner";
class ViewAbout2 extends React.Component {
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
      .get(
        `https://trw-backend-api.herokuapp.com/about/update_about2/${_id}`
      )
      .then((res) => {
        console.log(res.data);
        const about2 = {
          title: res.data.title,
          description: res.data.description,
          image: res.data.image,
        };
        console.log(about2.title);
        this.setState({
          title: about2.title,
          description: about2.description,

          image: about2.image,
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
            <div className="admin-head">View Values & Principles</div>
            {this.state.loading ? (
              <div className="admin-data">
                <div className="col-lg-12 p-0 text-right mb-30">
                  <a href="/about_section_2">
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

export default ViewAbout2;
