import React, { useState } from 'react';
//import react icons
import { FaTh, FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt, FaShoppingBag } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faArrowRightFromBracket, faMinus } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link, BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from "react";


const Sidebar = ({ children, give_auth, handleLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [activelink,setactivelink]=useState(null);
    const [logoutdiv, setlogoutdiv] = useState(false);
    const storedData = sessionStorage.getItem('access_control');
    const parsedData = JSON.parse(storedData);
    const navigate = useNavigate();
    const userSidebarConfig = {
        RI001: {
            menuItem: [
                {
                    // path: '/dashboard',
                    icon: <FaTh />,
                    head: 'Dashboard',
                    links: [
                        { url: '/dashboard', text: 'Dashboard' },
                    ],
                },
                {
                    icon: <FaUserAlt />,
                    head: 'Management',
                    links: [
                        // { url: '/Assert_Management', text: 'Assert Management' },
                        // { url: '/Alert_Management', text: 'Alert Management' },
                        { url: '/Device/site_id', text: 'Device Management' },
                        { url: '/Site', text: 'Site Management' },
                        { url: '/User', text: 'User Management' },
                    ],
                },
                // {
                //     icon: <FaRegChartBar />,
                //     head: 'Configuration',
                //     links: [
                //         { url: '/Alert', text: 'Alert' },
                //         { url: '/Modbus_Slave', text: 'Modbus Slave' },
                //         { url: '/Modbus_Master', text: 'Modbus Master' },
                //     ],
                // },
                // {
                //     icon: <FaCommentAlt />,
                //     head: 'Upgradation',
                //     links: [
                //         { url: '/#', text: 'Firmware' },
                //     ],
                // },
                // {
                //     icon: <FaShoppingBag />,
                //     head: 'Log Maintenance',
                //     links: [
                //         { url: '/Event', text: 'Event' },
                //         { url: '/Device_Connection', text: 'Device Connection' },
                //         { url: '/Real_Data', text: 'Real Data' },
                //     ],
                // },
            ],
        },
        RI002: {
            menuItem: [
                {
                    // path: '/dashboard',
                    icon: <FaTh />,
                    head: 'Dashboard',
                    links: [
                        { url: '/dashboard', text: 'Dashboard', show: parsedData ? parsedData.dashboard !== '0' : true },
                    ],
                },
                {
                    icon: <FaUserAlt />,
                    head: 'Management',
                    links: [
                        // { url: '/Assert_Management', text: 'Assert Management' },
                        // { url: '/Alert_Management', text: 'Alert Management' },
                        { url: '/Device/site_id', text: 'Device Management', show: parsedData ? parsedData.device_management !== '0' : true },
                        { url: '/Site', text: 'Site Management', show: parsedData ? parsedData.site_management !== '0' : true },
                        { url: '/User', text: 'User Management', show: parsedData ? parsedData.user_management !== '0' : true },
                    ],
                },
                // {
                //     icon: <FaRegChartBar />,
                //     head: 'Configuration',
                //     links: [
                //         { url: '/Alert', text: 'Alert' },
                //         { url: '/Modbus_Slave', text: 'Modbus Slave' },
                //         { url: '/Modbus_Master', text: 'Modbus Master' },
                //     ],
                // },
                // {
                //     icon: <FaCommentAlt />,
                //     head: 'Upgradation',
                //     links: [
                //         { url: '/#', text: 'Firmware' },
                //     ],
                // },
                // {
                //     icon: <FaShoppingBag />,
                //     head: 'Log Maintenance',
                //     links: [
                //         { url: '/Event', text: 'Event' },
                //         { url: '/Device_Connection', text: 'Device Connection' },
                //         { url: '/Real_Data', text: 'Real Data' },
                //     ],
                // },
            ],
        },
        RI003: {
            menuItem: [
                {
                    // path: '/dashboard',
                    icon: <FaTh />,
                    head: 'Dashboard',
                    links: [
                        { url: '/dashboard', text: 'Dashboard', show: parsedData ? parsedData.dashboard !== '0' : true },
                    ],
                },
                {
                    icon: <FaUserAlt />,
                    head: 'Management',
                    links: [
                        // { url: '/Assert_Management', text: 'Assert Management' },
                        // { url: '/Alert_Management', text: 'Alert Management' },
                        { url: '/Device/site_id', text: 'Device Management', show: parsedData ? parsedData.device_management !== '0' : true },
                        { url: '/User', text: 'User Management', show: parsedData ? parsedData.user_management !== '0' : true },
                    ],
                },
                // {
                //     icon: <FaRegChartBar />,
                //     head: 'Configuration',
                //     links: [
                //         { url: '/Alert', text: 'Alert' },
                //         { url: '/Modbus_Slave', text: 'Modbus Slave' },
                //         { url: '/Modbus_Master', text: 'Modbus Master' },
                //     ],
                // },
                // {
                //     icon: <FaCommentAlt />,
                //     head: 'Upgradation',
                //     links: [
                //         { url: '/dashboard/Page not set', text: 'Firmware' },
                //     ],
                // },
                // {
                //     icon: <FaShoppingBag />,
                //     head: 'Log Maintenance',
                //     links: [
                //         { url: '/Event', text: 'Event' },
                //         { url: '/Device_Connection', text: 'Device Connection' },
                //         { url: '/Real_Data', text: 'Real Data' },
                //     ],
                // },
            ],
        },
        RI004: {
            menuItem: [
                {
                    // path: '/dashboard',
                    icon: <FaTh />,
                    head: 'Dashboard',
                    links: [
                        { url: '/dashboard', text: 'Dashboard', show: parsedData ? parsedData.dashboard !== '0' : true },
                    ],
                },
                {
                    icon: <FaUserAlt />,
                    head: 'Management',
                    links: [
                        // { url: '/Assert_Management', text: 'Assert Management' },
                        // { url: '/Alert_Management', text: 'Alert Management' },
                        { url: '/Device/site_id', text: 'Device Management', show: parsedData ? parsedData.device_management !== '0' : true },
                        { url: '/User', text: 'User Management', show: parsedData ? parsedData.user_management !== '0' : true },
                    ],
                },
                // {
                //     icon: <FaRegChartBar />,
                //     head: 'Configuration',
                //     links: [
                //         { url: '/Alert', text: 'Alert' },
                //         { url: '/Modbus_Slave', text: 'Modbus Slave' },
                //         { url: '/Modbus_Master', text: 'Modbus Master' },
                //     ],
                // },
                // {
                //     icon: <FaCommentAlt />,
                //     head: 'Upgradation',
                //     links: [
                //         { url: '/dashboard/Page not set', text: 'Firmware' },
                //     ],
                // },
                // {
                //     icon: <FaShoppingBag />,
                //     head: 'Log Maintenance',
                //     links: [
                //         { url: '/Event', text: 'Event' },
                //         { url: '/Device_Connection', text: 'Device Connection' },
                //         { url: '/Real_Data', text: 'Real Data' },
                //     ],
                // },
            ],
        },

    };
    const { menuItem } = userSidebarConfig[give_auth] || {};

    const handleLogout1 = () => {
        handleLogout();
        navigate('/', { replace: true });
    }

    const Logout = () => {
        setlogoutdiv(!logoutdiv)
        const dropdownContent = document.getElementsByClassName('your-div');
        if (dropdownContent.style.display === "none") {
            dropdownContent.style.display = "block";
        } else {
            dropdownContent.style.display = "none";
        }
    }
    const logout_empty_space = useRef(null);
    const logout_empty_space_fun = (event) => {
        if (!logout_empty_space.current.contains(event.target)) {
            setlogoutdiv(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', logout_empty_space_fun);
        return () => {
            document.removeEventListener('click', logout_empty_space_fun);
        };
    }, []);
    const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
    const handleLinkClick = (i,index) => {
        setactivelink(i);
        setActiveDropdownIndex(index)
    };

    return (
        <div className="container-slidebar">
            <div className="sidebar">
                <div className="all_icon">
                    {menuItem &&
                        menuItem.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.path}
                                className="link" 
                                style={{ backgroundColor: activeDropdownIndex === index ? 'rgb(129, 222, 248)' : '' ,borderRadius:"7px"}}
                                onMouseEnter={() => {
                                    const dropdownContent = document.getElementsByClassName('dropdown-content')[index];
                                    dropdownContent.style.display = 'block';
                                }}
                                onMouseLeave={() => {
                                    const dropdownContent = document.getElementsByClassName('dropdown-content')[index];
                                    dropdownContent.style.display = 'none';
                                }}
                            >
                                <div className="individual_icon">
                                    <div className="icon">{item.icon}</div>
                                </div>

                                <div className="dropdown-content" style={{ display: 'none' }}>
                                    <div className="sidebar_head">{item.head}</div>
                                    {item.links.map((link, i) => (
                                        (link.show === undefined || link.show) && (
                                            <React.Fragment key={i}>
                                                <div> 
                                                    <Link to={link.url}
                                                     className={activelink === i ? 'active-link' : ''}
                                                     onClick={() => handleLinkClick(i,index)}
                                                     >{link.text}</Link>
                                                    {i !== item.links.length - 1 && <hr className="dropdown-hr" />}
                                                </div>
                                            </React.Fragment>
                                        )
                                    ))}
                                </div>
                            </NavLink>
                        ))}
                </div>
                <div style={{ position: "relative" }} className='profile' ref={logout_empty_space}>
                    <div >
                        <FontAwesomeIcon
                            className="profile_pic"
                            icon={faCircleUser}
                            style={{ "--fa-primary-color": "#ffffff", "--fa-secondary-color": "#797a7c" }}
                            onClick={Logout}
                        />

                    </div>
                    {logoutdiv && <div className="your-div">
                        <div className='display-flex logout1'>
                            <FontAwesomeIcon
                                className="profile_pic"
                                icon={faCircleUser}
                                style={{ "--fa-primary-color": "#ffffff", "--fa-secondary-color": "#797a7c" }}
                                onClick={Logout}
                            />
                            <span style={{ fontWeight: "600" }} className='name'>{parsedData.first_name}</span>
                        </div>
                        <div className='display-flex logout2' onClick={handleLogout1}>
                            <FontAwesomeIcon className="profile_pic1" icon={faArrowRightFromBracket} />
                            <div style={{ fontWeight: "600" }} className='name'>Logout</div>
                        </div>
                    </div>}
                </div>
            </div>
            <main>{children}</main>
        </div>

    );
};

export default Sidebar;
