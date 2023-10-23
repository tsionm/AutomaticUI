import React from 'react'
import logo from '../images/logo.png'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';

import { NavLink } from 'react-bootstrap';
import { Link } from "react-router-dom";


export const Sidebar = (props) => {
  return (
    // <div>

    // </div>
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' ,width:'100%', backgroundColor:'rgb(245, 245, 243)'}}>
    <CDBSidebar textColor="#03609b" backgroundColor="rgb(245, 245, 243)" >
    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large ml-5"></i>}>
        <img
            src={logo}
            alt="Logo"
            width="100"
            height="auto"
          />
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked "className="p">
              <CDBSidebarMenuItem icon=""><Link className="link" to="/normalTest">Test</Link></CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon=""><Link className="link" to="/normalTest/services">Services</Link></CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon=""><Link className="link" to="/normalTest/messages">Messages</Link></CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};
export default Sidebar;
