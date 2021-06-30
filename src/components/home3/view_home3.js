import axios from "axios";
import React from "react";
import Sidebar from "../Sidebar";
import SimpleReactValidator from "simple-react-validator";
import Loader from "react-loader-spinner";
class ViewHome3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      subtitle: "",
      description: "",
      image: "",

      mobile_message: "",
      validError: false,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);

    this.onFileChange = this.onFileChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validator = new SimpleReactValidator({
      className: "text-danger",
      validators: {
        passwordvalid: {
          message:
            "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
            "ter and 1 alphabet.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,30}$/i
              ) && params.indexOf(val) === -1
            );
          },
        },
        passwordMismatch: {
          message: "confirm password must match with password field.",
          rule: function (val, params, validator) {
            return document.getElementById("password_input").value === val
              ? true
              : false;
          },
        },
        whitespace: {
          message: "The :attribute not allowed first whitespace   characters.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /[^\s\\]/) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialChar: {
          message: "The :attribute not allowed special   characters.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialCharText: {
          message: "The :attribute may only contain letters, dot and spaces.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },

        zip: {
          message: "Invalid Pin Code",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^(\d{5}(\d{4})?)?$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        website: {
          message: "The Url should be example.com ",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
              ) && params.indexOf(val) === -1
            );
          },
        },
        Fax: {
          message: "Invalid fax number ",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i
              ) && params.indexOf(val) === -1
            );
          },
        },
      },
    });
  }
  componentDidMount() {
    const { _id } = this.props.match.params;
    console.log(_id);
    axios
      .get(`https://trw-backend-api.herokuapp.com/home/update_home3/${_id}`)
      .then((res) => {
        console.log(res.data);
        const home3 = {
          title: res.data.title,
          subtitle: res.data.subtitle,
          description: res.data.description,
          image: res.data.image,
        };
        console.log(home3.title);
        this.setState({
          title: home3.title,
          subtitle: home3.subtitle,
          description: home3.description,

          image: home3.image,
          loading: true,
        });
      });
  }

  onFileChange(e) {
    this.setState({ image: e.target.files[0] });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  //   handleSubmit(e) {
  //     e.preventDefault();

  //     const formdata = new FormData();
  //     formdata.append("title", this.state.title);
  //     formdata.append("subtitle", this.state.subtitle);
  //     formdata.append("description", this.state.description);
  //     formdata.append("file", this.state.image);

  //     axios
  //       .post(
  //         "https://trw-backend-api.herokuapp.com/home/AddHome3",

  //         formdata
  //       )
  //       .then(function (response) {
  //         // handle success

  //         console.log(response.data);

  //         this.setState({ formdata });
  //       })
  //       .catch(function (error) {
  //         // handle error
  //         console.log(error);
  //       });
  //     this.props.history.push("/post");
  //   }
  handleSubmit(e) {
    const { _id } = this.props.match.params;
    e.preventDefault();
    if (this.validator.allValid()) {
      const formdata = new FormData();
      formdata.append("title", this.state.title);
      formdata.append("subtitle", this.state.subtitle);
      formdata.append("description", this.state.description);
      formdata.append("file", this.state.image);
      //   const post = {
      //     title: this.state.title,
      //     subtitle: home3.subtitle,
      //     description: this.state.description,
      //     image: this.state.image,
      //   };
      axios
        .put(
          `https://trw-backend-api.herokuapp.com/home/update_home3_patch/${_id}`,
          formdata
        )
        .then((res) => console.log(res.data));

      this.props.history.push("/post");
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Home Section 3 - View</div>
            {this.state.loading ? (
              <div className="admin-data">
                <div className="col-lg-12 p-0 text-right mb-30">
                  <a href="/home_section_3">
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
                          <b>Sub Title</b>
                        </td>
                        <td>{this.state.subtitle}</td>
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

export default ViewHome3;
