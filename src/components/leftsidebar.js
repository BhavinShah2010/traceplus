import React from 'react'
import Aside from './aside';
import { traceplusLogo } from '../common/images';

class LeftSideBar extends React.Component {

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

                    <div className="LogoutDiv">
                        <a href="#">Logout</a>
                    </div>
                </div>
            </React.Fragment>

        )
    }
}

export default LeftSideBar