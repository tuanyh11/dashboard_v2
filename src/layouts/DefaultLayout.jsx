import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Header, Sidebar } from "../components";
const DefaultLayout = ({ children }) => {
  return (
    <div >
      <div className="items-center flex">
        <div className="fixed left-0 top-0 bottom-0 w-2/12 to-gray-600 text-white from-slate-800 bg-gradient-to-tr z-50 shadow-gray-600">
          <Sidebar />
        </div>
        <div className="w-full ml-[calc(16.6666667%)]">
          <Header />
          <div className="px-4 mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
