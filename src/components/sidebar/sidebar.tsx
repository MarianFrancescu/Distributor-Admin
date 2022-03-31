import React from "react";
import { Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import './sidebar.scss';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';

function Sidebar({menuOpen, setMenuOpen}: any) {



    return(
        <ProSidebar width={200} className="side" collapsed={!menuOpen}>
            <SidebarHeader className="basic-container header" onClick={()=>setMenuOpen(!menuOpen)}>
                {
                    menuOpen ? 'Dashboard' : <DashboardRoundedIcon/>
                }
            </SidebarHeader>
            <SidebarContent >
                <Menu className="list-container" iconShape="circle">
                    <MenuItem icon={<PeopleAltIcon />} >
                        <Link className="link" to="/students">
                            Students
                        </Link>
                    </MenuItem>
                    <MenuItem icon={<LibraryBooksRoundedIcon />}>
                        <Link className="link" to="/disciplines">
                            Disciplines
                        </Link>
                    </MenuItem>
                    <MenuItem icon={<CorporateFareRoundedIcon />}>
                        <Link className="link" to="/institutions">
                            Institutions
                        </Link>
                    </MenuItem>
                </Menu>
            </SidebarContent>
            <SidebarFooter className="basic-container">
                Admin
            </SidebarFooter>
        </ProSidebar>
        
    );
}

export default Sidebar;