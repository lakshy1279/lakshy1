import React from "react";
import { isAutheticated, signout } from "../auth";
import { Link, Route, useParams, Redirect, useHistory } from "react-router-dom";
import "../App.css";

function Sidebar() {
  const {
    user: { name },
  } = isAutheticated();

  console.log(name);

  const history = useHistory();
  return (
    <div>
      <div className="admin">
        <div className="slidebar-left">
          <div className="admin-logo">
            <img src="/assets/img/logo/logo.svg" />
          </div>
          <div className="menu-content">
            <div className="gw-sidebar">
              <div id="gw-sidebar" className="gw-sidebar">
                <div className="nano-content">
                  <ul className=" gw-nav gw-nav-list ">
                    <li>
                      <Link to="/dashboard">
                        <i className="fa fa-tachometer" aria-hidden="true" />{" "}
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="/menu">
                        <i className="fa fa-upload" aria-hidden="true" /> Menu
                      </Link>
                    </li>
                    <li>
                      <Link to="/sub_menu">
                        <i class="fa fa-book fa-fw" aria-hidden="true"></i> Sub
                        Menu
                      </Link>
                    </li>
                    <li>
                      {" "}
                      <a href="/about">
                        <span>
                          <i
                            className="fa fa-rss-square"
                            aria-hidden="true"
                          ></i>{" "}
                          About Us
                        </span>
                        <b className="gw-arrow" />
                      </a>
                      </li>
                    <li>
                      {" "}
                      <a href="#">
                        <span>
                          <i
                            className="fa fa-rss-square"
                            aria-hidden="true"
                          ></i>{" "}
                          Blog
                        </span>
                        <b className="gw-arrow" />
                      </a>
                      <ul className="gw-submenu" style={{ display: "block" }}>
                        <li>
                          {" "}
                          <a href="/article" style={{ color: "white" }}>
                            Articles
                          </a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a href="/blogcategory" style={{ color: "white" }}>
                            Category
                          </a>{" "}
                        </li>
                      </ul>
                    </li>
                    {/* event and its types */}

                    <li>
                      {" "}
                      <a href="#">
                        <span>
                          <i
                            className="fa fa-rss-square"
                            aria-hidden="true"
                          ></i>{" "}
                          Event
                        </span>
                        <b className="gw-arrow" />
                      </a>
                      <ul className="gw-submenu" style={{ display: "block" }}>
                        <li>
                          {" "}
                          <a href="/add_new_event" style={{ color: "white" }}>
                            Add New Event
                          </a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a href="/upcomming_events" style={{ color: "white" }}>
                            Upcoming Events
                          </a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a href="/past_events" style={{ color: "white" }}>
                            Past Events
                          </a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a href="/event_category" style={{ color: "white" }}>
                            Event Category
                          </a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a href="/event_types" style={{ color: "white" }}>
                            Types
                          </a>{" "}
                        </li>
                      </ul>
                    </li>
                    <li>
                      {" "}
                      <a href="#">
                        <span>
                          <i
                            className="fa fa-rss-square"
                            aria-hidden="true"
                          ></i>{" "}
                          Site Preferences
                        </span>
                        <b className="gw-arrow" />
                      </a>
                      <ul className="gw-submenu" style={{ display: "block" }}>
                        <li>
                          {" "}
                          <a href="/add_logos" style={{ color: "white" }}>
                            Logos
                          </a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a href="/add_address" style={{ color: "white" }}>
                            Address
                          </a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a href="/add_socialmedia" style={{ color: "white" }}>
                            Social Media
                          </a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a href="/add_compliance" style={{ color: "white" }}>
                            Compliance
                          </a>{" "}
                        </li>

                      </ul>
                    </li>
                    {/* <li>
                      <Link to="/">
                        <i className="fa fa-upload" aria-hidden="true" /> Site Preferences
                      </Link>
                    </li> */}
                    {/* post*/}
                    <li>
                      {" "}
                      <a href="/facilitator">
                        <span>
                          <i
                            className="fa fa-rss-square"
                            aria-hidden="true"
                          ></i>{" "}
                          Facilitator
                        </span>
                        <b className="gw-arrow" />
                      </a>
                      </li>
                    <li>
                      <Link to="/post">
                        <i className="fa fa-upload" aria-hidden="true" /> Posts
                      </Link>
                    </li>
                    <li>
                      {" "}
                      <a href="/contact">
                        <span>
                          <i
                            className="fa fa-rss-square"
                            aria-hidden="true"
                          ></i>{" "}
                          Contact Us
                        </span>
                        <b className="gw-arrow" />
                      </a>
                      </li>
                    <li>
                      <Link
                        to=""
                        onClick={() => {
                          signout(() => {
                            history.push("/");
                          });
                        }}
                      >
                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                        Logout {name}
                      </Link>
                    </li>
                    {/* <li className="init-arrow-down">
                      {" "}
                      <a href="#">
                        <span>
                          <i className="fa fa-file" aria-hidden="true" /> Pages
                        </span>
                        <b className="gw-arrow" />
                      </a>
                      <ul className="gw-submenu">
                        <li>
                          {" "}
                          <a href="create-new.html" style={{ color: "white" }}>
                            Create New
                          </a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a
                            href="pages-drafts.html"
                            style={{ color: "white" }}
                          >
                            Drafts
                          </a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a
                            href="pages-published.html"
                            style={{ color: "white" }}
                          >
                            Published
                          </a>{" "}
                        </li>
                      </ul>
                    </li> */}
                    {/* <li class="init-un-active">  */}
                    {/* <li>
                      <Link to="/contact">
                        <i className="fa fa-wpforms" aria-hidden="true" />{" "}
                        Contact Form
                      </Link>
                    </li>
                    <li>
                      <Link to="/medialibrary">
                        <i className="fa fa-file-image-o" aria-hidden="true" />{" "}
                        Media Library
                      </Link>
                    </li>
                    <li className="init-arrow-down init-un-active">
                      <Link to="/settin">
                        <i className="fa fa-cog" aria-hidden="true" />
                        Settings
                        <b className="gw-arrow" />
                      </Link>
                      <ul className="gw-submenu">
                        <li>
                          {" "}
                          <a href="general-settings.html">General</a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a href="social-media.html">Social Media</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="/profile">
                        <i className="fa fa-user-o" aria-hidden="true" />
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/changepassword">
                        <i className="fa fa-unlock-alt" aria-hidden="true" />
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <a href="login.html">
                        <i className="fa fa-sign-out" aria-hidden="true" />
                        Logout
                      </a>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
