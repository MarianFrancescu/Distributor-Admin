import React from "react";
import { Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader } from "react-pro-sidebar";
import './sidebar.css';

function Sidebar() {
    return(
        <ProSidebar className="sidebar">
            <SidebarHeader>
                logo
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="square">
                    <MenuItem>Students</MenuItem>
                    <MenuItem>Disciplines</MenuItem>
                    <MenuItem>Institutions</MenuItem>
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                alabala
            </SidebarFooter>
        </ProSidebar>
    );
}

export default Sidebar;