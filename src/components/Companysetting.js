import React from 'react'
import Sidebar from './Sidebar'

function Companysetting() {
    return (
        <div>
          <Sidebar></Sidebar>
            <div className="admin-wrapper col-12">
  <div className="admin-content">
    <div className="admin-head">Company Settings</div>
    <div className="admin-data">
      <div className="container-fluid p-0">
        <form className="form-contact contact_form">
          <div className="row m-0">
            <div className="col-lg-12 p-0">
              <div className="form-group tags-field row m-0">
                <label className="col-lg-2 p-0">Company Name</label>
                <input className="form-control col-lg-6" name="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = ''" placeholder defaultValue />
              </div>
            </div>
            <div className="col-lg-12 p-0">
              <div className="form-group tags-field  row m-0">
                <label className="col-lg-2 p-0">Address</label>
                <input className="form-control col-lg-6" name="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = ''" placeholder defaultValue />
              </div>
            </div>
            <div className="col-lg-12 p-0">
              <div className="form-group tags-field  row m-0">
                <label className="col-lg-2 p-0">Email ID</label>
                <input className="form-control col-lg-6" name="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = ''" placeholder defaultValue />
              </div>
            </div>
            <div className="col-lg-12 p-0">
              <div className="form-group tags-field  row m-0">
                <label className="col-lg-2 p-0">Mobile Number</label>
                <input className="form-control col-lg-6" name="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = ''" placeholder defaultValue />
              </div>
            </div>
            <div className="col-lg-12 p-0">
              <div className="form-group tags-field  row m-0">
                <label className="col-lg-2 p-0">Company Logo</label>
                <input className="form-control col-lg-6" name="name" type="file" onfocus="this.placeholder = ''" onblur="this.placeholder = ''" placeholder />
              </div>
            </div>
            <div className="col-lg-12 p-0">
              <div className="form-group tags-field  row m-0">
                <label className="col-lg-2 p-0" />
                <div className="col-lg-6 p-0">
                  <button className="button button-contactForm boxed-btn">Save</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

        </div>
    )
}

export default Companysetting
