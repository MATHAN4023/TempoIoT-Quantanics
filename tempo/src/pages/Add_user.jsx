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
import { following } from 'react-icons-kit/ikons/following';
import { followers } from 'react-icons-kit/ikons/followers';
import { pen_3 } from 'react-icons-kit/ikons/pen_3';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';




const Add_user = () => {

    const [admin_value, setadmin] = useState([]);
    const [loc_name, setlocationName] = useState([]);
    const [roles_value, setroles_value] = useState([]);

    const [user_type, setuser_type] = useState(sessionStorage.getItem('userType'));
    const session_db = sessionStorage.getItem('session_dbName');
    const parse_data = sessionStorage.getItem('site_user_type');
    const site_user_type = JSON.parse(parse_data);
    const [site_id, setSite_id] = useState("")

    // set var
    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [siteid, setsiteid] = useState("");
    const [roleid, setroleid] = useState("");
    const [contact, setcontact] = useState("");
    const [Designation, setDesignation] = useState("");
    const [email, setemail] = useState("")


    //  validation states
    const [first_name_error, setfirst_name_error] = useState("");
    const [last_name_error, setlast_name_error] = useState("");
    const [siteid_error, setsiteid_error] = useState("");
    const [roleid_error, setroleid_error] = useState("");
    const [contact_error, setcontact_error] = useState("");
    const [designation_error, setDesignation_error] = useState("");
    const [email_error, setemail_error] = useState("");



    // cancel script
    function handleCancel() {
        setfirst_name("");
        setlast_name("");
        setsiteid("");
        setroleid("");
        setcontact("");
        setDesignation("");
        setemail("");
        navigate('/User');
    }

    function handle_first_name(event) {
        const value = event.target.value;
        setfirst_name(value);
        const isValidcompany_name = /^[a-zA-Z]+$/.test(value);
        if (!isValidcompany_name) {
            setfirst_name_error("*Enter valid First name");
        } else {
            setfirst_name_error("");
        }
    }

    function handle_last_name(event) {
        const value = event.target.value;
        setlast_name(value);
        const isValidsite_name = /^[a-zA-Z]+$/.test(value);
        if (!isValidsite_name) {
            setlast_name_error("*Enter valid Last name");
        } else {
            setlast_name_error("");
        }
    }

    function handle_roleid(event) {
        const value = event.target.value;
        setroleid(value);
        const isValidsite_location = /^[a-zA-Z0-9]+$/.test(value);
        if (!isValidsite_location) {
            setroleid_error("*Enter valid Role ID");
        } else {
            setroleid_error("");
        }
    }

    function handle_contact(event) {
        const value = event.target.value;
        setcontact(value);
        const isValidsite_address = /^[0-9]{10}$/.test(value);
        if (!isValidsite_address) {
            setcontact_error("*Enter valid Contact number");
        } else {
            setcontact_error("");
        }

    }


    function handle_Designation(event) {
        const value = event.target.value;
        setDesignation(value);
        const isValidnew_site_admin_name = /^[a-zA-Z]+$/.test(value);
        if (!isValidnew_site_admin_name) {
            setDesignation_error("*Enter valid Designation");
        } else {
            setDesignation_error("");
        }
    }
    function handle_email(event) {
        const value = event.target.value;
        setemail(value);
        const isValidnew_site_admin_name = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!isValidnew_site_admin_name) {

            setemail_error("*Enter valid email");

        } else {
            setemail_error("");
        }
    }

    //redirect to device content page
    const navigate = useNavigate();
    // validation
    const handle_save = async () => {
        const isValidfirst_name = /^[a-zA-Z]+$/.test(first_name)
        const isValidlast_name = /^[a-zA-Z]+$/.test(last_name)

        const isValidroleid = /^[a-zA-Z0-9]+$/.test(roleid);
        const isValidcontact = /^[0-9]{10}$/.test(contact);
        const isValidDesignation = /^[a-zA-Z]+$/.test(Designation)
        const isValidemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

        if (!isValidfirst_name || !isValidlast_name || !isValidroleid || !isValidcontact || !isValidDesignation || !isValidemail) {
            alert("Please check out that you have entered all feild correctly");
        }
        else {
            try {
                const body = { first_name, last_name, site_id, roleid, contact, Designation, email, selectedOption_site, selectedOption_user, selectedOption_device, selectedOption_dashboard }
                const response = await fetch('https://tempoiotapi.quantanics.in/add_user', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
                const data = response.status;
                if (data === 200) {
                    alert("You have received an email to set password")
                    navigate('/User');
                    const html = ReactDOMServer.renderToStaticMarkup(<Mailcontent email={email} Designation={Designation} siteid={siteid} first_name={first_name} last_name={last_name} mailstate={true}/>);
                    const subject = "SET PASSWORD";
                    const body1 = { email, subject, html }
                    const response1 = await fetch('https://tempoiotapi.quantanics.in/sendemail', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body1)
                    });
                }
                else {
                    alert("Email ID already exist")
                }
            }
            catch (error) {
                console.log(error)
            }

        }
    }


    const [isOpen1, setIsOpen1] = useState(false);
    const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
    const dropdownRef1 = useRef(null);
    const handle_site_location = () => {
        setIsOpen1(!isOpen1);
    };

    const [isOpen2, setIsOpen2] = useState(false);
    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
    const dropdownRef2 = useRef(null);
    const dropdown2 = () => {
        setIsOpen2(!isOpen2);
    };

    const [isOpen3, setIsOpen3] = useState(false);
    const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
    const dropdownRef3 = useRef(null);
    const dropdown3 = () => {
        setIsOpen3(!isOpen3);
    };
    const [isOpen5, setIsOpen5] = useState(false);
    const dropdown4 = () => {
        if(site_user_type.type==="single" || site_user_type.type==="error"){
            alert(site_user_type.type);
        }else{
            setIsOpen5(!isOpen5)
        }
    }


    const [isOpen4, setIsOpen4] = useState(false);
    const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
    const dropdownRef4 = useRef(null);
    const site_location_target = useRef(null);
    const site_admin_target = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!site_location_target.current.contains(event.target)) {
                setIsOpen1(false);
            }
            if (!site_admin_target.current.contains(event.target)) {
                setIsOpen4(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // roles fetching from roles table
    var foundMatch = false;


    useEffect(() => {
        setSite_id(session_db);
        const fetchData = async () => {
            try {
                const roles_name = await fetch('https://tempoiotapi.quantanics.in/role_name');
                const rolesName = await roles_name.json();
                for (var i = 0; i < rolesName.length; i++) {
                    if (foundMatch) {
                        foundmac(rolesName[i])
                        console.log(roles_value);
                    } else {
                        if (rolesName[i].role_id === user_type) {
                            if (user_type === 'RI004') {
                                setAdd_user_value(rolesName[i].role)
                                setroleid(rolesName[i].role_id);
                            } else {
                                setAdd_user_value(rolesName[i + 1].role)
                                setroleid(rolesName[i + 1].role_id);
                            }
                            foundMatch = true;
                            setroles_value([]);
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            }
        };
        const foundmac = (roles) => {
            setroles_value((prevRoles) => [
                ...prevRoles,
                { role: roles.role, role_id: roles.role_id }
            ]);
        }
        fetchData();
    }, []);

    const [Add_user_value, setAdd_user_value] = useState();
    const set_value = (data) => {
        setAdd_user_value(data.role);
        setroleid(data.role_id);
        setIsOpen3(false);
    }
    const set_site_value=(data)=>{
        setSite_id(data.site_id)
        setIsOpen5(false)
    }

    const [selectedOption_site, setSelectedOption_site] = useState('1');
    const [selectedOption_user, setSelectedOption_user] = useState('0');
    const [selectedOption_device, setSelectedOption_device] = useState('2');
    const [selectedOption_dashboard, setSelectedOption_dashboard] = useState('1');

    const handleOptionChange_site = (event) => {
        setSelectedOption_site(event.target.value);
    };
    const handleOptionChange_user = (event) => {
        setSelectedOption_user(event.target.value);
    };
    const handleOptionChange_device = (event) => {
        setSelectedOption_device(event.target.value);
    };
    const handleOptionChange_dashboard = (event) => {
        setSelectedOption_dashboard(event.target.value);
    };

    return (
        <div className='Add_device1 '>
            {/* Exit Conformation */}
            <div className="modal fade boot-modals" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content width_of_model height_of_modal_content">
                        <div className="modal-header-confirm">
                            <h5 className="modal-title" id="exampleModalLabel">CONFIRMATION</h5>
                        </div>
                        <div className="modal-main-confirm">
                            <h5 className="modal-title ">Are you sure you want Exit ?
                            </h5>
                        </div>
                        <div className="modal-footer-confirm">
                            <button type="button" className="btn-loc active-loc" data-bs-dismiss="modal" onClick={handleCancel} >YES</button>
                            <button type="button" className="btn-loc inactive-loc" data-bs-dismiss="modal">NO</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* User access model */}
            <div className="modal fade boot-modals" id="User_Access_Modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content width_of_model user_access_model">
                        <div className="user_access">
                            <div className="modal-header-confirm">
                                <h5 className="modal-title" id="exampleModalLabel">User Access Control</h5>
                            </div>
                            <div className="access_priority display-flex">
                                <div className="no_access access">No Access</div>
                                <div className="view access">View</div>
                                <div className="edit access">Create/Edit</div>
                                <div className="Full access">Full</div>
                            </div>
                            <div className="all_management">
                                <div className="management">
                                    <div className="management_txt">Management</div>
                                </div>

                                <div className="user_acc_head display-flex">
                                    <div className="u_a_head">
                                        <div className="head">Site</div>
                                        <div className="all_radio_btns">
                                            <div className="input_radio">
                                                <input className="access_radio" type='radio' value="0"
                                                    checked={selectedOption_site === "0"}
                                                    onChange={handleOptionChange_site} />
                                            </div>
                                            <div className="input_radio">
                                                <input className="access_radio" type='radio' value="1"
                                                    checked={selectedOption_site === "1"}
                                                    onChange={handleOptionChange_site} />
                                            </div>
                                            <div className="input_radio">
                                                <input className="access_radio" type='radio' value="2"
                                                    checked={selectedOption_site === "2"}
                                                    onChange={handleOptionChange_site} />
                                            </div>
                                            <div className="input_radio">
                                                <input className="access_radio" type='radio' value="3"
                                                    checked={selectedOption_site === "3"}
                                                    onChange={handleOptionChange_site} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="user_acc_head display-flex">
                                    <div className="u_a_head">
                                        <div className="head">User</div>
                                        <div className="all_radio_btns">
                                            <div className="input_radio">
                                                <input className="access_radio" type='radio' value="0"
                                                    checked={selectedOption_user === "0"}
                                                    onChange={handleOptionChange_user} />
                                            </div>
                                            <div className="input_radio">
                                                <input className="access_radio" type='radio' value="1"
                                                    checked={selectedOption_user === "1"}
                                                    onChange={handleOptionChange_user} />
                                            </div>
                                            <div className="input_radio">
                                                <input className="access_radio" type='radio' value="2"
                                                    checked={selectedOption_user === "2"}
                                                    onChange={handleOptionChange_user} />
                                            </div>
                                            <div className="input_radio">
                                                <input className="access_radio" type='radio' value="3"
                                                    checked={selectedOption_user === "3"}
                                                    onChange={handleOptionChange_user} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="user_acc_head display-flex">
                                    <div className="u_a_head">
                                        <div className="head">Device</div>
                                        <div className="all_radio_btns">
                                            <div className="input_radio">
                                                <input className="access_radio" type='radio' value="0"
                                                    checked={selectedOption_device === "0"}
                                                    onChange={handleOptionChange_device} />
                                            </div>
                                            <div className="input_radio">
                                                <input className="access_radio" type='radio' value="1"
                                                    checked={selectedOption_device === "1"}
                                                    onChange={handleOptionChange_device} />
                                            </div>
                                            <div className="input_radio">
                                                <input className="access_radio" type='radio' value="2"
                                                    checked={selectedOption_device === "2"}
                                                    onChange={handleOptionChange_device} />
                                            </div>
                                            <div className="input_radio">
                                                <input className="access_radio" type='radio' value="3"
                                                    checked={selectedOption_device === "3"}
                                                    onChange={handleOptionChange_device} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="user_acc_head display-flex">
                                    <div className="u_a_head">
                                        <div className="head">Dashboard</div>
                                        <div className="all_radio_btns">
                                            <div className="input_radio">
                                                <input className="access_radio" type='radio' value="0"
                                                    checked={selectedOption_dashboard === "0"}
                                                    onChange={handleOptionChange_dashboard} />
                                            </div>
                                            <div className="input_radio">
                                                <input className="access_radio" type='radio' value="1"
                                                    checked={selectedOption_dashboard === "1"}
                                                    onChange={handleOptionChange_dashboard} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer-confirm">
                                <button type="button" className="btn-loc active-loc" data-bs-dismiss="modal">Save</button>
                                <button type="button" className="btn-loc inactive-loc" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="row_with_count_status">
                <span className='module_tittle'>User</span>
            </div>
            <div className="add_device_container1">
                <div className="new_device_content scroll_div">
                    <div className="row_one display-flex">
                        <div className="adding_new_device uppercase bold">Add User Detials </div>
                    </div>

                    <div className="row_two display-flex padding-loc">
                        <div className="device_info uppercase light-grey mb-loc-5">
                            User info
                        </div>
                        <div className="input-boxes">
                            <div className="cmpny_and_site_name display-flex">
                                <div class="dsa_row_1 inputbox display-flex input">
                                    <div class="dsa_1st_input">
                                        <label for="input1">First Name</label>
                                        <div class="inputs-group display-flex">
                                            <span class="input-group-loc"><Icon icon={ic_home_work} size={20} style={{ color: "lightgray" }} /></span>
                                            <input type="text" class="form-control-loc" value={first_name} onChange={handle_first_name} id="company_name" />
                                            <div className="error-message"><span className={first_name_error ? "error" : ""}>{first_name_error}</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="dsa_2nd_input inputbox display-flex input">

                                    <label for="input1">Last Name</label>
                                    <div className="inputs-group display-flex">
                                        <span class="input-group-loc"><Icon icon={ic_domain} size={20} style={{ color: "lightgray" }} /></span>
                                        <input type="text" class="form-control-loc" value={last_name} onChange={handle_last_name} id="site_name" />
                                        <div className="error-message"><span className={last_name_error ? "error" : ""}>{last_name_error}</span></div>
                                    </div>
                                </div>

                                <div className="dsa_3rd_input inputbox display-flex input">
                                    <div class="dropdown-filter" ref={dropdownRef3}>
                                        <div className="name_row" >
                                            <label for="input1">Select Site</label>
                                            <div class="inputs-group relative-loc arrow_inside_input_box"  onClick={dropdown4}>
                                                <span class="input-group-loc"><Icon icon={pen_3} size={20} style={{ color: "lightgray" }} /></span>
                                                <input type="text" value={site_id} className="form-control-loc" id="site_admin_name" />
                                                <FontAwesomeIcon
                                                    icon={faChevronDown}
                                                    class="dropdown-icon down_arrow arrow_inside_input"
                                                />
                                            </div>
                                        </div>
                                        {isOpen5 && (
                                            <div class="dropdown_menu2 dashboard_dropdown-menu heights dropdown-colors" style={{ cursor: "pointer", width: "230px" }}>
                                                <div className='device_scroll'>
                                                    {site_user_type.value.map((data, index) => (
                                                        <div className='device_scroll' key={index}>
                                                            <div>
                                                                <div className='device_dropdown' key={index} onClick={() => set_site_value(data)}>
                                                                    <div className="div_sts"> {data.site_id}</div>
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


                            <div className="dsa_row_3 display-flex">

                                <div class="dropdown-filter" ref={dropdownRef3}>
                                    <div className="name_row">


                                        <label for="input1">Select Role</label>
                                        <div class="inputs-group relative-loc arrow_inside_input_box" onClick={dropdown3} >
                                            <span class="input-group-loc"><Icon icon={pen_3} size={20} style={{ color: "lightgray" }} /></span>
                                            <input type="text" class="form-control-loc" id="site_admin_name" value={Add_user_value} />
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
                                                        <div>
                                                            <div className='device_dropdown' key={index} onClick={() => set_value(data)}>
                                                                <div className="div_sts"> {data.role}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    )
                                    }
                                </div>

                                <div className="dsa_3rd_input inputbox display-flex input">
                                    <label for="input1">Contact</label>
                                    <div className="inputs-group display-flex">
                                        <span class="input-group-loc"><Icon icon={location} size={20} style={{ color: "lightgray" }} /></span>
                                        <input type="text" class="form-control-loc" value={contact} onChange={handle_contact} id="site_address" />
                                        <div className="error-message"><span className={contact_error ? "error" : ""}>{contact_error}</span></div>
                                    </div>
                                </div>
                                <div className="dsa_3rd_input inputbox display-flex input">
                                    <label for="input1">Designation</label>
                                    <div className="inputs-group display-flex">
                                        <span class="input-group-loc"><Icon icon={map} size={20} style={{ color: "lightgray" }} /></span>
                                        <input type="text" class="form-control-loc" value={Designation} onChange={handle_Designation} id="site_address" />
                                        <div className="error-message"><span className={designation_error ? "error" : ""}>{designation_error}</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="dsa_row_3 display-flex">
                                <div className="dsa_3rd_input inputbox display-flex input">
                                    <label for="input1">Email</label>
                                    <div className="inputs-group display-flex">
                                        <span class="input-group-loc"><Icon icon={map} size={20} style={{ color: "lightgray" }} /></span>
                                        <input type="text" class="form-control-loc" value={email} onChange={handle_email} id="site_address" />
                                        <div className="error-message"><span className={email_error ? "error" : ""}>{email_error}</span></div>
                                    </div>
                                </div>
                                <div className="dsa_3rd_input inputbox display-flex input">
                                    <label for="input1">User Access</label>
                                    <div className="inputs-group display-flex">
                                        <input type="button" value="Access Credentials" data-bs-toggle="modal" data-bs-target="#User_Access_Modal" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="operating_buttons display-flex padding-loc">
                        <div className="save_cancel_btn display-flex site_button">
                            <button className="btn-loc active-loc btn btn-outline-success" onClick={() => handle_save()}>Save</button>
                            <button className="btn-loc inactive-loc btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
};
export default Add_user;