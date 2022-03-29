import React from "react";
import { Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import './sidebar.css';

function Sidebar() {
    return(
        <ProSidebar className="sidebar">
            <SidebarHeader>
                logo
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="square">
                    <MenuItem><Link to="/students">Students</Link></MenuItem>
                    <MenuItem><Link to="/disciplines">Disciplines</Link></MenuItem>
                    <MenuItem><Link to="/institutions">Institutions</Link></MenuItem>
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                alabala
            </SidebarFooter>
        </ProSidebar>
    );
}

export default Sidebar;