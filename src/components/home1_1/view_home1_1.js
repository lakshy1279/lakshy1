import axios from "axios";
import React from "react";
import Sidebar from "../Sidebar";
import Loader from "react-loader-spinner";
class ViewHome1_1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: "",

      mobile_message: "",
      validError: false,
      loading: false,
    };
  }
  componentDidMount() {
    const { _id } = this.props.match.params;
    console.log(_id);
    axios
      .get(
        `https://trw-backend-api.herokuapp.com/home/update_home1_1/${_id}`
      )
      .then((res) => {
        console.log(res.data);
        const home1_1 = {
          video: res.data.video,
        };
        console.log(home1_1.title);
        this.setState({
          video: home1_1.video,
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
            <div className="admin-head">Home Section 1 Video - View</div>
            {this.state.loading ? (
              <div className="admin-data">
                <div className="col-lg-12 p-0 text-right mb-30">
                  <a href="/home_section_1_1">
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
                          <b>video</b>
                        </td>
                        <td>
                          <iframe
                            width="560"
                            height="315"
                            src={this.state.video}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                          ></iframe>
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

export default ViewHome1_1;
