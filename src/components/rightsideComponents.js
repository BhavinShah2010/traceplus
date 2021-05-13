import React from 'react'
import { Row,Col,  Container } from 'react-bootstrap';
import Routes from '../common/routes';

class RightSideComponents extends React.Component{

    render(){
        let isLoggedIn = localStorage.getItem('isLoggedIn')

        console.log("Truyy f", isLoggedIn && isLoggedIn == 'true')


        return(
            <div className={ ' RightSideDiv' + (isLoggedIn && isLoggedIn == 'true' ? ' withLoginRightSideDiv' : ' withoutLoginRightSideDiv') }
            >
                <Routes/>
            </div>
        )
    }

}

export default RightSideComponents