import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Loader from "react-loader-spinner";
class ViewAbout3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }
  componentDidMount() {
    const { _id } = this.props.match.params;
    console.log(_id);

    axios
      .get(
        `https://trw-backend-api.herokuapp.com/about/update_about3/${_id}`
      )
      .then((res) => {
        console.log(res.data);
        const about3 = {
          name: res.data.name,
          designation: res.data.designation,
          image: res.data.image,
          twitter: res.data.twitter,
          facebook: res.data.facebook,
          google: res.data.google,
          linkedIn: res.data.linkedIn ? res.data.linkedIn : "",
        };
        console.log(about3.title);
        this.setState({
          name: about3.name,
          designation: about3.designation,
          image: about3.image,
          twitter: about3.twitter,
          facebook: about3.facebook,
          google: about3.google,
          linkedIn: about3.linkedIn,
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
            <div className="admin-head">View Leadership Team</div>
            {this.state.loading ? (
              <div className="admin-data">
                <div className="col-lg-12 p-0 text-right mb-30">
                  <a href="/about_section_3">
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
                          <b>Name</b>
                        </td>
                        <td>{this.state.name}</td>
                      </tr>

                      <tr>
                        <td valign="top" width="150px;">
                          <b>Designation</b>
                        </td>
                        <td>{this.state.designation}</td>
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
                          <b>Twitter</b>
                        </td>

                        <td>{this.state.twitter}</td>
                      </tr>
                      <tr>
                        <td valign="top" width="150px;">
                          <b>Facebook</b>
                        </td>

                        <td>{this.state.facebook}</td>
                      </tr>
                      <tr>
                        <td valign="top" width="150px;">
                          <b>Google</b>
                        </td>

                        <td>{this.state.google}</td>
                      </tr>
                      <tr>
                        <td valign="top" width="150px;">
                          <b>LinkedIn</b>
                        </td>

                        <td>{this.state.linkedIn}</td>
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

export default ViewAbout3;
