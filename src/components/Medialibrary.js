import React from 'react'
import Sidebar from './Sidebar'

function Medialibrary() {
    return (
        <div>
          <Sidebar></Sidebar>
            <div className="admin-wrapper col-12">
  <div className="admin-content">
    <div className="admin-head">Media Library</div>
    <div className="admin-data">
      <div className="col-lg-12 p-0 text-right mb-30">
        <a href="media-library-new.html">
          <button className="button button-contactForm boxed-btn">+ Add New</button>
        </a>
      </div>
      <div className="table-responsive admin-table">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Media Image</th>
              <th>Alt Text</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <img src="assets/img/img-media.png" width={65} />
              </td>
              <td>Cool Water</td>
              <td>Jan 15, 2020</td>
              <td>
                <a href="media-library-view.html"><span className="btn">View</span></a>
                <a href="media-library-edit.html"><span className="btn">Edit</span></a>
                <span className="btn">Delete</span>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <img src="assets/img/audio-icon.png" height={65} />
              </td>
              <td>Cool Water</td>
              <td>Jan 15, 2020</td>
              <td>
                <a href="media-library-view.html"><span className="btn">View</span></a>
                <a href="media-library-edit.html"><span className="btn">Edit</span></a>
                <span className="btn">Delete</span>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                <img src="assets/img/video-icon.png" width={65} />
              </td>
              <td>Cool Water</td>
              <td>Jan 15, 2020</td>
              <td>
                <a href="media-library-view.html"><span className="btn">View</span></a>
                <a href="media-library-edit.html"><span className="btn">Edit</span></a>
                <span className="btn">Delete</span>
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

export default Medialibrary
