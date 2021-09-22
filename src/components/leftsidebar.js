import React, { useState } from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Modal from 'react-modal'
import Aside from './aside';


import traceplusLogo from '../assets/traceplusImages/trace_logo.png'
import { logoutUser } from '../login/actionMethods/actionMethods';

import SpinnerLoader from '../assets/images/Spinner Loader.gif'

const customStyle = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
        position: 'absolute',
        width: '25rem',
        height: '13rem',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '0'
    }
}

function LeftSideBar(props) {

    const [showLoader, updateShowLoader] = useState(false)
    const [showLogout, setShowLogout] = useState(false)

    let userDetails = JSON.parse(localStorage.getItem('userLoginDetails'))


    function handleLogout() {
        updateShowLoader(true)
        logoutUser().then(res => {
            if (res && res.status >= 200 && res.status <= 299) {
                if (res.data && res.data.message == "Session expired") {
                    updateShowLoader(true)
                    localStorage.removeItem('isLoggedIn')
                    localStorage.removeItem('userLoginDetails')
                    localStorage.removeItem('selectedDate')
                    props.history.push(`/login`)
                }
            }
        })
    }

    const handleLogoutModal = () => {
        setShowLogout(!showLogout)
    }

    return (
        <React.Fragment>
            <div className="leftSideBarDiv">
                <div>
                    <img src={traceplusLogo} className="logo" alt="TracePlus Logo" />
                </div>
                <h3 className="adminName">
                    {userDetails && userDetails.name || 'Jean'}
                </h3>

                <h4 className="designation">Admin</h4>

                <Aside />

                <div className="LogoutDiv" onClick={handleLogoutModal}>
                    <span>Logout</span>
                </div>
            </div>


            <Modal
                isOpen={showLogout}
                style={customStyle}
            >
                <div className='logoutModal'>
                    <div className="logoutTitle">Logout</div>
                    <div className='logoutDesc'>Are you sure you want to Logout?</div>

                    <div className='actionButtons'>
                        <span className='btnText borderRight' onClick={handleLogoutModal}>No</span>
                        <span className='btnText okBtn' onClick={handleLogout}>Yes, Logout</span>
                    </div>      
                </div>
            </Modal>
            {
                showLoader ?
                    <div className="wholePageLoaderMainDiv">
                        <img src={SpinnerLoader} />
                    </div> : ''
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    language: state.dashboard.selectedLangaugeValue
})

export default connect(mapStateToProps, {})(withRouter(LeftSideBar))

