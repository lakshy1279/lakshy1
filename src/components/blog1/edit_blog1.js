import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import SimpleReactValidator from "simple-react-validator";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loader from "react-loader-spinner";
class EditBlog1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      category: "",
      description: "",
      image: "",
      author: "",
      date: Date.now(),
      theme: "snow",
      mobile_message: "",
      validError: false,
      featured: false,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onChange = this.onChange.bind(this);

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
      .get(`https://lakshy12.herokuapp.com/blog/update_blog1/${_id}`)
      .then((res) => {
        console.log(res.data);
        const post = {
          title: res.data.title,
          category: res.data.category,
          image: res.data.image,
          description: res.data.description,
          date: res.data.date,
          author: res.data.author,
          featured: res.data.featured,
        };
        console.log(post.title);
        this.setState({
          title: post.title,
          category: post.category,
          image: post.image,
          description: post.description,
          date: post.date,
          author: post.author,
          featured: post.featured,
          loading: true,
        });
      });

    axios
      .get(`https://lakshy12.herokuapp.com/blog/blogcategorys`)
      .then((res) => {
        const blogcategories = res.data;
        console.log(blogcategories);
        this.setState({ blogcategories });
      });
  }

  handleChange(html) {
    this.setState({ description: html });
  }
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  selectFeatured(e) {
    this.setState({ featured: e.target.checked });
  }
  onFileChange(e) {
    this.setState({ image: e.target.files[0] });
  }
  handleThemeChange(newTheme) {
    if (newTheme === "core") newTheme = null;
    this.setState({ theme: newTheme });
  }

  //   handleSubmit(e) {
  //     const { _id } = this.props.match.params;
  //     e.preventDefault();
  //     if (this.validator.allValid()) {
  //       const post = {
  //         title: this.state.title,
  //         category: this.state.category,
  //         description: this.state.description,
  //       };
  //       axios
  //         .put(
  //           `https://lakshy12.herokuapp.com/blog/update_blog1_patch/${_id}`,
  //           post
  //         )
  //         .then((res) => console.log(res.data));

  //       this.props.history.push("/article");
  //     } else {
  //       this.validator.showMessages();
  //       this.forceUpdate();
  //     }
  //   }

  handleSubmit(e) {
    const { _id } = this.props.match.params;
    e.preventDefault();
    if (this.validator.allValid()) {
      console.log(this.state);
      const formdata = new FormData();
      formdata.append("title", this.state.title);
      formdata.append("category", this.state.category);
      formdata.append("description", this.state.description);
      formdata.append("file", this.state.image);
      formdata.append("date", Date.now());
      formdata.append("author", this.state.author);
      formdata.append("featured", this.state.featured);
      axios
        .put(`http://localhost:5000/blog/update_blog1_patch/${_id}`, formdata)
        .then((res) => console.log(res.data));

      // this.props.history.push("/article");
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
            <div className="admin-head">Edit Article</div>
            {this.state.loading ? (
              <div className="admin-data">
                <div className="col-lg-12 p-0 text-right mb-30">
                  <a href="/article">
                    <button className="button button-contactForm boxed-btn">
                      Back
                    </button>
                  </a>
                </div>
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
                            onChange={this.onChange}
                            value={this.state.title}
                            type="text"
                            onfocus="this.placeholder = 'Menu Name'"
                            onblur="this.placeholder = ''"
                            placeholder=""
                          />
                          {this.validator.message(
                            "Title",
                            this.state.title,
                            "required|whitespace|min:1|max:150"
                          )}
                          {this.state.mobile_message}
                        </div>
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">Author</label>
                          <input
                            className="form-control col-lg-10"
                            name="author"
                            onChange={this.onChange}
                            value={this.state.author}
                            type="text"
                            onfocus="this.placeholder = 'Menu Name'"
                            onblur="this.placeholder = ''"
                            placeholder=""
                          />
                          {this.validator.message(
                            "author",
                            this.state.author,
                            "required|whitespace|min:1|max:150"
                          )}
                          {this.state.mobile_message}
                        </div>
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">Category Name</label>

                          <select
                            className="form-control col-lg-10"
                            name="category"
                            value={this.state.category}
                            onChange={this.onChange}
                          >
                            <option>Select Blog Category</option>
                            {this.state.blogcategories &&
                              this.state.blogcategories.map((data, index) => {
                                return (
                                  <option value={data.category} key={index}>
                                    {data.category}
                                  </option>
                                );
                              })}
                          </select>

                          {this.validator.message(
                            "category Name",
                            this.state.category,
                            "required"
                          )}
                        </div>
                        <div className="col-lg-12 p-0">
                          <div
                            className="form-group tags-field row m-0"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <label className="col-lg-2 p-0">Featured</label>
                            <input
                              name="featured"
                              onChange={this.selectFeatured.bind(this)}
                              value={this.state.featured}
                              type="checkbox"
                            />
                          </div>
                        </div>
                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">Upload Image</label>
                          <input
                            type="file"
                            onChange={this.onFileChange}
                            name="file"
                            className="form-control col-lg-10"
                          />

                          {this.validator.message(
                            "Image",
                            this.state.image,
                            "required"
                          )}
                        </div>

                        <div className="form-group tags-field row m-0">
                          <label className="col-lg-2 p-0">Description</label>
                          {/* <textarea
                          className="form-control col-lg-10"
                          name="description"
                          onChange={this.onChange}
                          value={this.state.description}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder=""
                        /> */}
                          <ReactQuill
                            className=" col-lg-10 height"
                            theme={this.state.theme}
                            onChange={this.handleChange}
                            value={this.state.description}
                            modules={EditBlog1.modules}
                            formats={EditBlog1.formats}
                            bounds={".app"}
                            placeholder={this.props.placeholder}
                          />

                          {this.validator.message(
                            "Description",
                            this.state.description,
                            "required"
                          )}
                        </div>
                      </div>

                      <br />
                      <hr />

                      <div className="col-lg-12 p-0">
                        <div className="form-group tags-field  row m-0">
                          <label className="col-lg-2 p-0" />
                          <div className="col-lg-6 p-0">
                            <button
                              className="button button-contactForm boxed-btn margin"
                              type="submit"
                              style={{ marginTop: "5rem" }}
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
EditBlog1.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

EditBlog1.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

EditBlog1.propTypes = {
  placeholder: PropTypes.string,
};
export default EditBlog1;
