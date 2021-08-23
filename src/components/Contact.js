import React from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import swal from "sweetalert";
import { CSVLink} from 'react-csv';
import Loader from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';
import { useEffect, useState,useRef } from 'react';
const PER_PAGE=9;
function Contact() {
const [contact,setContact]=useState([]);
const [flag,setFlag]=useState();
const [currentPage,setCurrentPage]=useState(0);
useEffect(()=>{
  axios.get('https://lakshy12.herokuapp.com/contact/fetch_contact').then((res)=>{
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
const textInput=useRef(null);
function handleClick()
{
  textInput.current.link.click();
}
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
          `https://lakshy12.herokuapp.com/contact/delete/${_id}`
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
const headers=[
  {label:"name",key:"name"},
  {label:"phone",key:"phone"},
  {label:"email",key:"email"},
  {label:"message",key:"message"},
  {label:"reason",key:"reason"},
]
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
            {currentPageData.length>0&&currentPageData.map((item,index)=>{
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
              </tr>)
            })}
          </tbody>
        </table>
        <div>
        <CSVLink data={contact} headers={headers} filename={'contact.csv'} className="hidden" ref={textInput}  target="_blank" />
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

export default Contact
