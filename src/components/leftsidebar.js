import React from 'react'
import { withRouter } from 'react-router-dom'
import Aside from './aside';
import { traceplusLogo } from '../common/images';
import { logoutUser } from '../login/actionMethods/actionMethods';


function LeftSideBar(props) {

    function handleLogout() {
        logoutUser().then(res => {
            if (res && res.status >= 200 && res.status <= 299) {
                if (res.data && res.data.message == "Session expired") {
                    localStorage.removeItem('isLoggedIn')
                    localStorage.removeItem('userLoginDetails')
                    props.history.push(`/login`)
                }
            }
        })
    }

    return (
        <React.Fragment>
            <div className="leftSideBarDiv">
                <div>
                    <img src={traceplusLogo} className="logo" alt="TracePlus Logo" />
                </div>
                <h3 className="adminName">
                    Jean
            </h3>

                <h4 className="designation">Admin</h4>

                <Aside />

                <div className="LogoutDiv" onClick={handleLogout}>
                    <span>Logout</span>
                </div>
            </div>
        </React.Fragment>

    )
}

export default withRouter(LeftSideBar)