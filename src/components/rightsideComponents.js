import React from 'react'
import { Row,Col,  Container } from 'react-bootstrap';
import Routes from '../common/routes';

class RightSideComponents extends React.Component{

    render(){
        let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
        return(
            <div className={ ' RightSideDiv' + (isLoggedIn ? ' withLoginRightSideDiv' : ' withoutLoginRightSideDiv') }
            >
                <Routes/>
            </div>
        )
    }

}

export default RightSideComponents