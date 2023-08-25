import React from 'react';
import '../assets/style/App.css';
//import icons from fontawesome and react icon kit
import { Icon } from 'react-icons-kit';
import { ic_label_important } from 'react-icons-kit/md/ic_label_important';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';
import { faAnglesDown, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
// import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useState, useEffect, useRef } from "react";
import { json, useNavigate } from 'react-router-dom';
import { ic_room } from 'react-icons-kit/md/ic_room';
import { map } from 'react-icons-kit/fa/map';
import { ic_mail } from 'react-icons-kit/md/ic_mail';
import { ic_home_work } from 'react-icons-kit/md/ic_home_work';
import { ic_domain } from 'react-icons-kit/md/ic_domain';


const Site_content = () => {

    // const
    const [alldata, setalldata] = useState([]);
    const [company_value, setcompany] = useState([]);
    const [userdata, setuser_data] = useState([]);
    const [responseData_state, set_responseData_state] = useState([])
    const [activeCount, setactiveCount] = useState(0);
    const [inactiveCount, setinactiveCount] = useState(0);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
    const dropdownRef2 = useRef(null);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
    const dropdownRef3 = useRef(null);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
    const dropdownRef4 = useRef(null);
    const [active_inactive, setactive_inactive] = useState([]);

    const dropdown5 = useRef(null);


    const Editinactivedata = async (data, index) => {
        const status = "0";
        const body = { status };
        const confirm = window.confirm("Do you want to Deactivate")
        if (confirm) {
            const response = await fetch(`https://tempoiotapi.quantanics.in/sitedata/${data.site_id}`, {
                method: "PUT",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            if (response) {
                await fetchData()
            }
        }
    }


    const Editactivedata = async (data, index) => {
        const status = "1";
        const body = { status };
        const confirm = window.confirm("Do you want to Activate")
        if (confirm) {
            const response = await fetch(`https://tempoiotapi.quantanics.in/sitedata/${data.site_id}`, {
                method: "PUT",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            if (response) {
                await fetchData()
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    // Fetch data from node js
    async function fetchData(Option, index) {
        try {
            const response = await fetch('https://tempoiotapi.quantanics.in/site');
            const data = await response.json();

            const response_user = await fetch('https://tempoiotapi.quantanics.in/user_roof');
            const user_data = await response_user.json();

            const response_company = await fetch('https://tempoiotapi.quantanics.in/site_company');
            const data_company = await response_company.json();

            let filteredData;
            if (index === '0') {
                if (Option === 'Active') {
                    filteredData = data.filter(item => item.site_status === '1');
                } else if (Option === 'Inactive') {
                    filteredData = data.filter(item => item.site_status != '1');
                } else {
                    filteredData = data;
                }
            } else if (index === '1') {
                filteredData = data.filter(item => item.company === Option);
            } else {
                filteredData = data;
            }

            const modifiedData = filteredData.map((item) => {
                const date = new Date(item.last_updated_on);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const formattedDate = `${day}-${month}-${year}`;
                return { ...item, last_updated_on: formattedDate };
            });

            // Update active and inactive counts
            const activeCount = data.filter(item => item.site_status === '1').length;
            const inactiveCount = data.filter(item => item.site_status !== '1').length;
            setalldata(modifiedData);
            setactiveCount(activeCount);
            setinactiveCount(inactiveCount);
            setcompany(data_company);
            setuser_data(user_data);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (alldata) {
            setactive_inactive(alldata.map(item => item.status === 1))
        }
    }, [alldata])


    const [isless_than_10_active, setisless_than_10_active] = useState(false)
    const [isgreater_than_10_inactive, setisgreater_than_10_inactive] = useState(false)
    useEffect(() => {
        if (activeCount < 10) {
            setisless_than_10_active(true)

        }
        else {
            setisless_than_10_active(false);
        }
        if (inactiveCount < 10) {
            setisgreater_than_10_inactive(true)
        }
        else {
            setisgreater_than_10_inactive(false);
        }
    })


    const site_edit_page = async (data) => {
        navigate(`/Site/edit_site/${data.site_id}`);
    }


    // industry

    const dropdown2 = () => {
        setIsOpen2(!isOpen2);
        setIsDropdownOpen2(!isDropdownOpen2);
    };
    const empty_space_down2 = (event) => {
        if (!dropdownRef2.current.contains(event.target)) {
            setIsOpen2(false);
            setIsDropdownOpen2(false)
        }
    };
    useEffect(() => {
        document.addEventListener('click', empty_space_down2);
        return () => {
            document.removeEventListener('click', empty_space_down2);
        };
    }, []);

    // company
    const dropdown3 = () => {
        setIsOpen3(!isOpen3);
        setIsDropdownOpen3(!isDropdownOpen3)
    };
    const empty_space_down3 = (event) => {
        if (!dropdownRef3.current.contains(event.target)) {
            setIsOpen3(false);
            setIsDropdownOpen3(false)
        }
    };
    useEffect(() => {
        document.addEventListener('click', empty_space_down3);
        return () => {
            document.removeEventListener('click', empty_space_down3);
        };
    }, []);


    // admin dropdown

    const dropdown4 = () => {
        setIsOpen4(!isOpen4);
        setIsDropdownOpen4(!isDropdownOpen4)
    };
    const empty_space_down4 = (event) => {
        if (!dropdownRef4.current.contains(event.target)) {
            setIsOpen4(false);
            setIsDropdownOpen4(false)
        }
    };
    useEffect(() => {
        document.addEventListener('click', empty_space_down4);
        return () => {
            document.removeEventListener('click', empty_space_down4);
        };
    }, []);



    const handlesiteClick = () => {
        console.log("hello");
    };




    //rotate the arrow in the device action
    const [rotatedIndex, setRotatedIndex] = useState(null);
    const [site_active, setsite_active] = useState("");

    const handleIconClick = (index) => {
        const sts = document.getElementsByClassName('device_active')[index].innerHTML;
        if (sts === 'Active') {
            setsite_active('Active')
        }
        if (sts === 'Inactive') {
            setsite_active('Inactive')
        }
        if (rotatedIndex === index) {
            setRotatedIndex(null);
        } else {
            setRotatedIndex(index);
        }
    };



    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('1');

    const handleDivClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    const handleInputBlur = () => {
        setIsEditing(false);
    };
    //push input box to the page
    const handleButtonClick = () => {
        setShowInput(true);
    };
    const [showInput, setShowInput] = useState(false);


    //Navigate to Add Site Page
    const navigate = useNavigate();
    const handleclick = () => {
        navigate('/Site/Add_site');
    }

    const [selectedOption, setSelectedOption] = useState('All');




    const [company_name, setcompany_name] = useState("")
    const [site_name, setsite_name] = useState("")
    const [site_admin_email, setsite_admin_email] = useState("")
    const [site_location, setsite_location] = useState("")
    const [site_address, setsite_address] = useState("")
    const [site_admin_name, setsite_admin_name] = useState("")
    const get_site_data = (index) => {
        alldata.map((item, item_index) => {
            if (item_index === index) {
                setcompany_name(item.company);
                setsite_name(item.site_name);
                setsite_admin_email(item.email);
                setsite_location(item.location_name);
                setsite_address(item.address);
                setsite_admin_name(item.site_admin_name);
            }

        })
    }

    const filter_active_inactive = (option, index) => {
        fetchData(option, index);
    };

    const handleOptionChange = (option) => {
        if (option === selectedOption) {
            setSelectedOption('All'); // Uncheck the selected option if it was already selected
            filter_active_inactive('All', '0');
        } else {
            setSelectedOption(option);
            filter_active_inactive(option, '0');
        }
    };

    const [selectedCompany, setSelectedCompany] = useState('');

    const handleCompanyChange = (company) => {
        if (company === selectedCompany) {
            setSelectedCompany('');
            filter_active_inactive('All', '0');
        } else {
            setSelectedCompany(company);
            filter_active_inactive(company.trim(), '1');
        }
    };



    const storedData = sessionStorage.getItem('access_control');
    const parsedData = JSON.parse(storedData);

    const [access_to_addSite, setaccess_to_addSite] = useState(true);
    const [access_to_editStatus, setaccess_to_editStatus] = useState(true);
    useEffect(() => {
        if (parsedData.user_management < 3) {
            setaccess_to_addSite(false);
            if (parsedData.user_management < 2) {
                setaccess_to_editStatus(false);
            }

        }
    });

    return (
        <div className='bar'>
            <div className='status-bar'>
                <div className="device_mangement_main_content">
                    <div className="device_management display-flex page_top_box box-shadow">
                        <span className='module_tittle '>Site Management</span>
                        <div className='status-btns display-flex'>
                            <div className='btn-loc active-loc display-flex '> <div style={{ fontSize: "20px" }}>{isless_than_10_active ? `0${activeCount}` : `${activeCount}`}&nbsp;</div>Active</div>
                            <div className='btn-loc inactive-loc display-flex'><div style={{ fontSize: "20px" }}>{isgreater_than_10_inactive ? `0${inactiveCount}` : `${inactiveCount}`}&nbsp;</div> Inactive</div>
                        </div>
                    </div>
                    <div className='filters display-flex' >
                        <div className="first_child display-flex">
                            <div class="pagination display-flex" onClick={handleDivClick}>
                                <div className="focus-page">
                                    <input
                                        type="number"
                                        value={text}
                                        onChange={handleInputChange}
                                        onBlur={handleInputBlur}
                                        autoFocus
                                        className='editable_input_box'
                                    />
                                </div>
                                <div className="upcomming-pages">
                                    of 20 pages
                                </div>
                            </div>
                            <div className='move_head'>
                                <div className='filters1 display-flex'>

                                    <div class="dropdown-filter" ref={dropdownRef2}>
                                        <div class="device_filters" onClick={dropdown2}>
                                            <div className="device_name">
                                                Site Status
                                            </div>
                                            <div className="dropdown_icon">
                                                <FontAwesomeIcon
                                                    icon={isDropdownOpen2 ? faChevronDown : faChevronUp}
                                                    className="dropdown-icon"
                                                />
                                            </div>
                                        </div>
                                        {isOpen2 && (
                                            <div className="dropdown_menu2 dashboard_dropdown-menu dropdown-colors">
                                                <div>
                                                    <div className='device_dropdown'>
                                                        <input
                                                            className='device_sts_checkbox'
                                                            type="checkbox"
                                                            checked={selectedOption === 'All'}
                                                            onChange={() => handleOptionChange('All')}
                                                        />
                                                        <div className="div_sts">All</div>
                                                    </div>
                                                    <div className='device_dropdown'>
                                                        <input
                                                            className='device_sts_checkbox'
                                                            type="checkbox"
                                                            checked={selectedOption === 'Active'}
                                                            onChange={() => handleOptionChange('Active')}
                                                        />
                                                        <div className="div_sts">Active</div>
                                                    </div>
                                                    <div className='device_dropdown'>
                                                        <input
                                                            className='device_sts_checkbox'
                                                            type="checkbox"
                                                            checked={selectedOption === 'Inactive'}
                                                            onChange={() => handleOptionChange('Inactive')}
                                                        />
                                                        <div className="div_sts">InActive</div>
                                                    </div>
                                                </div>
                                            </div>


                                        )}
                                    </div>
                                    <div class="dropdown-filter" ref={dropdownRef3}>
                                        <div class="device_filters" onClick={dropdown3}>
                                            <div className="device_name">
                                                Company Name
                                            </div>
                                            <div className="dropdown_icon">
                                                <FontAwesomeIcon
                                                    icon={isDropdownOpen3 ? faChevronDown : faChevronUp}
                                                    className="dropdown-icon"
                                                />
                                            </div>
                                        </div>
                                        {isOpen3 && (
                                            <div className="dropdown_menu2 dashboard_dropdown-menu heights dropdown-colors">
                                                {company_value.map((data, index) => (
                                                    <div className='device_scroll' key={index}>
                                                        <div>
                                                            <div className='device_dropdown'>
                                                                <input
                                                                    className='device_sts_checkbox'
                                                                    type="checkbox"
                                                                    checked={data.company.trim() === selectedCompany}
                                                                    onChange={() => handleCompanyChange(data.company.trim())}
                                                                />
                                                                <div className="div_sts">{data.company}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {access_to_addSite && (
                            <div className='filters2 display-flex filters_last_child' >
                                <button className='btn btn-fill' onClick={handleclick} >Add Site</button>
                            </div>
                        )}
                    </div>
                    <div className='col-headings'>
                        <div className="col-head">SITE ID</div>
                        <div className="col-head">SITE NAME</div>
                        <div className="col-head">INDUSTRY</div>
                        <div className="col-head">SITE CREATED ON</div>
                        <div className="col-head">SITE ADMIN</div>
                        <div className="col-head">SITE STATUS</div>
                        <div className="col-head">ACTION</div>
                    </div>

                    <div className="scroll_div">
                        {alldata.map((data, index) => (
                            <div className="datas skeleton-block">
                                <div className="col-head" key={index}>{data.site_id}</div>
                                <div className="col-head" key={index}>{data.site_name}</div>
                                <div className="col-head">Industry</div>
                                <div className="col-head" key={index}>{data.last_updated_on}</div>
                                <div className="col-head" key={index}>{data.first_name}</div>
                                <div className="col-head display-flex">
                                    <FontAwesomeIcon
                                        icon={faDiamond}
                                        style={{ color: data.site_status === '1' ? 'green' : 'red', paddingTop: '7px' }}
                                        size="xs"
                                    />
                                    <div className={`device_active`} style={{ color: data.site_status === '1' ? 'green' : 'red' }}>
                                        {data.site_status === '1' ? 'Active' : 'Inactive'}
                                    </div>
                                </div>
                                <div className="col-head display-flex device_action_dropdown_parent">
                                    <div className="sts_icon" onClick={() => access_to_editStatus && handleIconClick(index)}>
                                        <Icon icon={ic_label_important} style={{ transform: rotatedIndex === index ? 'rotate(90deg)' : 'rotate(0)', color: rotatedIndex === index ? '#08c6cd' : 'lightgray', }} className='device_content_arrow' size={25} />
                                    </div>
                                    <div key={index}>{(rotatedIndex === index && data.site_status === '1') &&
                                        (<div className='device_action_dropdown'>
                                            <div className='display-flex device_action_dropdown1 dropdown_action'>
                                                <FontAwesomeIcon className='device_content_arrows' icon={faAnglesDown} size='lg' />
                                                <div className='device_content_dropdown display-flex' onClick={() => site_edit_page(data)}>Edit Detials</div>
                                            </div>
                                            <div className='display-flex device_action_dropdown2 dropdown_action'>
                                                <FontAwesomeIcon icon={faAnglesDown} className='device_content_arrows' size='lg' />
                                                <div className='device_content_dropdown display-flex' onClick={() => { Editinactivedata(data, index) }}>Inactivate Site</div>
                                            </div>
                                        </div>)}
                                    </div>
                                    <div key={index}>{(rotatedIndex === index && data.site_status !== '1') &&
                                        (<div className='device_action_dropdown'>
                                            <div className='display-flex device_action_dropdown1 dropdown_action' onClick={() => handlesiteClick(index)}>

                                                <FontAwesomeIcon className='device_content_arrows' icon={faAnglesDown} size='lg' />
                                                <div className='device_content_dropdown display-flex' data-bs-toggle="modal" data-bs-target="#device_status_action" onClick={() => get_site_data(index)}>Site Details</div>
                                            </div>
                                            <div className='display-flex device_action_dropdown2 dropdown_action'>
                                                <FontAwesomeIcon icon={faAnglesDown} className='device_content_arrows' size='lg' />
                                                <div className='device_content_dropdown display-flex' onClick={() => { Editactivedata(data, index) }}>Activate Site</div>
                                            </div>
                                        </div>)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='device_bottom'>
                    <div className='device_export cursor-pointer'>
                        <div className='device_exports'>Export</div>
                    </div>
                </div>
            </div>
            {/* Edit Device detials */}
            <div class="modal fade device_status_action" id="device_status_action" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="device_status_header">
                            <h5 class="modal-title" id="exampleModalLabel">SITE DETAILS
                            </h5>
                        </div>
                        <div class="device_status_body">
                            <div className="dsa_row1">
                                <div className="dsa_1st_input">
                                    <label for="input1">Company Name</label>
                                    <div className="inputs-group">
                                        <span class="input-group-loc"><Icon icon={ic_home_work} size={20} style={{ color: "lightgray" }} /></span>
                                        <input type="text" class="form-control-loc hack" id="input1" value={company_name} />
                                    </div>
                                </div>

                                <div className="dsa_1st_input">
                                    <label for="input1">Site Name</label>
                                    <div className="inputs-group">
                                        <span class="input-group-loc"><Icon icon={ic_domain} size={20} style={{ color: "lightgray" }} /></span>
                                        <input type="text" class="form-control-loc hack" id="input1" value={site_name} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dsa_row2">
                            <div className="dsa_1st_input">
                                <label for="input1">Site Admin Email</label>
                                <div className="inputs-group">
                                    <span class="input-group-loc"><Icon icon={ic_mail} size={20} style={{ color: "lightgray" }} /></span>
                                    <input type="text" class="form-control-loc hack" id="input1" value={site_admin_email} />
                                </div>
                            </div>
                            <div className="dsa_1st_input">
                                <label for="input1">Site location</label>
                                <div className="inputs-group">
                                    <span class="input-group-loc"><Icon icon={ic_room} size={20} style={{ color: "lightgray" }} /></span>
                                    <input type="text" class="form-control-loc hack" id="input1" value={site_location} />
                                </div>
                            </div>
                        </div>
                        <div className="dsa_row3">
                            <div className="dsa_1st_input">
                                <label for="input1">Site Address</label>
                                <div className="inputs-group">
                                    <span class="input-group-loc"><Icon icon={map} size={20} style={{ color: "lightgray" }} /></span>
                                    <input type="text" class="form-control-loc hack" id="input1" value={site_address} />
                                </div>
                            </div>
                            <div className="dsa_3rd_input">
                                <div className="dsa_updates">
                                    <div className="updated_by">
                                        <label htmlFor="updated_by_name" className='dsa_updates_heading'>Last Updated By
                                        </label>
                                        <div id="updated_by_name">Manikandan S</div>
                                    </div>
                                    <div className="updated_on">
                                        <label htmlFor="updated_by_date" className='dsa_updates_heading'>Last Updated On
                                        </label>
                                        <div id="updated_by_date">20 march 2023</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="device_status_footer">
                            <button type="button" class="btn-loc active-loc dsa_save_btn">Save</button>
                            <button type="button" class="btn-loc inactive-loc" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Site_content;