import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function Alert() {
    return (
        <>
            <div className="row_with_count_status">
                <span className='module_tittle'>Alert</span>
                <div className='status-btns display-flex'>
                    <div className='btn-loc active-loc display-flex '> Active</div>
                    <div className='btn-loc inactive-loc display-flex'>Inactive</div>
                </div>
            </div>
            <div className="row_with_filters">
                <div class="pagination display-flex">
                    <div className="focus-page">
                        <input
                            // ref={inputRef}
                            type="number"
                            value={1}
                            // onChange={handleInputChange}
                            // onBlur={handleInputBlur}
                            autoFocus
                            className='editable_input_box'
                        />

                    </div>
                    <div className="upcomming-pages">
                        of 20 pages
                    </div>
                </div>


                {/* edit the filters */}
                <div className="dropdown-filter">
                    <div className="device_filters">
                        <div className="device_name">
                            Device ID
                        </div>
                        <div className="dropdown_icon">
                            <FontAwesomeIcon
                                // icon={isDropdownOpen1 ? faChevronDown : faChevronUp}
                                icon={faChevronDown}
                                className="dropdown-icon"
                            />
                        </div>
                    </div>
                </div>
                <div className="dropdown-filter">
                    <div className="device_filters">
                        <div className="device_name">
                            Alert Category
                        </div>
                        <div className="dropdown_icon">
                            <FontAwesomeIcon
                                // icon={isDropdownOpen1 ? faChevronDown : faChevronUp}
                                icon={faChevronDown}
                                className="dropdown-icon"
                            />
                        </div>
                    </div>
                </div>
                <div className="dropdown-filter">
                    <div className="device_filters">
                        <div className="device_name">
                            Alert Types
                        </div>
                        <div className="dropdown_icon">
                            <FontAwesomeIcon
                                // icon={isDropdownOpen1 ? faChevronDown : faChevronUp}
                                icon={faChevronDown}
                                className="dropdown-icon"
                            />
                        </div>
                    </div>
                </div>

            </div>
            <div className="row_with_column_headings">
                <div className="col-head uppercase">Alert ID</div>
                <div className="col-head uppercase">Device Name</div>
                <div className="col-head uppercase">Device Model</div>
                <div className="col-head uppercase">Device ID</div>
                <div className="col-head uppercase">Value</div>
                <div className="col-head uppercase">alert type</div>
                <div className="col-head uppercase">updated by</div>
                <div className="col-head uppercase">alert category</div>
                <div className="col-head uppercase">notes</div>
            </div>
        </>
    )

}
export default Alert;