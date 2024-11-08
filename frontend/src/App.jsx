import { BrowserRouter} from "react-router-dom";
import "./style/style.css";
import AppRouter from "./router/AppRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import SideBar from "./components/common/SideBar";

function App() {
  return (
    <BrowserRouter>
      
      <div className="d-flex ">
        <SideBar></SideBar>
        <div className="w-100 mb-5">
          <AppRouter></AppRouter>
        </div>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
