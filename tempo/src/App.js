import React, { useEffect, useState } from 'react';
import './assets/style/App.css'
import './assets/style/main.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import Device from './pages/Device.jsx';
import Site from './pages/Site.jsx';
import Add_device from './pages/Add_device';
import Edit_device from './pages/Edit_device';
import Edit_site from './pages/Edit_site';
import Add_site from './pages/Add_site';
import Assert_Management from './pages/Assert_Management.js'
import Alert_Management from './pages/Alert_Management';
import Modbus_Slave from './pages/Modbus_Slave'
import Modbus_Master from './pages/Modbus_Master'
import User from './pages/User'
import Alert from './pages/Alert'
import NewPassword from './pages/NewPassword';
// Main Content Template
import Login from './pages/Login';
import TopNavbar from './TopNavbar';
import Add_user from './pages/Add_user';
import Edit_user from './pages/Edit_user';
import Loading from "./components/Loading";

var storedData;

const App = () => {
  const [parsedData, setParsedData] = useState(null);
  var userSidebarConfig = {
    RI001: {
      routes: [
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/Assert_Management', element: <Assert_Management /> },
        { path: '/Alert_Management', element: <Alert_Management /> },
        { path: '/Device/:site_id_check', element: <Device /> },
        { path: '/Site', element: <Site /> },
        { path: '/User', element: <User /> },
        { path: '/Alert', element: <Alert /> },
        { path: '/Modbus_Slave', element: <Modbus_Slave /> },
        { path: '/Modbus_Master', element: <Modbus_Master /> },
        { path: '/Event', element: <Modbus_Master /> },
        { path: '/Device_Connection', element: <Modbus_Master /> },
        { path: '/Real_Data', element: <Modbus_Master /> },

        { path: '/Device/Add_device', element: <Add_device /> },
        { path: '/Site/Add_site', element: <Add_site /> },
        { path: '/User/Add_user', element: <Add_user /> },

        { path: '/Device/edit_device/:r_no', element: <Edit_device /> },
        { path: '/Site/edit_site/:site_id', element: <Edit_site /> },
        { path: '/User/Edit_user/:user_id', element: <Edit_user /> },

      ],
    },
    RI002: {
      routes: [

        { path: '/dashboard', element: <Dashboard />, show: parsedData ? parsedData.dashboard != '0' : true },
        { path: '/Assert_Management', element: <Assert_Management /> },
        { path: '/Alert_Management', element: <Alert_Management /> },
        { path: '/Device/:site_id_check', element: <Device />, show: parsedData ? parsedData.device_management != '0' : true },
        { path: '/Site', element: <Site />, show: parsedData ? parsedData.site_management != '0' : true },
        { path: '/User', element: <User />, show: parsedData ? parsedData.user_management != '0' : true },

        { path: '/Alert', element: <Alert /> },
        { path: '/Modbus_Slave', element: <Modbus_Slave /> },
        { path: '/Modbus_Master', element: <Modbus_Master /> },
        { path: '/Event', element: <Modbus_Master /> },
        { path: '/Device_Connection', element: <Modbus_Master /> },
        { path: '/Real_Data', element: <Modbus_Master /> },

        { path: '/Device/Add_device', element: <Add_device />, show: parsedData ? parsedData.device_management != '0' : true },
        { path: '/Site/Add_site', element: <Add_site />, show: parsedData ? parsedData.site_management != '0' : true },
        { path: '/User/Add_user', element: <Add_user />, show: parsedData ? parsedData.user_management != '0' : true },

        { path: '/Device/edit_device/:r_no', element: <Edit_device />, show: parsedData ? parsedData.device_management != '0' : true },
        { path: '/Site/edit_site/:site_id', element: <Edit_site />, show: parsedData ? parsedData.site_management != '0' : true },
        { path: '/User/Edit_user/:user_id', element: <Edit_user />, show: parsedData ? parsedData.user_management != '0' : true },

      ],
    },
    RI003: {
      routes: [
        { path: '/dashboard', element: <Dashboard />, show: parsedData ? parsedData.dashboard != '0' : true },
        { path: '/Assert_Management', element: <Assert_Management /> },
        { path: '/Alert_Management', element: <Alert_Management /> },
        { path: '/Device/:site_id_check', element: <Device />, show: parsedData ? parsedData.device_management != '0' : true },
        { path: '/User', element: <User />, show: parsedData ? parsedData.user_management != '0' : true },

        { path: '/Alert', element: <Alert /> },
        { path: '/Modbus_Slave', element: <Modbus_Slave /> },
        { path: '/Modbus_Master', element: <Modbus_Master /> },
        { path: '/Event', element: <Modbus_Master /> },
        { path: '/Device_Connection', element: <Modbus_Master /> },
        { path: '/Real_Data', element: <Modbus_Master /> },

        { path: '/Device/Add_device', element: <Add_device /> },

        { path: '/User/Add_user', element: <Add_user />, show: parsedData ? parsedData.user_management != '0' : true },

        { path: '/Device/edit_device/:r_no', element: <Edit_device />, show: parsedData ? parsedData.device_management != '0' : true },
        { path: '/User/Edit_user/:user_id', element: <Edit_user />, show: parsedData ? parsedData.user_management != '0' : true },

      ],
    },
    RI004: {
      routes: [
        { path: '/dashboard', element: <Dashboard />, show: parsedData ? parsedData.dashboard != '0' : true },
        { path: '/Assert_Management', element: <Assert_Management /> },
        { path: '/Alert_Management', element: <Alert_Management /> },
        { path: '/Device/:site_id_check', element: <Device />, show: parsedData ? parsedData.device_management !== "0" : true },
        { path: '/User', element: <User />, show: parsedData ? parsedData.user_management != '0' : true },

        { path: '/Alert', element: <Alert /> },
        { path: '/Modbus_Slave', element: <Modbus_Slave /> },
        { path: '/Modbus_Master', element: <Modbus_Master /> },
        { path: '/Event', element: <Modbus_Master /> },
        { path: '/Device_Connection', element: <Modbus_Master /> },
        { path: '/Real_Data', element: <Modbus_Master /> },


        { path: '/Device/Add_device', element: <Add_device />, show: parsedData ? parsedData.device_management != '0' : true },
        { path: '/User/Add_user', element: <Add_user />, show: parsedData ? parsedData.user_management != '0' : true },

        { path: '/Device/edit_device/:r_no', element: <Edit_device />, show: parsedData ? parsedData.device_management != '0' : true },
        { path: '/User/Edit_user/:user_id', element: <Edit_user />, show: parsedData ? parsedData.user_management != '0' : true },

      ],
    },
  };

  const local1 = sessionStorage.getItem('site_db');
  const local = JSON.parse(local1);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [site, setsite] = useState(local);
  const [sitevalue, setsitevalue] = useState(local);

  const handleLogin = (role) => {
    storedData = sessionStorage.getItem('access_control');
    const parsedAccessData = JSON.parse(storedData);
    setParsedData(parsedAccessData)
    setUserType(role);
    sessionStorage.setItem('userType', role);
  };
  const handleLogout = () => {
    setUserType(null);
    setsitevalue(null);
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('session_dbName');
    sessionStorage.removeItem('access_control');
    sessionStorage.removeItem('state_count');
  };
  const handlemultiplesite = (res) => {
    setsite(res);
    if (typeof res === "string") {
      if (res.includes(",")) {
        const myBooleanValue = true;
        sessionStorage.setItem('boolean', JSON.stringify(myBooleanValue))
      } else {
        const myBooleanValue = false;
        sessionStorage.setItem('boolean', JSON.stringify(myBooleanValue))
      }
    } else {
      const myBooleanValue = true;
      sessionStorage.setItem('boolean', JSON.stringify(myBooleanValue))
    }
  }
  const Apphandlesite = (value) => {
    setsitevalue(value);
  }

  useEffect(() => {
    const storedUserType = sessionStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType);
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);

  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/NewPassword/:encryptedtext" element={<NewPassword />} />
      </Routes>
      {loading ? (
        <h1><Loading /></h1>
      ) : (
        <>
          {userType ? (
            <>
              {sitevalue ? (<>
                <TopNavbar site={site} apphandlesite={Apphandlesite} />
                <Sidebar give_auth={userType} handleLogout={handleLogout}>
                  <Routes>
                    {userSidebarConfig[userType].routes.map((route, index) => (
                      (route.show === undefined || route.show) && (
                        <Route key={index} path={route.path} element={route.element} />
                      )
                    ))}
                  </Routes>
                </Sidebar>
              </>) : (<>
                <TopNavbar site={site} apphandlesite={Apphandlesite} />
                <Sidebar give_auth={userType} handleLogout={handleLogout}>
                  <Routes>
                    <Route path='/User' element={<User />}></Route>
                    <Route path='/User/Add_user' element={<Add_user />}></Route>
                    <Route path='/User/Edit_user/:user_id' element={<Edit_user />}></Route>
                    <Route path='/Site' element={<Site />}></Route>
                    <Route path='/Site/Add_site' element={<Add_site />}></Route>
                    <Route path='/Site/edit_site/:site_id' element={<Edit_site />}></Route>
                  </Routes>
                </Sidebar>
              </>)}

            </>
          ) : (
            <Login onLogin={handleLogin} onSelectsite={handlemultiplesite} handleLogout={handleLogout} />
          )}
        </>
      )}
    </BrowserRouter>
  );

};

export default App;