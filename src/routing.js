import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import Contact from "./components/Contact";
import Medialibrary from "./components/Medialibrary";
import Settings from "./components/Settings";
import Profilesetting from "./components/Profilesetting";
import Changepassword from "./components/Changepassword";
import Contactview from "./components/Contactview";

//Menu
import Menu from "./components/menu/menu";
import AddMenu from "./components/menu/add_menu";
import EditMenu from "./components/menu/edit_menu";
import ViewMenu from "./components/menu/view_menu";

//Sub Menu
import AddSubMenu from "./components/sub_menu/add_sub_menu";
import SubMenu from "./components/sub_menu/sub_menu";
import EditSubMenu from "./components/sub_menu/edit_sub_menu";
import ViewSubMenu from "./components/sub_menu/view_sub_menu";

//Post
import Post from "./components/post/Post";
import Addpost from "./components/post/add_post";
import EditPost from "./components/post/edit_post";
import ViewPost from "./components/post/view_post";
//Home1
// import EditHome1 from "./components/home1/edit_home1";
import AddHome1 from "./components/home1/add_home1";
import EditHome1 from "./components/home1/edit_home1";
import ViewHome1 from "./components/home1/view_home1";
import Home1 from "./components/home1/home1";
//AddHome2
//home 1.1 images

import AddHome1_1 from "./components/home1_1/add_home1_1";
import EditHome1_1 from "./components/home1_1/edit_home1_1";
import ViewHome1_1 from "./components/home1_1/view_home1_1";
import Home1_1 from "./components/home1_1/home1_1";
//AddHome2
import Home2 from "./components/home2/home2";
import AddHome2 from "./components/home2/add_home2";
import EditHome2 from "./components/home2/edit_home2";
import ViewHome2 from "./components/home2/view_home2";

//AddHome3
import Home3 from "./components/home3/home3";
import AddHome3 from "./components/home3/add_home3";
import EditHome3 from "./components/home3/edit_home3";
import ViewHome3 from "./components/home3/view_home3";

//AddHome4
import Home4 from "./components/home4/home4";
import AddHome4 from "./components/home4/add_home4";
import EditHome4 from "./components/home4/edit_home4";
import ViewHome4 from "./components/home4/view_home4";

//About2
import About2 from "./components/about2/about2";
import AddAbout2 from "./components/about2/add_about2";
import EditAbout2 from "./components/about2/edit_about2";
import ViewAbout2 from "./components/about2/view_about2";

//About3
import About3 from "./components/about3/about3";
import AddAbout3 from "./components/about3/add_about3";
import EditAbout3 from "./components/about3/edit_about3";
import ViewAbout3 from "./components/about3/view_about3";

//About us
import About from "./components/About us/about";

//Bloog
import Blog from "./components/blog/edit_blog";

import BlogCategory from "./components/blogcategories/blogcategory";
import AddBlogCategory from "./components/blogcategories/add_blogcategory";
import EditBlogCategory from "./components/blogcategories/edit_blogcategory";
import ViewBlogCategory from "./components/blogcategories/view_blogcategory";

//Article
import Blog1 from "./components/blog1/blog1";
import AddBlog1 from "./components/blog1/add_blog1";
import EditBlog1 from "./components/blog1/edit_blog1";
import ViewBlog1 from "./components/blog1/view_blog1";

//Event Type
import EventCategory from "./components/events/eventcategory";
import Events from "./components/events/eventsdetail";
import EventTypes from "./components/events/event_types";
import AddEvent from "./components/events/add_new_event";
//Prgram
import Program from "./components/program/program_view";
import Add_Program from "./components/program/add_program";
import EditProgram from "./components/program/edit_program";
import ViewProgram from "./components/program/view_program";

//Facilitatotr
import Facilitator from "./components/facilitator/facilitatot_view";
import Add_facilitator from "./components/facilitator/add_facilitator";
import EditFacilitator from "./components/facilitator/edit_facilitor";
import ViewFacilitator from "./components/facilitator/view_facilitator";

// Subscriber
import Subscriber1 from "./components/subscriber";

// organisation
import Organisation from "./components/organisation/organisation";
import AddOrg from "./components/organisation/add_organisation";
import EditOrg from "./components/organisation/edit_org";
import ViewOrganisation from "./components/organisation/view_organisation";

//testimonials
import Testimonial from "./components/testimonial/view_testimonial";
import AddTestimonial from "./components/testimonial/add_testimonial";
import ViewTestimonial from "./components/testimonial/viewEachTestimonial";
import EditTestimonial from "./components/testimonial/edit_testimonial";
import EventPast from "./components/events/past_events";
import EventUpcoming from "./components/events/upcoming_events";
import AddEventType from "./components/events/addnewEventType";
import AddEventCat from "./components/events/addnewEventCat";
import EditEventType from "./components/events/editEventType";
import ViewEventType from "./components/events/viewEventType";
import EditEventCat from "./components/events/editEventCat";
import ViewEventCat from "./components/events/viewEventCat";
import ViewEvents from "./components/events/view_events";
import EditEvent from "./components/events/edit_events";
import AddLogos from "./components/site_preferences/add_logos";
import AddAddress from "./components/site_preferences/add_address";
import AddSocialMedia from "./components/site_preferences/add_socialmedia";
import AddCompliances from "./components/site_preferences/add_compliances";
import AddNewCompliance from "./components/site_preferences/add_new_compliance";
import EditCompliance from "./components/site_preferences/edit_compliance";
import Subscriber from "./components/subscriber";
import Language from "./components/site_preferences/language";
import AddLanguage from "./components/site_preferences/addlanguage";
function Routing() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/dashboard" component={Dashboard}></Route>
        <Route exact path="/contact" component={Contact}></Route>
        <Route exact path="/medialibrary" component={Medialibrary}></Route>
        <Route exact path="/settin" component={Settings}></Route>
        <Route exact path="/profile" component={Profilesetting}></Route>
        <Route exact path="/changepassword" component={Changepassword}></Route>
        {/* Menu */}
        <Route exact path="/menu" component={Menu}></Route>
        <Route exact path="/add_menu" component={AddMenu}></Route>
        <Route exact path="/edit_menu/:_id" component={EditMenu}></Route>
        <Route exact path="/view_menu/:_id" component={ViewMenu}></Route>
        {/* Sub Menu */}
        {/* <Route exact path="/menu" component={Menu}></Route> */}
        <Route exact path="/add_sub_menu" component={AddSubMenu}></Route>
        <Route exact path="/sub_menu" component={SubMenu}></Route>
        <Route exact path="/edit_sub_menu/:_id" component={EditSubMenu}></Route>
        <Route exact path="/view_sub_menu/:_id" component={ViewSubMenu}></Route>
        {/* Post */}
        <Route exact path="/post" component={Post}></Route>
        <Route exact path="/add_post" component={Addpost}></Route>
        <Route exact path="/edit_post/:_id" component={EditPost}></Route>
        <Route exact path="/view_post/:_id" component={ViewPost}></Route>
        {/* AddHome1 */}

        <Route exact path="/home_section_1" component={Home1}></Route>
        <Route exact path="/add_home1" component={AddHome1}></Route>
        {/* <Route exact path="/edit_home1/:_id" component={EditHome1}></Route> */}
        <Route
          exact
          path="/home1/608b912efcc7860015dce5b1"
          component={EditHome1}
        ></Route>
        <Route exact path="/view_home1/:_id" component={ViewHome1}></Route>
        {/* //Home2 */}
        <Route exact path="/home_section_2" component={Home2}></Route>
        <Route exact path="/add_home2" component={AddHome2}></Route>
        <Route exact path="/edit_home2/:_id" component={EditHome2}></Route>
        <Route exact path="/view_home2/:_id" component={ViewHome2}></Route>
        {/* <Route exact path="/view_home2/:_id" component={ViewHome2}></Route> */}
        {/* //Home3 */}
        <Route exact path="/home_section_3" component={Home3}></Route>
        <Route exact path="/add_home3" component={AddHome3}></Route>
        <Route exact path="/edit_home3/:_id" component={EditHome3}></Route>
        <Route exact path="/view_home3/:_id" component={ViewHome3}></Route>

        {/* Home1-1 */}
        <Route exact path="/home_section_1_1" component={Home1_1}></Route>
        <Route exact path="/add_home1_1" component={AddHome1_1}></Route>
        <Route exact path="/edit_home1_1/:_id" component={EditHome1_1}></Route>
        <Route exact path="/view_home1_1/:_id" component={ViewHome1_1}></Route>

        {/* //Home4 */}
        <Route exact path="/home_section_4" component={Home4}></Route>
        <Route exact path="/add_home4" component={AddHome4}></Route>
        <Route exact path="/edit_home4/:_id" component={EditHome4}></Route>
        <Route exact path="/view_home4/:_id" component={ViewHome4}></Route>
        {/* Testimonials*/}
        <Route exact path="/testimonials" component={Testimonial}></Route>
        <Route exact path="/add_testimonial" component={AddTestimonial}></Route>
        <Route
          exact
          path="/edit_testimonial/:_id"
          component={EditTestimonial}
        ></Route>
        <Route
          exact
          path="/view_testimonial/:_id"
          component={ViewTestimonial}
        ></Route>
        {/* //About2 */}
        <Route exact path="/about_section_2" component={About2}></Route>
        <Route exact path="/add_about2" component={AddAbout2}></Route>
        <Route exact path="/edit_about2/:_id" component={EditAbout2}></Route>
        <Route exact path="/view_about2/:_id" component={ViewAbout2}></Route>
        {/* //About3 */}
        <Route exact path="/about_section_3" component={About3}></Route>
        <Route exact path="/add_about3" component={AddAbout3}></Route>
        <Route exact path="/edit_about3/:_id" component={EditAbout3}></Route>
        <Route exact path="/view_about3/:_id" component={ViewAbout3}></Route>
        {/* Blog */}
        <Route exact path="/blog" component={Blog}></Route>

        <Route exact path="/blogcategory" component={BlogCategory}></Route>
        <Route
          exact
          path="/add_blogcategory"
          component={AddBlogCategory}
        ></Route>
        <Route
          exact
          path="/edit_blogcategory/:_id"
          component={EditBlogCategory}
        ></Route>
        <Route
          exact
          path="/view_blogcategory/:_id"
          component={ViewBlogCategory}
        ></Route>

        {/* Article */}
        <Route exact path="/article" component={Blog1}></Route>
        <Route exact path="/add_article" component={AddBlog1}></Route>
        <Route exact path="/edit_article/:_id" component={EditBlog1}></Route>
        <Route exact path="/view_article/:_id" component={ViewBlog1}></Route>
        {/* Events */}
        <Route exact path="/eventcategory" component={EventCategory}></Route>
        <Route exact path="/add_new_event" component={AddEvent}></Route>
        <Route exact path="/view_events/:_id" component={ViewEvents}></Route>
        <Route exact path="/edit_event/:_id" component={EditEvent}></Route>
        <Route exact path="/event_types" component={EventTypes}></Route>
        <Route exact path="/event_category" component={EventCategory}></Route>
        <Route
          exact
          path="/add_new_event_type"
          component={AddEventType}
        ></Route>
        <Route
          exact
          path="/edit_event_type/:_id"
          component={EditEventType}
        ></Route>
        <Route
          exact
          path="/view_event_type/:_id"
          component={ViewEventType}
        ></Route>
        <Route
          exact
          path="/edit_event_cat/:_id"
          component={EditEventCat}
        ></Route>
        <Route
          exact
          path="/view_event_cat/:_id"
          component={ViewEventCat}
        ></Route>
        <Route exact path="/add_new_event_cat" component={AddEventCat}></Route>
        <Route exact path="/past_events" component={EventPast}></Route>
        <Route exact path="/upcomming_events" component={EventUpcoming}></Route>
        <Route exact path="/events" component={Events}></Route>
        <Route exact path="/events" component={Events}></Route>
        {/* Facilitator */}
        <Route exact path="/program" component={Program}></Route>
        <Route
          exact
          path="/add_Program"
          component={Add_Program}
        ></Route>
        <Route
          exact
          path="/edit_program/:id"
          component={EditProgram}
        ></Route>
        <Route
          exact
          path="/view_program/:id"
          component={ViewProgram}
        ></Route>
        <Route exact path="/facilitator" component={Facilitator}></Route>
        <Route
          exact
          path="/add_facilitator"
          component={Add_facilitator}
        ></Route>
        <Route
          exact
          path="/edit_facilitator/:id"
          component={EditFacilitator}
        ></Route>
        <Route
          exact
          path="/view_facilitator/:id"
          component={ViewFacilitator}
        ></Route>
        {/* About us */}
        <Route exact path="/about" component={About}></Route>
        {/* contact */}
        <Route exact path="/contact" component={Contact}></Route>
        <Route exact path="/view_contact/:id" component={Contactview}></Route>
        {/* Subscriber */}
        <Route exact path="/subscriber" component={Subscriber1}></Route>
        {/* organisation */}
        <Route exact path="/organisation" component={Organisation}></Route>
        <Route exact path="/add_organisation" component={AddOrg}></Route>
        <Route exact path="/edit_organisation/:id" component={EditOrg}></Route>
        <Route exact path="/view_organisation/:id" component={ViewOrganisation}></Route>
        {/* Site Preferences */}
        <Route exact path="/add_logos" component={AddLogos}></Route>
        <Route exact path="/add_address" component={AddAddress}></Route>
        <Route exact path="/add_socialmedia" component={AddSocialMedia}></Route>
        <Route exact path="/add_compliance" component={AddCompliances}></Route>
        <Route
          exact
          path="/add_new_compliance"
          component={AddNewCompliance}
        ></Route>
        <Route
          exact
          path="/edit_compliance/:_id"
          component={EditCompliance}
        ></Route>
            <Route exact path="/language" component={Language}></Route>
            <Route exact path="/add_new_language" component={AddLanguage}></Route>
        {/* change password */}
        <Route
          exact
          path="/password"
          component={Changepassword}
        ></Route>
      </Switch>
    </Router>
  );
}

export default Routing;
