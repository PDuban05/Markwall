import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  HashRouter,
} from "react-router-dom";
import RegisterProduct from "./components/StyledComponent/cpanel/Products";
import ExcelToJsonConverter from "./components/StyledComponent/cpanel/Excel";
import ShopingCard from "./components/ShopingCard";
import Loading from "./components/StyledComponent/Loading/Loading";
const Dashboard = lazy(() => import("./components/Dashboard"));
const Details = lazy(() => import("./components/Details"));
const Register = lazy(() => import("./components/RegisterForm"));
const Login = lazy(() => import("./components/LoginForm"));

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/details" element={<Details />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cpanel/products" element={<RegisterProduct />} />

          <Route path="/shopingcard" element={<ShopingCard />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
