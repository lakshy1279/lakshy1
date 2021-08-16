import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import renderHTML from "react-render-html";
import Loader from "react-loader-spinner";
import * as moment from "moment";
class ViewHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        heading: "",
        fetchedData: [],
        image:"",
        mobile_message: "",
        subtext:"",
        buttonname:"",
        buttonurl:"",
      loading: false,
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    axios
      .get(`https://lakshy12.herokuapp.com/home/get_home/${id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          heading:res.data.heading,
          image:res.data.image,
          subtext:res.data.subtext,
          buttonname:res.data.buttonname,
          buttonurl:res.data.buttonurl,
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
            <div className="admin-head">Home - View</div>
            <div className="admin-data">
              {this.state.loading ? (
                <>
                  <div className="col-lg-12 p-0 text-right mb-30">
                    <a href="/home1">
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
                            <b>Heading</b>
                          </td>
                          <td>{this.state.heading}</td>
                        </tr>
                        <tr>
                          <td valign="top" width="150px;">
                            <b>Heading(subtext)</b>
                          </td>
                          <td>{this.state.subtext}</td>
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
                            <b>ButtonName</b>
                          </td>
                          <td>{this.state.buttonname}</td>
                        </tr>
                        <tr>
                          <td valign="top" width="150px;">
                            <b>Buttonurl</b>
                          </td>
                          <td>{this.state.buttonurl}</td>
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

export default ViewHome;
