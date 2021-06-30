// import axios from "axios";
// import React from "react";
// import Sidebar from "../../components/Sidebar";
// import SimpleReactValidator from "simple-react-validator";
// class EditHome1 extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: "",
//       subtitle: "",
//       video: "",

//       mobile_message: "",
//       validError: false,
//     };
//     this.handleChange = this.handleChange.bind(this);

//     this.onFileChange = this.onFileChange.bind(this);

//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.validator = new SimpleReactValidator({
//       className: "text-danger",
//       validators: {
//         passwordvalid: {
//           message:
//             "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
//             "ter and 1 alphabet.",
//           rule: function (val, params, validator) {
//             return (
//               validator.helpers.testRegex(
//                 val,
//                 /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,30}$/i
//               ) && params.indexOf(val) === -1
//             );
//           },
//         },
//         passwordMismatch: {
//           message: "confirm password must match with password field.",
//           rule: function (val, params, validator) {
//             return document.getElementById("password_input").value === val
//               ? true
//               : false;
//           },
//         },
//         whitespace: {
//           message: "The :attribute not allowed first whitespace   characters.",
//           rule: function (val, params, validator) {
//             return (
//               validator.helpers.testRegex(val, /[^\s\\]/) &&
//               params.indexOf(val) === -1
//             );
//           },
//         },
//         specialChar: {
//           message: "The :attribute not allowed special   characters.",
//           rule: function (val, params, validator) {
//             return (
//               validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) &&
//               params.indexOf(val) === -1
//             );
//           },
//         },
//         specialCharText: {
//           message: "The :attribute may only contain letters, dot and spaces.",
//           rule: function (val, params, validator) {
//             return (
//               validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) &&
//               params.indexOf(val) === -1
//             );
//           },
//         },

//         zip: {
//           message: "Invalid Pin Code",
//           rule: function (val, params, validator) {
//             return (
//               validator.helpers.testRegex(val, /^(\d{5}(\d{4})?)?$/i) &&
//               params.indexOf(val) === -1
//             );
//           },
//         },
//         website: {
//           message: "The Url should be example.com ",
//           rule: function (val, params, validator) {
//             return (
//               validator.helpers.testRegex(
//                 val,
//                 /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
//               ) && params.indexOf(val) === -1
//             );
//           },
//         },
//         Fax: {
//           message: "Invalid fax number ",
//           rule: function (val, params, validator) {
//             return (
//               validator.helpers.testRegex(
//                 val,
//                 /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i
//               ) && params.indexOf(val) === -1
//             );
//           },
//         },
//       },
//     });
//   }
//   componentDidMount() {
//     const { _id } = this.props.match.params;
//     console.log(_id);
//     axios
//       .get(`http://cms.deepthought.education:5055/home/update_home1/${_id}`)
//       .then((res) => {
//         console.log(res.data);
//         const home1_1 = {
//           title: res.data.title,
//           subtitle: res.data.subtitle,
//           video: res.data.video,
//         };
//         console.log(home1_1.title);
//         this.setState({
//           title: home1_1.title,
//           subtitle: home1_1.subtitle,
//           video: home1_1.video,
//         });
//       });
//   }

//   onFileChange(e) {
//     this.setState({ video: e.target.files[0] });
//   }
//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   }

//   handleSubmit(e) {
//     const { _id } = this.props.match.params;
//     e.preventDefault();
//     if (this.validator.allValid()) {
//       const formdata = new FormData();
//       formdata.append("title", this.state.title);
//       formdata.append("subtitle", this.state.subtitle);
//       formdata.append("file", this.state.video);

//       axios
//         .put(
//           `http://cms.deepthought.education:5055/home/update_home1_patch/${_id}`,
//           formdata
//         )
//         .then((res) => console.log(res.data));

//       this.props.history.push("/home_section_1");
//     } else {
//       this.validator.showMessages();
//       this.forceUpdate();
//     }
//   }

//   render() {
//     return (
//       <div>
//         <Sidebar></Sidebar>
//         <div className="admin-wrapper col-12">
//           <div className="admin-content">
//             <div className="admin-head">Edit Home Section1 </div>
//             <div className="admin-data">
//               <div className="col-lg-12 p-0 text-right mb-30">
//                 <a href="/home_section_1">
//                   <button className="button button-contactForm boxed-btn">
//                     Back
//                   </button>
//                 </a>
//               </div>
//               <div className="container-fluid p-0">
//                 <form
//                   className="form-contact contact_form"
//                   onSubmit={this.handleSubmit}
//                 >
//                   <div className="row m-0">
//                     <div className="col-lg-12 p-0"></div>
//                     <div className="col-lg-12 p-0">
//                       <div className="form-group tags-field row m-0">
//                         <label className="col-lg-2 p-0">Title</label>
//                         <input
//                           className="form-control col-lg-10"
//                           name="title"
//                           onChange={this.handleChange}
//                           value={this.state.title}
//                           type="text"
//                           onfocus="this.placeholder = 'Menu Name'"
//                           onblur="this.placeholder = ''"
//                           placeholder=""
//                         />
//                         {this.validator.message(
//                           "Title",
//                           this.state.title,
//                           "required|whitespace|min:1|max:100"
//                         )}
//                       </div>
//                       <div className="form-group tags-field row m-0">
//                         <label className="col-lg-2 p-0">Sub Title</label>
//                         <input
//                           className="form-control col-lg-10"
//                           name="subtitle"
//                           onChange={this.handleChange}
//                           value={this.state.subtitle}
//                           type="text"
//                           onfocus="this.placeholder = 'Menu Name'"
//                           onblur="this.placeholder = ''"
//                           placeholder=""
//                         />
//                         {this.validator.message(
//                           "Sub Title",
//                           this.state.subtitle,
//                           "required|whitespace|min:1|max:400"
//                         )}
//                       </div>
//                       <div className="form-group tags-field row m-0">
//                         <label className="col-lg-2 p-0">Upload Video</label>
//                         <input
//                           type="file"
//                           onChange={this.onFileChange}
//                           name="video"
//                           className="form-control col-lg-10"
//                         />

//                         {this.validator.message(
//                           "Video",
//                           this.state.video,
//                           "required"
//                         )}
//                       </div>
//                     </div>

//                     <div className="col-lg-12 p-0">
//                       <div className="form-group tags-field  row m-0">
//                         <label className="col-lg-2 p-0" />
//                         <div className="col-lg-6 p-0">
//                           <button
//                             className="button button-contactForm boxed-btn"
//                             type="submit"
//                           >
//                             Save
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default EditHome1;

import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import SimpleReactValidator from "simple-react-validator";
import Loader from "react-loader-spinner";
class EditHome1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      subtitle: "",
      video: "",

      mobile_message: "",
      validError: false,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);

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
    axios
      .get(
        `https://trw-backend-api.herokuapp.com/home/update_home1/608b912efcc7860015dce5b1`
      )
      .then((res) => {
        console.log(res.data);
        const home1_1 = {
          title: res.data.title,
          subtitle: res.data.subtitle,
        };
        console.log(home1_1.title);
        this.setState({
          title: home1_1.title,
          subtitle: home1_1.subtitle,
          loading: true,
        });
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      const menu = {
        title: this.state.title,
        subtitle: this.state.subtitle,
      };
      console.log(menu);

      axios
        .put(
          `https://trw-backend-api.herokuapp.com/home/update_home1_patch/608b912efcc7860015dce5b1`,
          menu
        )
        .then((res) => console.log(res.data));
      this.setState({ mobile_message: "Text Updated Sucessfully" });
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
            <div className="admin-head">Home Section1 Text </div>
            {this.state.loading ? (
              <div className="admin-data">
                {this.state.mobile_message == "" ? (
                  <></>
                ) : (
                  <div className="col-lg-12 p-0 text-right mb-30">
                    <a href="#">
                      <button className="button button-contactForm boxed-btn">
                        {this.state.mobile_message}
                      </button>
                    </a>
                  </div>
                )}
                {/* <div className="col-lg-12 p-0 text-right mb-30">
                <a href="/home_section_1">
                  <button className="button button-contactForm boxed-btn">
                    Back
                  </button>
                </a>
              </div> */}
                <div className="container-fluid p-0">
                  <form
                    className="form-contact contact_form"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="row m-0">
                      <div className="col-lg-12 p-0"></div>
                      <div className="col-lg-12 p-0">
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">Title</label>
                          <input
                            className="form-control col-lg-10"
                            name="title"
                            onChange={this.handleChange}
                            value={this.state.title}
                            type="text"
                            onfocus="this.placeholder = 'Menu Name'"
                            onblur="this.placeholder = ''"
                            placeholder=""
                          />
                          {this.validator.message(
                            "Title",
                            this.state.title,
                            "required|whitespace|min:1|max:100"
                          )}
                        </div>
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">Sub Title</label>
                          <input
                            className="form-control col-lg-10"
                            name="subtitle"
                            onChange={this.handleChange}
                            value={this.state.subtitle}
                            type="text"
                            onfocus="this.placeholder = 'Menu Name'"
                            onblur="this.placeholder = ''"
                            placeholder=""
                          />
                          {this.validator.message(
                            "Sub Title",
                            this.state.subtitle,
                            "required|whitespace|min:1|max:400"
                          )}
                        </div>
                      </div>

                      <div className="col-lg-12 p-0">
                        <div className="form-group tags-field  row m-0">
                          <label className="col-lg-2 p-0" />
                          <div className="col-lg-6 p-0">
                            <button
                              className="button button-contactForm boxed-btn"
                              type="submit"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
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

export default EditHome1;
