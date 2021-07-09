import React from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import swal from "sweetalert";
import Loader from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'

function Subscriber() {
const [contact,setContact]=useState([]);
const [flag,setFlag]=useState();
useEffect(()=>{
  axios.get('https://lakshy12.herokuapp.com/contact/fetch_subscriber').then((res)=>{
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
          `https://lakshy12.herokuapp.com/contact/delete/subs/${_id}`
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
    <div className="admin-head">NewsLetter Subscribers</div>
    <div className="admin-data">
      <div className="table-responsive admin-table">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Email ID</th>
              <th>Added On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contact.length>0&&contact.map((item,index)=>{
              return ( <tr key={index}>
                <td>{index+1}</td>
                <td>{item.email}</td>
                <td>{new Date(item.createdAt).toDateString()}</td>
                <td>
                  <span className="btn" onClick={() => deleteItem(item._id)}>Delete</span></td>
              </tr>);
            })};
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default Subscriber
