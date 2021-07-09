import React from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import swal from "sweetalert";
import Loader from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'

function Contact() {
const [contact,setContact]=useState([]);
const [flag,setFlag]=useState();
useEffect(()=>{
  axios.get('http://localhost:5000/contact/fetch_contact').then((res)=>{
     console.log(res.data);
     setContact(res.data);
     setFlag(0);
  })
},[flag]);
function deleteItem(_id){
  swal({
    title: "Are you sure?",
    text: "Do your really want to remove?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      console.log(_id);
      axios
        .delete(
          `http://localhost:5000/contact/delete/${_id}`
        )
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setFlag(1);
        });
    } else {
    }
  });
}
  return (
    <div>
      <Sidebar></Sidebar>
      <div className="admin-wrapper col-12">
  <div className="admin-content">
    <div className="admin-head">Contact Us </div>
    <div className="admin-data">
      <div className="table-responsive admin-table">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Email ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contact.length>0&&contact.map((item,index)=>{
              return ( <tr key={index}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>
                <Link to={`/view_contact/${item._id}`}>
                  <span className="btn">View</span>
                </Link>
                  <span className="btn" onClick={() => deleteItem(item._id)}>Delete</span></td>
              </tr>);
            })};
           
            {/* // <tr>
            //   <td>2</td>
            //   <td>Rani</td>
            //   <td>9703371164</td>
            //   <td>rani.kola@gmail.com</td>
            //   <td>
            //     <a href="contact-us-view.html"><span className="btn">View</span></a>
            //     <span className="btn">Delete</span></td>
            // </tr>
            // <tr>
            //   <td>3</td>
            //   <td>Nihal</td>
            //   <td>9703371164</td>
            //   <td>nihal.kola@gmail.com</td>
            //   <td>
            //     <a href="contact-us-view.html"><span className="btn">View</span></a>
            //     <span className="btn">Delete</span></td>
            // </tr>
            // <tr>
            //   <td>4</td>
            //   <td>Namasvi</td>
            //   <td>9703371164</td>
            //   <td>namasvi.kola@gmail.com</td>
            //   <td>
            //     <a href="contact-us-view.html"><span className="btn">View</span></a>
            //     <span className="btn">Delete</span></td>
            // </tr>
            // <tr>
            //   <td>5</td>
            //   <td>Satya</td>
            //   <td>9703371164</td>
            //   <td>satya.kola@gmail.com</td>
            //   <td>
            //     <a href="contact-us-view.html"><span className="btn">View</span></a>
            //     <span className="btn">Delete</span></td>
            // </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default Contact
