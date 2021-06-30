import React from 'react'
import Sidebar from './Sidebar'

function Contact() {
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
            <tr>
              <td>1</td>
              <td>Krishna</td>
              <td>9703371164</td>
              <td>krishna.kola@gmail.com</td>
              <td>
                <a href="contact-us-view.html"><span className="btn">View</span></a>
                <span className="btn">Delete</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Rani</td>
              <td>9703371164</td>
              <td>rani.kola@gmail.com</td>
              <td>
                <a href="contact-us-view.html"><span className="btn">View</span></a>
                <span className="btn">Delete</span></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Nihal</td>
              <td>9703371164</td>
              <td>nihal.kola@gmail.com</td>
              <td>
                <a href="contact-us-view.html"><span className="btn">View</span></a>
                <span className="btn">Delete</span></td>
            </tr>
            <tr>
              <td>4</td>
              <td>Namasvi</td>
              <td>9703371164</td>
              <td>namasvi.kola@gmail.com</td>
              <td>
                <a href="contact-us-view.html"><span className="btn">View</span></a>
                <span className="btn">Delete</span></td>
            </tr>
            <tr>
              <td>5</td>
              <td>Satya</td>
              <td>9703371164</td>
              <td>satya.kola@gmail.com</td>
              <td>
                <a href="contact-us-view.html"><span className="btn">View</span></a>
                <span className="btn">Delete</span></td>
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

export default Contact
