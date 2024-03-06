import { useState } from "react";
import "./App.css";
import Login from "./login";
import Like from "./like";
// import Ques from "./ques";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* <Ques></Ques> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          {/* <Route path="blogs" element={<Blogs />} /> */}
          <Route path="like" element={<Like />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <Login></Login> */}
      {/* <Like></Like> */}
    </>
  );
}

export default App;
