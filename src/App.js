import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import './assets/styles/aside.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/common.scss'
import LeftSideBar from './components/leftsidebar';
import RightSideComponents from './components/rightsideComponents';


function App() {

  let isLoggedIn = localStorage.getItem('isLoggedIn')

  return (
    <BrowserRouter>
      <div className="mainAppDiv">
    
      {
        isLoggedIn && isLoggedIn == 'true' ? 
        <LeftSideBar /> : ''
      }

        <RightSideComponents />
      </div>
    </BrowserRouter>
  );
}

export default App;
