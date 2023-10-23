import React, { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Link } from "react-router-dom";
import SequentialTest from "../components/SequentialTest";
// import { Routes } from "react-router-dom";
import { Outlet, Route, Routes } from "react-router-dom";
import { Button } from "react-bootstrap";
import Services from "../components/Services";
const NormalTest = () => {
  return (
    <div className="container-fluid">
      <div className="row d-flex">
        <nav
          className="col-md-2 d-none d-md-block sidebar"
          style={{ paddingLeft: "0px" }}
        >
          <Sidebar />
        </nav>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 main">
          <div className="container d-flex justify-content-end mt-3">
            <Button className="fs-5 start back">
              <Link className="link2" to="/">
                Home
              </Link>
            </Button>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default NormalTest;
