import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react/cjs/react.development';
import axios from 'axios';
import Sidebar from './Sidebar';
const Contactview=({match})=> {
  const [contact,setContact]=useState({});
  useEffect(()=>{
    console.log(match.params);
    const { id } = match.params;
    console.log(id);
    axios
      .get(
        `https://lakshy12.herokuapp.com/contact/fetch/${id}`
      )
      .then((res) => {
        console.log(res.data);
        setContact(res.data);
      });
  },[]);
    return (
        <div>
  <Sidebar/>
  <div className="admin-wrapper col-12">
    <div className="admin-content">
      <div className="admin-head">Contact Us View</div>
      <div className="admin-data">
        <div className="table-responsive admin-table demo">
          <table>
            <tbody>
              <tr>
                <td width="15%"><b>Name</b></td>
                <td>{contact.name}</td>
              </tr>
              <tr>
                <td><b>Email ID</b></td>
                <td>{contact.email}</td>
              </tr>
              <tr>
                <td><b>Mobile Number</b></td>
                <td>{contact.phone}</td>
              </tr>
              <tr>
                <td><b>Added On</b></td>
                <td>{new Date(contact.createdAt).toDateString()}</td>
              </tr>
              <tr>
                <td><b>Reason</b></td>
                <td>{contact.reason}</td>
              </tr>
              <tr>
                <td valign="top"><b>Message</b></td>
                <td>{contact.message}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}

export default Contactview
