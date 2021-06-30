import React from 'react'
import Sidebar from './Sidebar'

function Socialmedia() {
    return (
        <div>
          <Sidebar></Sidebar>
            <div className="admin-wrapper col-12">
  <div className="admin-content">
    <div className="admin-head">Social Media</div>
    <div className="admin-data">
      <div className="container-fluid p-0">
        <form className="form-contact contact_form">
          <div className="row m-0">
            <div className="col-lg-12 p-0">
              <div className="form-group tags-field row m-0">
                <label className="col-lg-2 p-0">Facebook</label>
                <input className="form-control col-lg-6" name="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = ''" placeholder defaultValue="https://www.facebook.com/Krishna-Kola" />
              </div>
            </div>
            <div className="col-lg-12 p-0">
              <div className="form-group tags-field  row m-0">
                <label className="col-lg-2 p-0">Twittter</label>
                <input className="form-control col-lg-6" name="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = ''" placeholder defaultValue="https://twitter.com/krishnakola" />
              </div>
            </div>
            <div className="col-lg-12 p-0">
              <div className="form-group tags-field  row m-0">
                <label className="col-lg-2 p-0">Instagram</label>
                <input className="form-control col-lg-6" name="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = ''" placeholder defaultValue="https://www.instagram.com/krishnakola/" />
              </div>
            </div><div className="col-lg-12 p-0">
              <div className="form-group tags-field  row m-0">
                <label className="col-lg-2 p-0">Linkdin</label>
                <input className="form-control col-lg-6" name="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = ''" placeholder defaultValue="https://www.linkedin.com/in/krishna-kola-69970b23/" />
              </div>
            </div>
            <div className="col-lg-12 p-0">
              <div className="form-group tags-field  row m-0">
                <label className="col-lg-2 p-0" />
                <div className="col-lg-6 p-0">
                  <button className="button button-contactForm boxed-btn">Update</button>
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

export default Socialmedia
