import React from 'react'

function Postview() {
  return (
    <div>
      <div className="admin-wrapper col-12">
  <div className="admin-content">
    <div className="admin-head">Posts - View</div>
    <div className="admin-data">
      <div className="table-responsive admin-table demo">
        <table>
          <tbody>
            <tr>
              <td width="15%"><b>Image</b></td>
              <td><img src="assets/img/img-media.png" width={65} /></td>
            </tr>
            <tr>
              <td valign="top"><b>Title</b></td>
              <td>Cool Water</td>
            </tr>
            <tr>
              <td><b>Description</b></td>
              <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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

export default Postview
