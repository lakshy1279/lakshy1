import React from 'react'

function Pagesdraft() {
    return (
        <div>
            <div className="admin-wrapper col-12">
  <div className="admin-content">
    <div className="admin-head">Pages - Drafts</div>
    <div className="admin-data">
      <div className="col-lg-12 p-0 text-right mb-30">
      </div>
      <div className="table-responsive admin-table">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Page Name</th>
              <th>Page Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Privacy</td>
              <td>
                Active
              </td>
              <td>Jan 15, 2020</td>
              <td>
                <a href="pages-view.html"><span className="btn">View</span></a>
                <a href="pages-edit.html"><span className="btn">Edit</span></a>
                <span className="btn">Delete</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Terms</td>
              <td>
                active
              </td>
              <td>Jan 15, 2020</td>
              <td>
                <a href="pages-view.html"><span className="btn">View</span></a>
                <a href="pages-edit.html"><span className="btn">Edit</span></a>
                <span className="btn">Delete</span></td>
            </tr>
            <tr>
              <td>3</td>
              <td>About Us</td>
              <td>
                Active
              </td>
              <td>Jan 15, 2020</td>
              <td>
                <a href="pages-view.html"><span className="btn">View</span></a>
                <a href="pages-edit.html"><span className="btn">Edit</span></a>
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

export default Pagesdraft
