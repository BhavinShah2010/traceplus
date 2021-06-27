import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import {withRouter} from 'react-router-dom'
import './App.css';
import './assets/styles/aside.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/common.scss'
import LeftSideBar from './components/leftsidebar';
import RightSideComponents from './components/rightsideComponents';

import ReactModal from 'react-modal';



function App() {

  let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
  ReactModal.setAppElement('*'); 

  return (
    
      <div className="mainAppDiv">
    
      {
        isLoggedIn ? 
        <LeftSideBar /> : ''
      }

        <RightSideComponents />
      </div>
    
  );
}



export default withRouter(App);
