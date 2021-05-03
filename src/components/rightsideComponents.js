import React from 'react'
import { Row,Col,  Container } from 'react-bootstrap';
import Routes from '../common/routes';

class RightSideComponents extends React.Component{

    render(){
        return(
            <div className="RightSideDiv">
                <Routes/>
            </div>
        )
    }

}

export default RightSideComponents