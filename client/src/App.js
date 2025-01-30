import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Employee from "./components/employee/Employee";
import HeaderNavbar from "./components/navbar/HeaderNavbar";
import Category from "./components/category/Category";
import Role from "./components/role/Role";
import Product from "./components/product/Product";
import Sales from "./components/sale/Sales";
import Bills from "./components/bill/Bills";
import Report from "./components/report/Report";
import Login from "./components/login/Login";
import Protected from "./components/protected/Protected";

function Navbar() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return !isLoginPage && <HeaderNavbar />;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="/category"
          element={<Protected Component={Category}></Protected>}
        ></Route>
        <Route
          path="/product"
          element={<Protected Component={Product}></Protected>}
        ></Route>
        <Route
          path="/employee"
          element={<Protected Component={Employee}></Protected>}
        ></Route>
        <Route
          path="/role"
          element={<Protected Component={Role}></Protected>}
        ></Route>
        <Route
          path="/sales"
          element={<Protected Component={Sales}></Protected>}
        ></Route>
        <Route
          path="/bill"
          element={<Protected Component={Bills}></Protected>}
        ></Route>
        <Route
          path="/report"
          element={<Protected Component={Report}></Protected>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
