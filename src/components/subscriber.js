import React from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import swal from "sweetalert";
import Loader from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import { CSVLink} from 'react-csv';
import { useEffect, useState,useRef } from 'react'
const PER_PAGE=9;
function Subscriber() {
const [contact,setContact]=useState([]);
const [flag,setFlag]=useState();
const [currentPage,setCurrentPage]=useState(0);
useEffect(()=>{
  axios.get('https://lakshy12.herokuapp.com/contact/fetch_subscriber').then((res)=>{
     console.log(res.data);
     setContact(res.data);
     setFlag(0);
  })
},[flag]);
function handlePageClick({selected:selectedPage})
{
  setCurrentPage(selectedPage);
}
const offset=currentPage*PER_PAGE;
const currentPageData=contact&&contact.slice(offset,offset+PER_PAGE);
const pageCount=Math.ceil(contact&&contact.length/PER_PAGE);
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
const textInput=useRef(null);
function handleClick()
{
  textInput.current.link.click();
}
const headers=[
  {label:"email",key:"email"}
]
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
            {currentPageData.length>0&&currentPageData.map((item,index)=>{
              return ( <tr key={index}>
                <td>{index+1}</td>
                <td>{item.email}</td>
                <td>{new Date(item.createdAt).toDateString()}</td>
                <td>
                  <span className="btn" onClick={() => deleteItem(item._id)}>Delete</span></td>
              </tr>)
            })}
          </tbody>
        </table>
        <div>
        <CSVLink data={contact} headers={headers} filename={'subscriber.csv'} className="hidden" ref={textInput}  target="_blank" />
        <span className="btn download" onClick={handleClick}>Download</span>
        </div>
      </div>
      <ReactPaginate previousLabel={"Previous"} nextLabel={"Next"} pageCount={pageCount} onPageChange={handlePageClick} containerClassName={"pagination"} 
       previousLinkClassName={"pagination__link"}
       nextLinkClassName={"pagination__link"}
       disabledClassName={"pagination__link--disabled"}
       activeClassName={"pagination__link--active"}
       />
    </div>
  </div>
</div>

    </div>
  )
}

export default Subscriber
