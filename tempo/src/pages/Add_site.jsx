import React from 'react';
import '../assets/style/App.css';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import Mailcontent from '../components/Mailcontent';

//import icons from fontawesome and react icon kit
import { Icon } from 'react-icons-kit';
import { person } from 'react-icons-kit/iconic/person';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { phone } from 'react-icons-kit/icomoon/phone'
import { location2 } from 'react-icons-kit/icomoon/location2'
import { ic_wysiwyg } from 'react-icons-kit/md/ic_wysiwyg'
import { location } from 'react-icons-kit/entypo/location'
import { ic_room } from 'react-icons-kit/md/ic_room';
import { map } from 'react-icons-kit/fa/map';
import { ic_mail } from 'react-icons-kit/md/ic_mail';
import { ic_home_work } from 'react-icons-kit/md/ic_home_work';
import { ic_domain } from 'react-icons-kit/md/ic_domain';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { following } from 'react-icons-kit/ikons/following'
import { followers } from 'react-icons-kit/ikons/followers'
import { pen_3 } from 'react-icons-kit/ikons/pen_3'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';




const Add_site = () => {
    // set var
    const [company_name, setcompanyname] = useState("");
    const [role_in_input, setrole_in_input] = useState("");
    const [site_name, setsitename] = useState("");
    const [email, setemail] = useState("");
    const [location_name, setlocationName] = useState("");
    const [site_address, setsiteaddress] = useState("");
    const [Desigination, setDesigination] = useState("");
    const [first_name, setfirstName] = useState("")
    const [last_name, setlastName] = useState("")
    const [contact, setcontact] = useState();
    const [mailstate, setmailstate] = useState(true);
    const [location_drop, setlocationNamedrop] = useState([]);

    const [admin_value, setadmin] = useState([]);
    const [roles_value, setroles_value] = useState([]);


    //  validation states
    const [company_nameerror, setcompanynameerror] = useState("");

    const [site_nameerror, setsitenameerror] = useState("");
    const [emailerror, setemailerror] = useState("");
    const [locationNameerror, setlocationNameerror] = useState("");
    const [site_addresserror, setsiteaddresserror] = useState("");
    const [Desiginationerror, setDesiginationerror] = useState("");
    const [firstNameerror, setfirstNameerror] = useState("");
    const [lastNameerror, setlastNameerror] = useState("");
    const [contacterror, setcontacterror] = useState("");
    const [checkemail, setcheckemail] = useState(false);

    // data fetching in site db 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response_admin = await fetch('https://tempoiotapi.quantanics.in/site_admin1');
                const data_admin = await response_admin.json();
                setadmin(data_admin);
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, []);


    // location fetching from location table

    useEffect(() => {
        const fetchlocation = async () => {
            try {
                const location_name = await fetch('https://tempoiotapi.quantanics.in/location_name');
                const locationNamedrop = await location_name.json();
                console.log(locationNamedrop);
                setlocationNamedrop(locationNamedrop);
            } catch (error) {
                console.log(error)
            }
        };


        fetchlocation();
    }, []);




    // roles fetching from roles table

    useEffect(() => {
        const fetchData = async () => {
            try {
                const roles_name = await fetch('https://tempoiotapi.quantanics.in/role_name');
                const rolesName = await roles_name.json();
                setrole_in_input(rolesName[2].role);
                setrole_id(rolesName[2].role_id);
                setroles_value(rolesName);
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, []);




    // cancel script
    function handleCancel() {
        setcompanyname("");
        setsitename("");
        setemail("");
        setlocationName("");
        setsiteaddress("");
        setDesigination("");
        setfirstName("");
        setlastName("");
        setcontact("");
        navigate('/Site');
    }

    function handlecompanyname(event) {
        const value = event.target.value;
        setcompanyname(value);
        const isValidcompany_name = /^[a-zA-Z]+$/.test(value);
        if (!isValidcompany_name) {
            setcompanynameerror("*Enter valid company name");
        } else {
            setcompanynameerror("");
        }
    }

    function handlesitename(event) {
        const value = event.target.value;
        setsitename(value);
        const isValidsite_name = /^[a-zA-Z0-9]+$/.test(value);
        if (!isValidsite_name) {
            setsitenameerror("*Enter valid site name");
        } else {
            setsitenameerror("");
        }
    }


    function handleemail(event) {
        const value = event.target.value;
        setemail(value);
        const isValidemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!isValidemail) {
            setemailerror("*Enter valid email");
        } else {
            setemailerror("");
        }
    }

    function handlelocationName(event) {
        const value = event.target.value;
        setlocationName(value);
        const isValidlocation_name = /^[a-zA-Z0-9\s\/\,\.\'-]+$/i.test(value);
        if (!isValidlocation_name) {
            setlocationNameerror("*Enter valid location Name");
        } else {
            setlocationNameerror("");
        }
    }

    function handlesiteaddress(event) {
        const value = event.target.value;
        setsiteaddress(value);
        const isValidsite_address = /^[a-zA-Z0-9\s\/\,\.\'-]+$/i.test(value);
        if (!isValidsite_address) {
            setsiteaddresserror("*Enter valid Location address");
        } else {
            setsiteaddresserror("");
        }
    }


    function handleDesigination(event) {
        const value = event.target.value;
        setDesigination(value);
        const isValidDesigination = /^[a-zA-Z]+$/.test(value);
        if (!isValidDesigination) {
            setDesiginationerror("*Enter valid Desigination");
        } else {
            setDesiginationerror("");
        }
    }

    function handlefirstName(event) {
        const value = event.target.value;
        setfirstName(value);
        const isValidfirst_name = /^[a-zA-Z]+$/.test(value);
        if (!isValidfirst_name) {
            setfirstNameerror("*Enter valid First name");
        } else {
            setfirstNameerror("");
        }
    }

    function handlelastName(event) {
        const value = event.target.value;
        setlastName(value);
        const isValidlast_name = /^[a-zA-Z]+$/.test(value);
        if (!isValidlast_name) {
            setlastNameerror("*Enter valid Last name");
        } else {
            setlastNameerror("");
        }
    }

    function handlecontact(event) {
        const value = event.target.value;
        setcontact(value);
        const isValidlast_name = /^[0-9]{10}$/.test(value);
        if (!isValidlast_name) {
            setcontacterror("*Enter valid contact number");
        } else {
            setcontacterror("");
        }
    }

    //redirect to device content page
    const navigate = useNavigate();

    // validation
    const handleClick = async () => {

        const isValidcompany_name = /^[a-zA-Z]+$/.test(company_name)
        const isValidsite_name = /^[a-zA-Z0-9]+$/.test(site_name)
        const isValidemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        const isValidlocation_name = /^[a-zA-Z0-9\s\/\,\.\'-]+$/i.test(location_name)
        const isValidsite_address = /^[a-zA-Z0-9\s\/\,\.\'-]+$/i.test(site_address)
        const isValidDesigination = /^[a-zA-Z]+$/.test(Desigination)
        const isValidfirst_name = /^[a-zA-Z]+$/.test(first_name)
        const isValidlast_name = /^[a-zA-Z]+$/.test(last_name)
        const isValidcontact = /^[0-9]{10}$/.test(contact)
        if ((!isValidcompany_name || !isValidsite_name || !isValidemail || !isValidlocation_name || !isValidsite_address || !isValidDesigination || !isValidfirst_name || !isValidlast_name || !isValidcontact)) {
            alert("Enter the valid data ")
        }

        else {
            try {
                const body = {
                    company_name,
                    site_name,
                    location_name,
                    first_name,
                    last_name,
                    Desigination,
                    contact,
                    email,
                    site_address,
                    role_id,
                    checkemail,
                };
                const response = await fetch('https://tempoiotapi.quantanics.in/site', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
                const data = await response.json();
                if (data) {
                    navigate('/Site');
                    const html = ReactDOMServer.renderToStaticMarkup(<Mailcontent email={email} Designation={"admin"} siteid={site_name} first_name={first_name} last_name={last_name} mailstate={mailstate} />);
                    const subject = "SET PASSWORD";
                    const body1 = { email, subject, html }
                    const response1 = await fetch('https://tempoiotapi.quantanics.in/sendemail', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body1)
                    });
                    const data1 = await response1.json();
                    console.log(data1);
                }

            } catch (error) {
                console.log(error)
            }


        }
    }


    const [isOpen1, setIsOpen1] = useState(false);
    const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
    const dropdownRef1 = useRef(null);


    const [isOpen2, setIsOpen2] = useState(false);
    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
    const dropdownRef2 = useRef(null);
    const dropdown2 = () => {
        setIsOpen2(!isOpen2);
        // setIsDropdownOpen2(!isDropdownOpen4)
    };

    const [isOpen3, setIsOpen3] = useState(false);
    const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
    const dropdownRef3 = useRef(null);
    const dropdown3 = () => {
        setIsOpen3(!isOpen3);
        // setIsDropdownOpen3(!isDropdownOpen3)
    };


    const [isOpen4, setIsOpen4] = useState(false);
    const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
    const dropdownRef4 = useRef(null);
    const handle_site_admin = () => {
        setIsOpen4(!isOpen4);
        // setIsDropdownOpen4(!isDropdownOpen4)
    };
    const site_admin_target = useRef(null);
    // console.log(site_admin_target);
    const empty_site_admin_target = (event) => {
        if (!site_admin_target.current.contains(event.target)) {
            setIsOpen4(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', empty_site_admin_target);
        return () => document.removeEventListener("click", empty_site_admin_target);
    })
    const site_location_target = useRef(null);
    // console.log(site_location_target);
    const empty_site_location_target = (event) => {
        if (!site_location_target.current.contains(event.target)) {
            setIsOpen1(false);
        }
    }
    useEffect(() => {
        // console.log(roles_value[0].role_id);
        document.addEventListener('click', empty_site_location_target);
        return () => document.removeEventListener("click", empty_site_location_target);

    });
    const [select_location, setSelect_location] = useState('Add New Location');
    const handle_location = (data) => {
        setSelect_location(data.location_name);
        console.log(data)
        setlocationName(data.location_name)
        setsiteaddress(data.address)
        setIsOpen1(!isOpen1);
    }
    const handle_site_new_location = () => {
        setSelect_location('Add New Location');
        setlocationName('');
        setsiteaddress('')
        setIsOpen1(!isOpen1);

    }

    const [select_admin, setSelect_admin] = useState('Add New Admin');
    const handle_admin = (data) => {
        setcheckemail(true)
        setSelect_admin(data.first_name);
        setfirstName(data.first_name);
        setlastName(data.last_name)
        setDesigination(data.designation)
        setcontact(data.contact)
        setemail(data.email)
        setIsOpen4(!isOpen4);
    }
    const handle_site_admin_details = () => {
        setSelect_admin('Add New Admin');
        setcheckemail(false)
        setfirstName('');
        setlastName('');
        setDesigination('');
        setcontact('');
        setemail('')
        setIsOpen4(!isOpen4);
    }


    const handle_site_location = () => {
        setIsOpen1(!isOpen1);
    };

    const [role_id, setrole_id] = useState("");
    const handleselectrole = (data) => {
        setrole_id(data.role_id);
        setrole_in_input(data.role);
    }


    return (
        <div className='Add_device1 '>
            <div className="modal fade boot-modals" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable custom-modal-dialog">
                    <div className="modal-content width_of_model height_of_modal_content">
                        <div className="modal-header-confirm">
                            <h5 className="modal-title" id="exampleModalLabel">CONFIRMATION</h5>
                        </div>
                        <div className="modal-main-confirm">
                            <h5 className="modal-title ">Are you sure you want Exit?</h5>
                        </div>
                        <div className="modal-footer-confirm">
                            <button type="button" className="btn-loc active-loc" data-bs-dismiss="modal" onClick={handleCancel}>YES</button>
                            <button type="button" className="btn-loc inactive-loc" data-bs-dismiss="modal">NO</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="device_management display-flex page_top_box box-shadow">
                <span className='module_tittle '>Site Management</span>
            </div>
            <div className="add_device_container1">
                <div className="new_device_content scroll_div">
                    <div className="row_one display-flex">
                        <div className="adding_new_device uppercase bold">Add Site Detials </div>
                    </div>

                    <div className="row_two display-flex padding-loc">
                        <div className="device_info uppercase light-grey mb-loc-5">
                            site info
                        </div>
                        <div className="input-boxes">
                            <div className="cmpny_and_site_name display-flex">
                                <div class="dsa_row_1 inputbox display-flex input">
                                    <div class="dsa_1st_input">
                                        <label for="input1">Company Name</label>
                                        <div class="inputs-group display-flex">
                                            <span class="input-group-loc"><Icon icon={ic_home_work} size={20} style={{ color: "lightgray" }} /></span>
                                            <input type="text" class="form-control-loc" value={company_name} onChange={handlecompanyname} id="company_name" />
                                            <div className="error-message"><span className={company_nameerror ? "error" : ""}>{company_nameerror}</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="dsa_2nd_input inputbox display-flex input">

                                    <label for="input1">Site Name</label>
                                    <div className="inputs-group display-flex">
                                        <span class="input-group-loc"><Icon icon={ic_domain} size={20} style={{ color: "lightgray" }} /></span>
                                        <input type="text" class="form-control-loc" value={site_name} onChange={handlesitename} id="site_name" />
                                        <div className="error-message"><span className={site_nameerror ? "error" : ""}>{site_nameerror}</span></div>
                                    </div>
                                </div>
                            </div>


                            <div className="dsa_row_3 display-flex">

                                <div class="dropdown-filter" ref={dropdownRef1}>
                                    <div className="name_row">
                                        <label for="input1">Site Location</label>
                                        <div class="inputs-group relative-loc arrow_inside_input_box site_location" onClick={handle_site_location} ref={site_location_target}>
                                            <span class="input-group-loc"><Icon icon={location2} size={20} style={{ color: "lightgray" }} /></span>
                                            <input type="text" class="form-control-loc" onChange={handlesitename} id="site_admin_name" value={select_location} />
                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                                class="dropdown-icon down_arrow arrow_inside_input"
                                            />
                                        </div>
                                    </div>

                                    {isOpen1 && (
                                        <div class="dropdown_menu2 dashboard_dropdown-menu heights dropdown-colors" style={{ cursor: "pointer", width: "230px" }}>
                                            <div className='device_scroll'>
                                                <div class='device_dropdown'>
                                                    <div class="div_sts" onClick={handle_site_new_location}>
                                                        Add New Location
                                                    </div>
                                                </div>
                                                {location_drop.map((data, index) => (
                                                    <div className='device_scroll' key={index}>
                                                        {/* <div><div className='device_dropdown' onClick={() => handlesiteadminname(data)}><div className="div_sts"> {data.location_drop}</div></div> */}
                                                        <div>
                                                            <div className='device_dropdown'>
                                                                <div className="div_sts" key={index} onClick={() => handle_location(data)}>
                                                                    {data.location_name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </div>

                                <div className="cmpny_and_site_name display-flex">
                                    <div className="dsa_3rd_input inputbox display-flex input">
                                        <label for="input1">New Location Name</label>
                                        <div className="inputs-group display-flex">
                                            <span class="input-group-loc"><Icon icon={location} size={20} style={{ color: "lightgray" }} /></span>
                                            <input type="text" class="form-control-loc" value={location_name} onChange={handlelocationName} id="site_address" />
                                            <div className="error-message"><span className={locationNameerror ? "error" : ""}>{locationNameerror}</span></div>
                                        </div>
                                    </div>
                                    <div className="dsa_3rd_input inputbox display-flex input">
                                        <label for="input1">New Location Address</label>
                                        <div className="inputs-group display-flex">
                                            <span class="input-group-loc"><Icon icon={map} size={20} style={{ color: "lightgray" }} /></span>
                                            <input type="text" class="form-control-loc" value={site_address} onChange={handlesiteaddress} id="site_address" />
                                            <div className="error-message"><span className={site_addresserror ? "error" : ""}>{site_addresserror}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row_three padding-loc">
                        <div className="mqtt_protocol display-flex">
                            <div className="network_protocol light-grey uppercase mb-loc-5 mt-loc-3">Site Admin info</div>
                        </div>
                        <div className="sub_row_three">
                            <div className="dsa_2st_input display-flex">
                                <div className="name_row">
                                    <label for="input1">Site Admin Name</label>
                                    <div class="inputs-group relative-loc" onClick={handle_site_admin} ref={site_admin_target}>
                                        <span class="input-group-loc"><Icon icon={person} size={20} style={{ color: "lightgray" }} /></span>
                                        <input type="text" class="form-control-loc" id="site_admin_name" value={select_admin} />
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            class="dropdown-icon down_arrow arrow_inside_input"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="dropdown-filter">

                                {isOpen4 && (
                                    <div class="dropdown_menu2 dashboard_dropdown-menu heights dropdown-colors" style={{ cursor: "pointer", width: "230px" }}>
                                        <div className='device_scroll'>
                                            <div class='device_dropdown'>
                                                <div class="div_sts" onClick={handle_site_admin_details}>
                                                    Add New Admin
                                                </div>
                                            </div>
                                            {admin_value.map((data, index) => (
                                                <div className='device_scroll' key={index}>
                                                    <div><div className='device_dropdown' key={index} onClick={() => handle_admin(data)}><div className="div_sts">
                                                        {data.first_name}</div>
                                                    </div>

                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="cmpny_and_site_name display-flex inputbox">
                                <div class="dsa_2st_input  display-flex input">

                                    <div className="name_row">
                                        <label for="input1">First Name</label>
                                        <div class="inputs-group relative-loc">
                                            <span class="input-group-loc"><Icon icon={following} size={20} style={{ color: "lightgray" }} /></span>
                                            <input type="text" class="form-control-loc" onChange={handlefirstName} id="firstname" value={first_name} readOnly={checkemail} />
                                            <div className="error-message"><span className={firstNameerror ? "error" : ""}>{firstNameerror}</span></div>
                                        </div>
                                    </div>
                                    <div className="name_row">
                                        <label for="input1">Last Name</label>
                                        <div class="inputs-group relative-loc">
                                            <span class="input-group-loc"><Icon icon={followers} size={20} style={{ color: "lightgray" }} /></span>
                                            <input type="text" class="form-control-loc" onChange={handlelastName} id="lastname" value={last_name} readOnly={checkemail} />
                                            <div className="error-message"><span className={lastNameerror ? "error" : ""}>{lastNameerror}</span></div>
                                        </div>
                                    </div>
                                    <div className="name_row">
                                        <label for="input1">Designation</label>
                                        <div class="inputs-group relative-loc">
                                            <span class="input-group-loc"><Icon icon={ic_wysiwyg} size={20} style={{ color: "lightgray" }} /></span>
                                            <input type="text" class="form-control-loc" onChange={handleDesigination} id="desigination" value={Desigination} readOnly={checkemail} />
                                            <div className="error-message"><span className={Desiginationerror ? "error" : ""}>{Desiginationerror}</span></div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="cmpny_and_site_name display-flex inputbox">
                                <div class="dsa_2st_input display-flex">
                                    <div className="name_row">
                                        <label for="input1">Contact No.</label>
                                        <div class="inputs-group relative-loc">
                                            <span class="input-group-loc"><Icon icon={phone} size={20} style={{ color: "lightgray" }} /></span>
                                            <input type="text" class="form-control-loc" onChange={handlecontact} id="contact_no" value={contact} readOnly={checkemail} />
                                            <div className="error-message"><span className={contacterror ? "error" : ""}>{contacterror}</span></div>

                                        </div>
                                    </div>
                                    <div className="name_row">
                                        <label for="input1">Email</label>
                                        <div class="inputs-group relative-loc">
                                            <span class="input-group-loc"><Icon icon={ic_mail} size={20} style={{ color: "lightgray" }} /></span>
                                            <input type="text" class="form-control-loc" onChange={handleemail} id="email" value={email} readOnly={checkemail} />
                                            <div className="error-message"><span className={emailerror ? "error" : ""}>{emailerror}</span></div>
                                        </div>

                                    </div>
                                    <div class="dropdown-filter" ref={dropdownRef3}>
                                        <div className="name_row">
                                            <label for="input1">Roles</label>
                                            <div class="inputs-group relative-loc arrow_inside_input_box"  >
                                                <span class="input-group-loc"><Icon icon={pen_3} size={20} style={{ color: "lightgray" }} /></span>
                                                <input type="text" class="form-control-loc" value={role_in_input} id="site_admin_name" readOnly={checkemail} />
                                                <FontAwesomeIcon
                                                    icon={faChevronDown}
                                                    class="dropdown-icon down_arrow arrow_inside_input"
                                                />
                                            </div>
                                        </div>

                                        {isOpen3 && (
                                            <div class="dropdown_menu2 dashboard_dropdown-menu heights dropdown-colors" style={{ cursor: "pointer", width: "230px" }}>
                                                <div className='device_scroll'>
                                                    {roles_value.map((data, index) => (
                                                        <div className='device_scroll' key={index}>
                                                            <div><div className='device_dropdown'>
                                                                <div className="div_sts" onClick={() => handleselectrole(data)}>
                                                                    {data.role}
                                                                </div>
                                                            </div>

                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="operating_buttons display-flex padding-loc">
                        <div className="save_cancel_btn display-flex site_button">
                            <button className="btn-loc active-loc btn btn-outline-success" onClick={() => handleClick()}>Save</button>
                            <button className="btn-loc inactive-loc btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
};
export default Add_site;