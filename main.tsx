import ReactDOM from "react-dom/client";
import App from "./views/App";
import "./styles/global.scss";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserManage from "./Component/Admin/content/UserManage";
import store from "./store/redux/store";
import Home from "./Component/common/Home";
import Admin from "./Component/Admin/Admin";
import Login from "./Component/auth/Login";
import ProtectedRoute from './views/Warn';
// Định nghĩa kiểu cho window để tránh lỗi TypeScript
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof store;
  }
}



const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Provider store={store}>

      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
        </Route>
        {localStorage && localStorage.token ? (
          <Route path="/Admin" element={<Admin />}>
            <Route path="usermanage" element={<UserManage />} />
          </Route>
        ) : (
          <Route element={<ProtectedRoute />}>
            <Route path="/Admin" element={<Admin />}>
              <Route path="usermanage" element={<UserManage />} />
            </Route>
          </Route>

        )}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);

