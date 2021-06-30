import React from 'react'
import Sidebar from './Sidebar'

function Profilesetting() {
    return (
        <div>
            <Sidebar></Sidebar>
            <div className="admin-wrapper col-12">
  <div className="admin-content">
    <div className="admin-head">Profile</div>
    <div className="admin-data">
      <div className="container-fluid p-0">
        <form className="form-contact contact_form">
          <div className="row m-0">
            <div className="col-lg-12 p-0">
              <div className="form-group tags-field row m-0">
                <label className="col-lg-2 p-0">First Name</label>
                <input className="form-control col-lg-6" name="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = ''" placeholder defaultValue="Krishna" />
              </div>
            </div>
            <div className="col-lg-12 p-0">
              <div className="form-group tags-field  row m-0">
                <label className="col-lg-2 p-0">Last Name</label>
                <input className="form-control col-lg-6" name="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = ''" placeholder defaultValue="Kola" />
              </div>
            </div>
            <div className="col-lg-12 p-0">
              <div className="form-group tags-field  row m-0">
                <label className="col-lg-2 p-0">Email ID</label>
                <input className="form-control col-lg-6" name="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = ''" placeholder defaultValue="krishna.kola@possibilliontech.com" />
              </div>
            </div><div className="col-lg-12 p-0">
              <div className="form-group tags-field  row m-0">
                <label className="col-lg-2 p-0">Mobile Number</label>
                <input className="form-control col-lg-6" name="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = ''" placeholder defaultValue={9703371164} />
              </div>
            </div>
            <div className="col-lg-12 p-0">
              <div className="form-group tags-field  row m-0">
                <label className="col-lg-2 p-0" />
                <div className="col-lg-6 p-0">
                  <button className="button button-contactForm boxed-btn">Save Changes</button>
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

export default Profilesetting
