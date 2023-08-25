import React, { useEffect, useRef, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import tempiot from './assets/logo/tempiot.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const TopNavbar = ({ site, apphandlesite }) => {
  const location = useLocation();
  const name1 = sessionStorage.getItem('siteNames');
  const siteNames = JSON.parse(name1);
  const [selectsite, setselectsite] = useState(false);
  const defaultValue = 'SELECT SITE';
  const storedData = sessionStorage.getItem('session_dbName');

  const [displaysite, setdisplaysite] = useState(storedData ? storedData : defaultValue);
  const boolean1 = sessionStorage.getItem('boolean');

  const boolean = JSON.parse(boolean1);
  const [showsite, setshowsite] = useState(boolean);
  const [showsite_child, setshowsite_child] = useState(boolean)

  const navigate = useNavigate();
  const handlesite = () => {
    setselectsite(!selectsite)
    const dropdownContent = document.getElementsByClassName('top-nav-dropdown');
    if (dropdownContent.style.display === "none") {
      dropdownContent.style.display = "block";
    } else {
      dropdownContent.style.display = "none";
    }
  }

  useEffect(() => {
    if (showsite === true) {
      if (location.pathname.toLowerCase().startsWith('/user') || location.pathname.toLowerCase().startsWith('/site')) {
        setshowsite_child(false)
      }
      else {
        setshowsite_child(true)
      }
    }


  }, [location.pathname]);

  const getTypeOfSiteValue = (site) => {
    if (typeof site === "string") {
      if (site.includes(",")) {

        const values = site.split(",").map((item) => ({ site_id: item.trim() }));
        const filteredSiteNames = siteNames.filter((siteName) => {
          return values.some((value) => value.site_id === siteName.site_id);
        }).map((filteredSiteName) => {
          return {
            site_id: filteredSiteName.site_id,
            site_name: filteredSiteName.site_name
          };
        });
        return {
          type: "multiple",
          value: filteredSiteNames,
        };
      } else {
        const matchedSite = siteNames.find((siteName) => siteName.site_id === site.trim());
        return {
          type: "single",
          value: site.trim(),
          name: matchedSite.site_name,
        };
      }
    } else if (Array.isArray(site)) {
      if (site.every((item) => typeof item === "object" && item.hasOwnProperty("site_id"))) {
        return {
          type: "object",
          value: site,
        };
      }
    }
    return {
      type: "error",
    };
  };

  const sitevalue = getTypeOfSiteValue(site);
  sessionStorage.setItem('site_user_type', JSON.stringify(sitevalue))

  const handlesitevalue = (sitevalue) => {
    if (sitevalue.type === "single") {
      
      const show = `${sitevalue.value} - ${sitevalue.name}`
      setdisplaysite(show)
      apphandlesite(sitevalue.value)
      sessionStorage.removeItem('session_dbName');
      sessionStorage.setItem('session_dbName', show)
      fetch(`https://tempoiotapi.quantanics.in/source_db/${sitevalue.value}`);
      const getdevicelength = async () => {
        const response = await fetch(`https://tempoiotapi.quantanics.in/user`);
        const data = await response.json();
        const datalen = data.filter(item => item.device_status === 1);
        sessionStorage.setItem('state_count', datalen.length)
      }
      getdevicelength();
      navigate(`/Device/${sitevalue.value}`);
    }

    else {
      // sessionStorage.removeItem('session_dbName');
    }

  }

  const handlesitevalue1 = async (data) => {
    if (sitevalue.type === "multiple" || sitevalue.type === "object") {
      setselectsite(false)
      const show = `${data.site_id} - ${data.site_name}`
      setdisplaysite(show)
      apphandlesite(data.site_id)
      sessionStorage.removeItem('session_dbName');
      sessionStorage.setItem('session_dbName', show)
      try {
        const res = await fetch(`https://tempoiotapi.quantanics.in/source_db/${data.site_id}`);
        const response = await res.json();
        getdevicelength();
        const getdevicelength = async () => {
          const response = await fetch(`https://tempoiotapi.quantanics.in/user`);
          const data = await response.json();
          const datalen = data.filter(item => item.device_status === 1);
          sessionStorage.setItem('state_count', datalen.length)
        }
        if (response) {
          if (location.pathname.startsWith('/Device')) {
            navigate(`/Device/${data.site_id}`);
          } else {
            navigate(location.pathname);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    else {
      // localStorage.removeItem('userType');
    }
  }
  const site_dropdown = useRef(null);
  const emptySpace_site_dropdown = (event) => {
    if (!site_dropdown.current.contains(event.target)) {
      setselectsite(false);
    }
  }

  useEffect(() => {
    handlesitevalue(sitevalue)
    document.addEventListener('click', emptySpace_site_dropdown);
    return () => {
      document.removeEventListener('click', emptySpace_site_dropdown);
    };
  }, []);

  return (
    <nav className='top-nav flex-class align-center'>
      {/* Product Logo */}
      <div className='navbar_mar mar-left'>
        <img src={tempiot} alt="TempoIoT Logo" width="140" height="45" />
      </div>
      {/* Site Dropdown */}
      {(showsite && showsite_child) &&
        <div style={{ marginRight: "10px", width: "170px" }} ref={site_dropdown}>
          <div className='site-dropdown  flex-class cursor-pointer' onClick={sitevalue.type === "single" ? null : handlesite} >
            <div className='rm-pd-mr'>{displaysite}</div>
            <div className='dropdown-arrow'><FontAwesomeIcon icon={faChevronDown} /></div>
          </div>
          {selectsite && <div className='top-nav-dropdown'>
            {sitevalue.type != "single" &&
              sitevalue.value.map((data, index) => (
                <div key={index} className='device_dropdown site_drop_down' onClick={() => handlesitevalue1(data)}>
                  <div >
                    {data.site_id} - {data.site_name}
                  </div>
                </div>
              ))}
          </div>}
        </div>
      }
    </nav>
  );
};

export default TopNavbar;