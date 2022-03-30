import React from "react";
import { Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import './sidebar.scss';

function Sidebar({menuOpen, setMenuOpen}: any) {
    return(
        <ProSidebar className={"sidebar " + (menuOpen && "active")}>
            <SidebarHeader>
                logo
            </SidebarHeader>
            <SidebarContent >
                <Menu className="list-container" iconShape="square">
                    <MenuItem><Link className="link" to="/students">Students</Link></MenuItem>
                    <MenuItem><Link className="link" to="/disciplines">Disciplines</Link></MenuItem>
                    <MenuItem><Link className="link" to="/institutions">Institutions</Link></MenuItem>
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                alabala
            </SidebarFooter>
        </ProSidebar>
    );
}

export default Sidebar;