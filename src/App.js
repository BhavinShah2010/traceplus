import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import './assets/styles/aside.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import LeftSideBar from './components/leftsidebar';
import RightSideComponents from './components/rightsideComponents';


function App() {
  return (
    <BrowserRouter>
      <div className="mainAppDiv">

        <LeftSideBar />

        <RightSideComponents />
      </div>
    </BrowserRouter>
  );
}

export default App;
