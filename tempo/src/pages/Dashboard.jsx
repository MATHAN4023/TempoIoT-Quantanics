import React, { useState, useRef, useEffect } from 'react';
// import line chart
import Linechart from '../charts/Linechart';
//import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon } from 'react-icons-kit';
import { ic_label_important } from 'react-icons-kit/md/ic_label_important';
//import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
//import 24 hrs time format from flatpickr
import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
import { io } from "socket.io-client";


//Dashboard page 
const Dashboard = () => {
    const [parameter, setParameter] = useState([]);
    const graph_len = sessionStorage.getItem('state_count');
    useEffect(() => {
        const get_parameter_fun = async () => {
            try {
                const parameter_response = await fetch('https://tempoiotapi.quantanics.in/get_parameters');
                const data = await parameter_response.json();
                const parameter_array = [];
                setParameter(parameter_array);
                for (let i = 0; i < data.length; i++) {
                    const element = [data[i].device_parameters];
                    let text = '';
                    const str = element[0];
                    // console.log(str);
                    for (let i = 0; i < str.length; i++) {
                        // console.log(i);
                        if (str[i] === '&') {
                            if (str[i + 1] !== '&' && i + 1 < str.length) {
                                parameter_array.push(text);
                                text = '';
                            } else {
                                text = '';
                            }
                            i++;
                        } else {
                            text = text + str[i];
                        }
                    }
                };

            } catch (error) {
                console.log("error : ", error);
            }
        };
        get_parameter_fun();
    }, []);
    //socket connection on the port 5000
    const socket = io('http://localhost:5000/');

    const dateTimePickerRef1 = useRef(null);
    const dateTimePickerRef2 = useRef(null);
    const [globalfilterstate, setglobalfilterstate] = useState(Array(100).fill(true));

    const globalfilterupdate = (newState) => {
        setglobalfilterstate(newState);
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} 00:00:00`;
    const [fromdate, setfromdate] = useState(formattedDate);
    const [todate, settodate] = useState("");




    useEffect(() => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const dateTimePicker1 = flatpickr(dateTimePickerRef1.current, {
            enableTime: true,
            time_24hr: true,
            dateFormat: "Y-m-d H:i:S",
            defaultDate: currentDate,
            onChange: handlefrom
        });
        return () => {
            dateTimePicker1.destroy();
        };
    }, []);
    const handlefrom = (selectedDates) => {
        if (selectedDates.length > 0) {
            const formattedDateTime = formatDateTime(selectedDates[0]);
            setfromdate(formattedDateTime);
        }
    };
    const formatDateTime = (dateTime) => {
        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getDate()).padStart(2, '0');
        const hours = String(dateTime.getHours()).padStart(2, '0');
        const minutes = String(dateTime.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:00`;
    };

    //to date useeffect
    useEffect(() => {
        const dateTimePicker2 = flatpickr(dateTimePickerRef2.current, {
            enableTime: true,
            time_24hr: true,
            dateFormat: "Y-m-d H:i:S",
            onChange: handleto
        });
        return () => {
            dateTimePicker2.destroy();
        };
    }, []);
    const handleto = (selectedDates) => {
        if (selectedDates.length > 0) {
            const formattedDateTime = formattoDateTime(selectedDates[0]);
            settodate(formattedDateTime);
            sethandlelive(false);
        }
    }
    const formattoDateTime = (dateTime) => {
        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getDate()).padStart(2, '0');
        const hours = String(dateTime.getHours()).padStart(2, '0');
        const minutes = String(dateTime.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:00`;
    };



    const [isOpen1, setIsOpen1] = useState(false);
    const [isDropdownOpen1_dashboard, setIsDropdownOpen1_dashboard] = useState(false);
    const dropdown1 = () => {
        setIsOpen1(!isOpen1);
        setIsDropdownOpen1_dashboard(!isDropdownOpen1_dashboard);
    };

    const [isOpen2, setIsOpen2] = useState(false);
    const [isDropdownOpen2_dashboard, setIsDropdownOpen2_dashboard] = useState(false);
    const dropdown2 = () => {
        setIsOpen2(!isOpen2);
        setIsDropdownOpen2_dashboard(!isDropdownOpen2_dashboard)
    };


    const [selectedOption1, setSelectedOption1] = useState('Device - Assert');
    const handleOptionClick1 = (option) => {
        setSelectedOption1(option);
        setIsOpen1(false);
    };

    //filter option to change the graph filter globally 
    const [globalfilter, setglobalfilter] = useState('Output Model');
    const handleOptionClick2 = (option) => {
        setglobalfilterstate(Array(100).fill(true))
        setglobalfilter(option);
        setIsOpen2(false);
    }


    //filters based on date
    const [handlelive, sethandlelive] = useState(false);
    const handleliveclick = ((fromdate) => {
        if (fromdate !== "") {
            sethandlelive(true)
        } else {
            sethandlelive(false)
        }
    })
    // empty space effects ...........
    const selectedref1 = useRef(null);
    const selected_option_down1 = (event) => {
        if (!selectedref1.current.contains(event.target)) {
            setIsOpen1(false);
            setIsDropdownOpen1_dashboard(false)
        }
    }
    useEffect(() => {
        document.addEventListener('click', selected_option_down1);
        return () => {
            document.removeEventListener('click', selected_option_down1);
        };
    }, []);

    const globalfilterref = useRef(null);
    const globalfilterref_empty_space = (event) => {
        if (!globalfilterref.current.contains(event.target)) {
            setIsOpen2(false)
            setIsDropdownOpen2_dashboard(false)
        }
    }
    useEffect(() => {
        document.addEventListener('click', globalfilterref_empty_space);
        return () => {
            document.removeEventListener('click', globalfilterref_empty_space);
        };
    }, [])

    return (
        <div className='dashboard_page'>
            <div class="modal fade boot-modals" id="export_data" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">EXPORT DATA</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="col-5">
                            <label for="input1">Choose File Type</label>
                            <div className="inputs-group">
                                <span class="input-group-loc"><Icon icon={ic_label_important} size={20} style={{ color: "lightgray" }} /></span>
                                <input type="text" class="form-control-loc" id="input1" />
                            </div>
                            <label for="input2">File Name</label>
                            <div className="inputs-group">
                                <span class="input-group-loc"><Icon icon={ic_label_important} size={20} style={{ color: "lightgray" }} /></span>
                                <input type="text" class="form-control-loc" id="input1" />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-loc active-loc">Export</button>
                            <button type="button" class="btn-loc inactive-loc" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='page'>
                <div className="dashboard_live page_top_box box-shadow">
                    <div className="dashboard_live_width">
                        <p className="dashboard_p display-flex">Dashboard Live</p>
                    </div>
                    <div className='dashboard_inputs display-flex'>


                        <div >
                            <button class="device_filters" onClick={dropdown1} ref={selectedref1}>
                                <div className="device_name">
                                    {selectedOption1}
                                </div>
                                <div className="dropdown_icon">
                                    <FontAwesomeIcon
                                        icon={isDropdownOpen1_dashboard ? faChevronDown : faChevronUp}
                                        className="dropdown-icon"
                                    />
                                </div>
                            </button>
                            {isOpen1 && (
                                <div class="dashboard_dropdown-menu dropdown_menu dropdown-colors">
                                    <a className="a-a"  ><input type='checkbox' className='checks' onClick={() => handleOptionClick1('ALL')}></input>ALL</a>
                                    <hr className='hrs'></hr>
                                    <a className="a-a" ><input type='checkbox' className='checks' onClick={() => handleOptionClick1('Device 1-Assert 1')}></input>Device 1-Assert 1</a>
                                    <hr className='hrs'></hr>
                                    <a className="a-a" ><input type='checkbox' className='checks' onClick={() => handleOptionClick1('Device 2-Assert 2')}></input>Device 2-Assert 2</a>
                                </div>
                            )}
                        </div>
                        <div>
                            <button class="device_filters" onClick={dropdown2} ref={globalfilterref}>
                                <div className="device_name">
                                    {globalfilter}
                                </div>
                                <div className="dropdown_icon">
                                    <FontAwesomeIcon
                                        icon={isDropdownOpen2_dashboard ? faChevronDown : faChevronUp}
                                        className="dropdown-icon"
                                    />
                                </div>
                            </button>
                            {isOpen2 && (
                                <div class="dashboard_dropdown-menu dropdown_menu dropdown-colors">
                                    <div className='device_dropdown' onClick={() => handleOptionClick2("All")}>
                                        <div className="div_sts">
                                            All
                                        </div>
                                    </div>
                                    {parameter.map((data, index) => (
                                        <div className='device_scroll' key={index}>
                                            <div>
                                                <div className='device_dropdown' key={index} onClick={() => handleOptionClick2(data)}>
                                                    <div className="div_sts">
                                                        {data}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div class="dropdown-filter">
                            <fieldset className='display-flex'>
                                <legend class="legend-top-form">From</legend>
                                <input type="text" ref={dateTimePickerRef1} class="dropdown-toggle device_filters" onChange={handlefrom} placeholder='yyyy-mm-dd 00:00:00'></input>
                            </fieldset>
                        </div>
                        <div class="dropdown-filter">
                            <fieldset className='display-flex'>
                                <legend class="legend-top-to">To</legend>
                                <input type="text" ref={dateTimePickerRef2} class="dropdown-toggle device_filters" onChange={handleto} placeholder='yyyy-mm-dd 00:00:00'></input>
                            </fieldset>
                        </div>
                        <div className='dropdown-filter'>
                            <button className='btn-loc2 border-radius' style={{ fontSize: "20px", textAlign: "center" }} onClick={() => { handleliveclick(fromdate) }}>Live</button>
                        </div>
                        <div className='border_arrow display-flex justify-align'>
                            <div className='icon1 display-flex justify-align'>
                                <Icon icon={ic_label_important} className='riarrow1' size={35} style={{ transform: 'rotate(90deg)' }} />
                            </div>
                            <div className='icon2 display-flex justify-align'>
                                <Icon icon={ic_label_important} className='riarrow2' size={35} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lineChart_body">
                    {(graph_len > 0) && (
                        <Linechart fromdate={fromdate} todate={todate} handlelive={handlelive} globalfilter={globalfilter} globalfilterstate={globalfilterstate} globalfilterupdate={globalfilterupdate} socket={socket} className="all_graph" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;