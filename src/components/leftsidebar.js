import React from 'react'
import Aside from './aside';
import { traceplusLogo } from '../common/images';
import { logoutUser } from '../login/actionMethods/actionMethods';

class LeftSideBar extends React.Component {

    handleLogout = () =>{
        logoutUser().then(res =>{
            console.log("Response : " , res)
        })
    }

    render() {
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

                    <div className="LogoutDiv" onClick={this.handleLogout}>
                        <span>Logout</span>
                    </div>
                </div>
            </React.Fragment>

        )
    }
}

export default LeftSideBar