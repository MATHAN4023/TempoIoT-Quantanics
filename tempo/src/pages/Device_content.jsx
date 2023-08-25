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
import { useNavigate, useParams } from 'react-router-dom';

const Device_content = () => {
    //states
    const [alldata, setalldata] = useState([]);
    const [allnetdata, setnetwork] = useState([]);
    const [allupdatedata, setdevice_updated_on] = useState([]);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
    const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
    const [rotatedIndex, setRotatedIndex] = useState(null);
    const [device_active, setdevice_active] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('1');
    const [activeCount, setactiveCount] = useState(0);
    const [inactiveCount, setinactiveCount] = useState(0);
    const [deviceModel_data, setdevicemodel] = useState([]);
    const [deviceName_data, setdevicename] = useState([]);
    const [active_inactive, setactive_inactive] = useState([]);
    const [selectedOption, setSelectedOption] = useState('All');

    const { site_id_check } = useParams();
    useEffect(() => {
        fetchData();
    }, [site_id_check])

    const dropdownRef1 = useRef(null);
    const dropdown1 = () => {
        setIsOpen1(!isOpen1);
        setIsDropdownOpen1(!isDropdownOpen1);
    };
    const empty_space_down1 = (event) => {
        if (!dropdownRef1.current.contains(event.target)) {
            setIsOpen1(false);
            setIsDropdownOpen1(false)
        }
    };

    useEffect(() => {
        document.addEventListener('click', empty_space_down1);
        return () => {
            document.removeEventListener('click', empty_space_down1);
        };
    }, []);

    const dropdownRef2 = useRef(null);
    const dropdown2 = () => {
        setIsOpen2(!isOpen2);
        setIsDropdownOpen2(!isDropdownOpen2)

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


    const [isOpen3, setIsOpen3] = useState(false);
    const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
    const dropdownRef3 = useRef(null);
    const dropdown3 = () => {
        setIsOpen3(!isOpen3);
        setIsDropdownOpen3(!isDropdownOpen3);
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

    const dropdownRef4 = useRef(null);
    const dropdown4 = () => {
        setIsOpen4(!isOpen4);
        setIsDropdownOpen4(!isDropdownOpen4);
    };
    const empty_space_down4 = (event) => {
        if (!dropdownRef4.current.contains(event.target)) {
            setIsOpen4(false);
            setIsDropdownOpen4(false)
        }
    }
    useEffect(() => {
        document.addEventListener("click", empty_space_down4);
        return () => {
            document.removeEventListener("click", empty_space_down4);
        }
    }, [])

    //Navigate to Add Device Page
    const navigate = useNavigate();
    const handleclick = () => {
        navigate('/Device/Add_device');
    }

    // Fetch data from node js
    async function fetchData(Option, index) {
        try {
            const response = await fetch(`https://tempoiotapi.quantanics.in/user`);
            const deviceModel = await fetch('https://tempoiotapi.quantanics.in/device_modeldata');
            const deviceName = await fetch('https://tempoiotapi.quantanics.in/device_namedata');
            const network = await fetch('https://tempoiotapi.quantanics.in/network');
            const network_data = await network.json();
            const data = await response.json();

            const model_data = await deviceModel.json();
            const deviceName_data = await deviceName.json();

            const datalen = data.filter(item => item.device_status === 1);

            sessionStorage.setItem('state_count', datalen.length)
            
            
            let filteredData;
            if (index === '0') {
                if (Option === 'Active') {
                    filteredData = data.filter(item => item.device_status === 1);
                } else if (Option === 'Inactive') {
                    filteredData = data.filter(item => item.device_status === 0);
                } else {
                    filteredData = data;
                }
            } else if (index === '1') {
                filteredData = data.filter(item => item.device_name === Option);
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
            const activeCount = data.filter(item => item.device_status === 1).length;
            const inactiveCount = data.filter(item => item.device_status !== 1).length;
            setactiveCount(activeCount);
            setinactiveCount(inactiveCount);
            setdevicemodel(model_data);

            setdevicename(deviceName_data);
            setnetwork(network_data);
            setalldata(modifiedData);
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        if (alldata) {
            setactive_inactive(alldata.map(item => item.device_status === 1))
        }
    }, [alldata])

    //functions to set the device status avtive and inactive
    const Editinactivedata = async (data, index) => {
        const devicestatus = "0";
        const body = { devicestatus };
        fetch(`https://tempoiotapi.quantanics.in/userdata/${data.r_no}`, {
            method: "PUT",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(body)
        })
        const response = window.confirm("Deactivate successful")
        if (response) {
            await fetchData()
        }
    }

    const Editactivedata = async (data, index) => {
        const devicestatus = "1";
        const body = { devicestatus };
        fetch(`https://tempoiotapi.quantanics.in/userdata/${data.r_no}`, {
            method: "PUT",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(body)
        })
        const response = window.confirm("Activate successful")
        if (response) {
            await fetchData()
        }

    }

    //useeffect
    useEffect(() => {
        fetchData();
    }, []);

    //rotate the arrow in the device action
    const handleIconClick = (index) => {
        const sts = document.getElementsByClassName('device_active')[index].innerHTML;
        if (sts === 'Active') {
            setdevice_active('Active')
        }
        if (sts === 'Inactive') {
            setdevice_active('Inactive')
        }
        if (rotatedIndex === index) {
            setRotatedIndex(null);
        } else {
            setRotatedIndex(index);
        }
    };



    const handleDivClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    const handleInputBlur = () => {
        setIsEditing(false);
    };
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

    //navigate to edit page
    const Device_edit_page = async (data) => {
        navigate(`/Device/edit_device/${data.r_no}`);
    }


    const [device_name, setdevice_name] = useState("")
    const [device_model, setdevice_model] = useState("")
    const [device_firmware_version, setdevice_firmware_version] = useState("")
    const [device_mac_address, setdevice_mac_address] = useState("")

    const get_device_data = (index) => {
        alldata.map((item, item_index) => {
            if (item_index === index) {
                setdevice_name(item.device_name);
                setdevice_model(item.device_model);
                setdevice_firmware_version(item.device_firmware_version);
                setdevice_mac_address(item.device_mac_address);
                setdevice_updated_on(item.last_updated_on);
            }

        })
    }

    const [client_id, setclient_id] = useState("")
    const get_device1_data = (index) => {
        allnetdata.map((item, item_index) => {
            if (item_index === index) {
                setclient_id(item.client_id);
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

    const [selectedDevice, setSelectedDevice] = useState('');

    const handleDeviceChange = (device_name) => {
        if (device_name === selectedDevice) {
            setSelectedDevice('');
            filter_active_inactive('All', '0');
        } else {
            setSelectedDevice(device_name);
            filter_active_inactive(device_name.trim(), '1');
        }
    };

    const storedData = sessionStorage.getItem('access_control');
    const parsedData = JSON.parse(storedData);
    const [access_to_addDevice, setaccess_to_addDevice] = useState(true);
    const [access_to_editStatus, setaccess_to_editStatus] = useState(true);
    useEffect(() => {
        if (parsedData.user_management < 3) {
            setaccess_to_addDevice(false);
            if (parsedData.user_management < 2) {
                setaccess_to_editStatus(false);
            }

        }
    });


    return (
        <div className='bar'>
            <div className='status-bar'>
                <div className="device_mangement_main_content">
                    <div className="row_with_count_status">
                        <span className='module_tittle'>Device Management</span>
                        <div className='status-btns display-flex'>
                            <div className='btn-loc active-loc display-flex '> <div style={{ fontSize: "20px" }}>{isless_than_10_active ? `0${activeCount}` : `${activeCount}`}&nbsp;</div>Active</div>
                            <div className='btn-loc inactive-loc display-flex'><div style={{ fontSize: "20px" }}>{isgreater_than_10_inactive ? `0${inactiveCount}` : `${inactiveCount}`}&nbsp;</div> Inactive</div>
                        </div>
                    </div>

                    <div className='filters display-flex' >
                        <div className="pagination_with_filters">
                            <div class="pagination display-flex" onClick={handleDivClick}>
                                <div className="focus-page">
                                    <input
                                        // ref={inputRef}
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
                                    <div class="dropdown-filter" ref={dropdownRef1}>
                                        <div class="device_filters" onClick={dropdown1}>
                                            <div className="device_name">
                                                Device Name
                                            </div>
                                            <div className="dropdown_icon">
                                                <FontAwesomeIcon
                                                    icon={isDropdownOpen1 ? faChevronDown : faChevronUp}
                                                    className="dropdown-icon"
                                                />
                                            </div>
                                        </div>
                                        {isOpen1 && (
                                            <div className="dropdown_menu2 dashboard_dropdown-menu heights dropdown-colors ">
                                                {deviceName_data.map((data, index) => (
                                                    <div className='device_scroll' key={index}>
                                                        <div>
                                                            <div className='device_dropdown'>
                                                                <input
                                                                    className='device_sts_checkbox'
                                                                    type="checkbox"
                                                                    checked={data.device_name.trim() === selectedDevice}
                                                                    onChange={() => handleDeviceChange(data.device_name.trim())}
                                                                />
                                                                <div className="div_sts">{data.device_name}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div class="dropdown-filter" ref={dropdownRef3}>
                                        <div class="device_filters" onClick={dropdown3}>
                                            <div className="device_name">
                                                Device Status
                                            </div>
                                            <div className="dropdown_icon">
                                                <FontAwesomeIcon
                                                    icon={isDropdownOpen3 ? faChevronDown : faChevronUp}
                                                    className="dropdown-icon"
                                                />
                                            </div>
                                        </div>
                                        {isOpen3 && (
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
                                </div>
                            </div>
                        </div>
                        {access_to_addDevice && (
                            <div className='filters2 display-flex' onClick={handleclick}>
                                <button className='btn btn-fill'>Add Device</button>
                            </div>
                        )}
                    </div>
                    <div className='col-headings'>
                        <div className="col-head">Device Id</div>
                        <div className="col-head">Device Name</div>
                        <div className="col-head">Device Model</div>
                        <div className="col-head">Device installed on</div>
                        <div className="col-head">Device installed by</div>
                        <div className="col-head">Device status</div>
                        <div className="col-head">Device action</div>
                    </div>
                    <div className="scroll_div">
                        {alldata.map((data, index) => (
                            <div className="datas skeleton-block">
                                <div className="col-head" key={index}>{data.device_id}</div>
                                <div className="col-head" key={index}>{data.device_name}</div>
                                <div className="col-head" key={index}>{data.device_model}</div>
                                <div className="col-head" key={index}>{data.last_updated_on}</div>
                                <div className="col-head">ritchard</div>

                                <div className="col-head display-flex">
                                    <FontAwesomeIcon icon={faDiamond} style={{ color: data.device_status === 1 ? 'green' : 'red', paddingTop: '7px' }} size="xs" />
                                    <div className={`device_active`} style={{ color: data.device_status === 1 ? 'green' : 'red' }}>{data.device_status === 1 ? 'Active' : 'Inactive'}</div>
                                </div>
                                <div className="col-head display-flex device_action_dropdown_parent">
                                    <div className="sts_icon" onClick={() => access_to_editStatus && handleIconClick(index)}>
                                        <Icon icon={ic_label_important} style={{ transform: rotatedIndex === index ? 'rotate(90deg)' : 'rotate(0)', color: rotatedIndex === index ? '#08c6cd' : 'lightgray', }} className='device_content_arrow' size={25} />
                                    </div>
                                    <div key={index}>{(rotatedIndex === index && data.device_status === 1) &&
                                        (<div className='device_action_dropdown'>
                                            <div className='display-flex device_action_dropdown1 dropdown_action'>
                                                <FontAwesomeIcon className='device_content_arrows' icon={faAnglesDown} size='lg' />
                                                <div className='device_content_dropdown display-flex' onClick={() => Device_edit_page(data)}>Edit Detials</div>
                                            </div>
                                            <div className='display-flex device_action_dropdown2 dropdown_action'>
                                                <FontAwesomeIcon icon={faAnglesDown} className='device_content_arrows' size='lg' />
                                                <div className='device_content_dropdown display-flex' onClick={() => { Editinactivedata(data, index) }}>Inactivate Device</div>
                                            </div>
                                        </div>)}
                                    </div>
                                    <div key={index}>{(rotatedIndex === index && data.device_status != 1) &&
                                        (<div className='device_action_dropdown'>
                                            <div className='display-flex device_action_dropdown1 dropdown_action'>
                                                <FontAwesomeIcon className='device_content_arrows' icon={faAnglesDown} size='lg' />
                                                <div className='device_content_dropdown display-flex' data-bs-toggle="modal" data-bs-target="#device_status_action" onClick={() => { get_device_data(index); get_device1_data(index); }}>Device Details</div>

                                            </div>
                                            <div className='display-flex device_action_dropdown2 dropdown_action'>
                                                <FontAwesomeIcon icon={faAnglesDown} className='device_content_arrows' size='lg' />
                                                <div className='device_content_dropdown display-flex' onClick={() => { Editactivedata(data, index) }}>Activate Device</div>
                                            </div>
                                        </div>)}
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                    <div className='device_bottom'>
                        <div className='device_export cursor-pointer'>
                            <div className='device_exports'>Export</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Device detials */}
            <div class="modal fade device_status_action" id="device_status_action" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="device_status_header">
                            <h5 class="modal-title" id="exampleModalLabel">EDIT DEVICE DETAILS
                            </h5>
                            {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div class="device_status_body">
                            <div className="dsa_row1">
                                <div className="dsa_1st_input">
                                    <label for="input1">Device Name</label>
                                    <div className="inputs-group">
                                        <span class="input-group-loc"><Icon icon={ic_label_important} size={20} style={{ color: "lightgray" }} /></span>
                                        <input type="text" value={device_name} class="form-control-loc" id="input1" />
                                    </div>
                                </div>
                                <div className="dsa_1st_input">
                                    <label for="input1">Client ID</label>
                                    <div className="inputs-group">
                                        <span class="input-group-loc"><Icon icon={ic_label_important} size={20} style={{ color: "lightgray" }} /></span>
                                        <input type="text" value={client_id} class="form-control-loc" id="input1" />
                                    </div>
                                </div>
                            </div>

                            <div className="dsa_row2">
                                <div className="dsa_2nd_input">
                                    <label for="input1">Device MAC Address</label>
                                    <div className="inputs-group">
                                        <span class="input-group-loc"><Icon icon={ic_label_important} size={20} style={{ color: "lightgray" }} /></span>
                                        <input type="text" value={device_mac_address} class="form-control-loc" id="input1" />
                                    </div>
                                </div>
                                <div className="dsa_2nd_input">
                                    <label for="input1">Firmware Version</label>
                                    <div className="inputs-group">
                                        <span class="input-group-loc"><Icon icon={ic_label_important} size={20} style={{ color: "lightgray" }} /></span>
                                        <input type="text" value={device_firmware_version} class="form-control-loc" id="input1" />
                                    </div>
                                </div>
                            </div>

                            <div className="dsa_row3">
                                <div className="dsa_3rd_input">
                                    <label for="input1">Device Model</label>
                                    <div className="inputs-group">
                                        <span class="input-group-loc"><Icon icon={ic_label_important} size={20} style={{ color: "lightgray" }} /></span>
                                        <input type="text" value={device_model} class="form-control-loc" id="input1" />
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
                                            <div id="updated_by_date">20 march 2023, 12:57</div>
                                        </div>
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

export default Device_content;