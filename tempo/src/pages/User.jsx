import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Icon } from 'react-icons-kit';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';
import { ic_label_important } from 'react-icons-kit/md/ic_label_important';
import { ic_home_work } from 'react-icons-kit/md/ic_home_work';
import { ic_domain } from 'react-icons-kit/md/ic_domain';
import { ic_mail } from 'react-icons-kit/md/ic_mail';
import { ic_room } from 'react-icons-kit/md/ic_room';
import { map } from 'react-icons-kit/fa/map';
import { useNavigate } from 'react-router-dom';

function User() {
    const [alldata, setalldata] = useState([]);
    const [isOpen1, setIsOpen1] = useState(false);

    const [activeCount, setactiveCount] = useState('0');
    const [inactiveCount, setinactiveCount] = useState('0');

    const storedData = sessionStorage.getItem('access_control');
    const parsedData = JSON.parse(storedData);
    const user_type = parsedData.role_id;
    const user_site_id = parsedData.site_id;

    const sitename = useRef(null)
    const userrole = useRef(null)
    const edit_details = useRef(null);
    const dropdown1 = () => {
        setIsOpen1(!isOpen1);

    };
    const user_role_dropdown = () => {
        setRole_state(!role_state);
    };
    const empty_space = (event) => {
        if (!sitename.current.contains(event.target)) {
            setIsOpen1(false);
        }
        if (!userrole.current.contains(event.target)) {
            setRole_state(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', empty_space)
        user_data();
    }, []);

    const user_data = async (Option, index) => {
        try {
            const response = await fetch(`https://tempoiotapi.quantanics.in/user_management?user_type=${user_type}&user_site_id=${user_site_id}`);
            const data = await response.json();
            const roles_name = await fetch('https://tempoiotapi.quantanics.in/role_name');
            const rolesName = await roles_name.json();
            var filteredData;
            if (index === '0') {
                if (Option === 'Active') {
                    filteredData = data.filter(item => item.status === '1');
                } else if (Option === 'Inactive') {
                    filteredData = data.filter(item => item.status === '0');
                } else {
                    filteredData = data;
                }
            } else if (index === '1') {
                filteredData = data.filter(item => item.role === Option);
            } else {
                filteredData = data;
            }

            const activeCount = data.filter((item, index) => item.status == '1').length;
            const inactiveCount = data.filter((item, index) => item.status != '1').length;
            setactiveCount(activeCount)
            setinactiveCount(inactiveCount)
            setrolesvalue(rolesName)
            setalldata(filteredData)
        } catch (err) {
            console.log("err : ", err);
        };
    };
    const [rolesvalue, setrolesvalue] = useState([]);
    const [rotatedIndex, setRotatedIndex] = useState(null);
    const handleIconClick = (index) => {
        if (rotatedIndex === index) {
            setRotatedIndex(null);
        } else {
            setRotatedIndex(index);
        }
    };

    const [model_fname, setModel_fname] = useState('');
    const [model_Lname, setModel_Lname] = useState('');
    const [model_siteid, setModel_siteid] = useState('');
    const [model_roleid, setModel_roleid] = useState('');
    const [model_contact, setModel_contact] = useState('');

    const [role_state, setRole_state] = useState(false)


    const get_user_data = (index) => {
        alldata.map((item, item_index) => {
            if (item_index === index) {
                setModel_fname(item.first_name);
                setModel_Lname(item.last_name);
                setModel_siteid(item.site_id);
                setModel_roleid(item.role_id);
                setModel_contact(item.contact);
            }
        })
    }

    const navigate = useNavigate();
    const add_user_click = () => {
        navigate('/User/Add_user');
    }

    const User_edit_page = async (index, data) => {
        navigate(`/User/Edit_user/${data.user_id}`);
    }



    const Editinactivedata = async (data, index) => {
        const devicestatus = "0";
        const body = { devicestatus };
        fetch(`https://tempoiotapi.quantanics.in/update_activate_status/${data.user_id}`, {
            method: "PUT",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(body)
        })
        alert("Deactivated successful")
        await user_data()
    }

    const Editactivedata = async (data, index) => {
        const devicestatus = "1";
        const body = { devicestatus };
        fetch(`https://tempoiotapi.quantanics.in/update_activate_status/${data.user_id}`, {
            method: "PUT",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(body)
        })
        alert("Activated successful")
        await user_data()
    }
    const [selectedOption, setSelectedOption] = useState('All');

    const filter_active_inactive = (option, index) => {
        user_data(option, index);
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

    const [selectedroles, setSelectedroles] = useState('');

    const handlerolesChange = (role) => {
        if (role === selectedroles) {
            setSelectedroles('');
            filter_active_inactive('All', '0');
        } else {
            setSelectedroles(role);
            filter_active_inactive(role.trim(), '1');
        }
    };

    const [access_to_addUser, setaccess_to_addUser] = useState(true);
    const [access_to_editStatus, setaccess_to_editStatus] = useState(true);

    useEffect(() => {
        if (parsedData.user_management < 3) {
            setaccess_to_addUser(false);
            if (parsedData.user_management < 2) {
                setaccess_to_editStatus(false);
            }
        }
    }, []);


    return (
        <>
            <div className="row_with_count_status">
                <span className='module_tittle'>User</span>
                <div className='status-btns display-flex'>
                    <div className='btn-loc active-loc display-flex '> <div style={{ fontSize: "20px" }}>{activeCount < 10 ? `0${activeCount}` : `${activeCount}`}&nbsp;</div>Active</div>
                    <div className='btn-loc inactive-loc display-flex'><div style={{ fontSize: "20px" }}>{inactiveCount < 10 ? `0${inactiveCount}` : `${inactiveCount}`}&nbsp;</div> Inactive</div>
                </div>
            </div>
            <div className="row_with_filters">
                <div className="pagination_with_filters">

                    <div class="pagination display-flex">
                        <div className="focus-page">
                            <input
                                type="number"
                                value={1}
                                autoFocus
                                className='editable_input_box'
                            />

                        </div>
                        <div className="upcomming-pages">
                            of 20 pages
                        </div>
                    </div>

                    <div className="dropdown-filter" ref={sitename}>
                        <div className="device_filters" onClick={dropdown1}>
                            <div className="device_name">
                                User Status
                            </div>
                            <div className="dropdown_icon">
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className="dropdown-icon"
                                />
                            </div>
                        </div>
                        {isOpen1 && (
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
                    <div className="dropdown-filter" ref={userrole}>
                        <div className="device_filters" onClick={user_role_dropdown}>
                            <div className="device_name">
                                User Role
                            </div>
                            <div className="dropdown_icon">
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className="dropdown-icon"
                                />
                            </div>
                        </div>
                        {role_state && (
                            <div className="dropdown_menu2 dashboard_dropdown-menu heights dropdown-colors">
                                {rolesvalue.map((data, index) => (
                                    <div className='device_scroll' key={index}>
                                        <div>
                                            <div className='device_dropdown'>
                                                <input
                                                    className='device_sts_checkbox'
                                                    type="checkbox"
                                                    checked={data.role.trim() === selectedroles}
                                                    onChange={() => handlerolesChange(data.role.trim())}
                                                />
                                                <div className="div_sts">{data.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {access_to_addUser && (
                    <div className='filters2 display-flex' onClick={add_user_click}>
                        <button className='btn btn-fill'>Add User</button>
                    </div>
                )}
                {/* onClick={handleclick} */}

            </div>
            <div className="row_with_column_headings">
                <div className="col-head uppercase">User ID</div>
                <div className="col-head uppercase">User Name</div>
                <div className="col-head uppercase">Site ID</div>
                <div className="col-head uppercase">User Role</div>
                <div className="col-head uppercase">Contact no</div>
                <div className="col-head uppercase">Status</div>
                <div className="col-head uppercase">Action</div>
            </div>
            <div className="scroll_div">
                {alldata.map((data, index) => (
                    <div className="datas skeleton-block">
                        {/* {JSON.stringify(data)} */}
                        <div className="col-head" key={index}>{data.user_id}</div>
                        <div className="col-head" key={index}>{data.first_name} {data.last_name}</div>
                        <div className="col-head" key={index}>{data.site_id}</div>
                        <div className="col-head" key={index}>{data.role}</div>
                        <div className="col-head" key={index}>{data.contact}</div>

                        <div className="col-head display-flex">

                            <FontAwesomeIcon icon={faDiamond}
                                style={{ color: data.status === '1' ? 'green' : 'red', paddingTop: '7px' }}
                                size="xs" />
                            <div className={`device_active`} style={{ color: data.status === '1' ? 'green' : 'red' }}>{data.status === '1' ? 'Active' : 'Inactive'}</div>

                        </div>

                        <div className="col-head display-flex device_action_dropdown_parent" ref={edit_details}>
                            <div className="sts_icon" onClick={() => access_to_editStatus && handleIconClick(index)}>
                                <Icon icon={ic_label_important}
                                    style={{ transform: rotatedIndex === index ? 'rotate(90deg)' : 'rotate(0)', color: rotatedIndex === index ? '#08c6cd' : 'lightgray', }}
                                    className='device_content_arrow' size={25} />

                            </div>
                            <div key={index}>{(rotatedIndex === index && data.status === '1') &&
                                (<div className='device_action_dropdown'>
                                    <div className='display-flex device_action_dropdown1 dropdown_action'>
                                        <FontAwesomeIcon className='device_content_arrows' icon={faAnglesDown} size='lg' />
                                        <div className='device_content_dropdown display-flex'
                                            onClick={() => User_edit_page(index, data)}
                                        >Edit User Detials</div>
                                    </div>
                                    <div className='display-flex device_action_dropdown2 dropdown_action'>
                                        <FontAwesomeIcon icon={faAnglesDown} className='device_content_arrows' size='lg' />
                                        <div className='device_content_dropdown display-flex'
                                            onClick={() => { Editinactivedata(data, index) }}
                                        >Inactivate User</div>
                                    </div>
                                </div>)}
                            </div>
                            <div key={index}>{(rotatedIndex === index && data.status !== '1') &&
                                (<div className='device_action_dropdown'>
                                    <div className='display-flex device_action_dropdown1 dropdown_action'>
                                        <FontAwesomeIcon className='device_content_arrows' icon={faAnglesDown} size='lg' />
                                        <div className='device_content_dropdown display-flex' data-bs-toggle="modal" data-bs-target="#device_status_action"
                                            onClick={() => { get_user_data(index); }}
                                        >User Details</div>

                                    </div>
                                    <div className='display-flex device_action_dropdown2 dropdown_action'>
                                        <FontAwesomeIcon icon={faAnglesDown} className='device_content_arrows' size='lg' />
                                        <div className='device_content_dropdown display-flex'
                                            onClick={() => { Editactivedata(data, index) }}
                                        >Activate User</div>
                                    </div>
                                </div>)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* show User detials */}
            <div class="modal fade device_status_action" id="device_status_action" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="device_status_header">
                            <h5 class="modal-title" id="exampleModalLabel">USER DETAILS
                            </h5>
                            {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div class="device_status_body">
                            <div className="dsa_row1">
                                <div className="dsa_1st_input">
                                    <label for="input1">First Name</label>
                                    <div className="inputs-group">
                                        <span class="input-group-loc"><Icon icon={ic_home_work} size={20} style={{ color: "lightgray" }} /></span>
                                        <input type="text" class="form-control-loc hack" id="input1" value={model_fname} />
                                    </div>
                                </div>

                                <div className="dsa_1st_input">
                                    <label for="input1">Last Name</label>
                                    <div className="inputs-group">
                                        <span class="input-group-loc"><Icon icon={ic_domain} size={20} style={{ color: "lightgray" }} /></span>
                                        <input type="text" class="form-control-loc hack" id="input1" value={model_Lname} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dsa_row2">
                            <div className="dsa_1st_input">
                                <label for="input1">Site ID</label>
                                <div className="inputs-group">
                                    <span class="input-group-loc"><Icon icon={ic_mail} size={20} style={{ color: "lightgray" }} /></span>
                                    <input type="text" class="form-control-loc hack" id="input1" value={model_siteid} />
                                </div>
                            </div>
                            <div className="dsa_1st_input">
                                <label for="input1">User Role</label>
                                <div className="inputs-group">
                                    <span class="input-group-loc"><Icon icon={ic_room} size={20} style={{ color: "lightgray" }} /></span>
                                    <input type="text" class="form-control-loc hack" id="input1" value={model_roleid} />
                                </div>
                            </div>
                        </div>
                        <div className="dsa_row3">
                            <div className="dsa_1st_input">
                                <label for="input1">Contact</label>
                                <div className="inputs-group">
                                    <span class="input-group-loc"><Icon icon={map} size={20} style={{ color: "lightgray" }} /></span>
                                    <input type="text" class="form-control-loc hack" id="input1" value={model_contact} />
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
        </>
    )

}
export default User;