import sketch1 from '../assets/logo/sketch1.jpeg';
import sketch2 from '../assets/logo/sketch2.jpeg';
import Logo from '../assets/logo/tempiot.jpg';
import Qr_code from '../assets/logo/Qr.png';
import { useState } from 'react';

const Login = ({ onLogin, onSelectsite, handleLogout }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalid_state, setinvalidstate] = useState(false);
    const [inactive_user, setinactive_user] = useState(false);
    const [inactive_site, setinactive_site] = useState(false);
    const [username_empty, setusername_empty] = useState(false);
    const [password_empty, setpassword_empty] = useState(false);


    const handleUserName = (event) => {
        const Username = event.target.value;
        setUsername(Username);
        setusername_empty(false)
    };
    const handlepassword = (event) => {
        const password = event.target.value;
        setPassword(password)
        setpassword_empty(false)
    }

    const validate_login = async () => {
        if (username === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
            setinactive_user(false);
            setinvalidstate(false);
            setinactive_site(false)
            setusername_empty(true)
        } else if (password == "") {
            setinactive_user(false);
            setinvalidstate(false);
            setinactive_site(false)
            setpassword_empty(true)
        }
        else {
            const body = { username, password }
            body.username = body.username.trim();
            body.password = body.password.trim();
            try {
                const response = await fetch('https://tempoiotapi.quantanics.in/validate_login', {
                    method: "POST",
                    headers: { "content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                const result = await response.json();
                if (result['status'] === true) {
                    setinvalidstate(false)
                    if (result['data']['status'] === '1') {
                        setinactive_user(false)
                        sessionStorage.setItem('access_control', JSON.stringify(result.data))
                        const role = result.data.role_id;
                        const data = await fetch('https://tempoiotapi.quantanics.in/admin')
                        const res = await data.json();
                        const name1=JSON.stringify(res);
                        sessionStorage.setItem('siteNames', name1);
                        if (role == 'RI001' || role == 'RI002') {
                            try {
                                const resJSONString = JSON.stringify(res);
                                sessionStorage.setItem('site_db', resJSONString);
                                onSelectsite(res)
                                onLogin(role)
                            } catch (error) {
                                console.log(error)
                            }
                        }
                        else {
                            if (result['data']['site_id'].includes(",")) {
                                const values1 = result['data']['site_id'].split(",").map((item) => (item.trim()));
                                {
                                    res.map((valuees) => {
                                        values1.forEach(element => {
                                            if (valuees.site_id === element) {
                                                if (valuees.site_status != '1') {
                                                    alert(`Your Site ${valuees.site_id} is Inactive`)
                                                    const index = values1.indexOf(valuees.site_id);
                                                    if (index !== -1) {
                                                        values1.splice(index, 1);
                                                    }
                                                } else {
                                                    //nothing
                                                }
                                            }
                                        });
                                    })
                                }
                                const updated_site_id = values1.length > 0 ? values1.join(",") : '';
                                if (updated_site_id != '') {
                                    setinactive_site(false);
                                    const corresponding_db = updated_site_id;
                                    const resJSONString = JSON.stringify(corresponding_db);
                                    sessionStorage.setItem('site_db', resJSONString);
                                    onSelectsite(corresponding_db)
                                    onLogin(role)
                                } else {
                                    setinactive_site(true);
                                    handleLogout();
                                }

                            } else {
                                res.map((valuees) => {
                                    if (valuees.site_id === result['data']['site_id']) {
                                        if (valuees.site_status === '1') {
                                            setinactive_site(false)
                                            const corresponding_db = result['data']['site_id'];
                                            const resJSONString = JSON.stringify(corresponding_db);
                                            sessionStorage.setItem('site_db', resJSONString);
                                            onSelectsite(corresponding_db)
                                            onLogin(role)
                                        } else {
                                            setinactive_site(true)
                                            handleLogout();
                                        }
                                    }
                                })
                            }
                        }
                    } else {
                        setinactive_user(true)
                    }
                } else {
                    setinvalidstate(true)
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        }

    }

    return (
        <>
            <div className='content'>
                <div className='digital_scan'>
                    <div className="TempoIot">TempoIoT</div>
                    <div className="ds">digital Simplified</div>
                    <img src={Qr_code} style={{ height: '100px', width: '100px' }} alt="Qr" />
                    <div className="para">It's beginning of machines taking over the world</div>
                    <div className="powered_by">
                        Powered by <span className="Quantanics">Quantanics</span>
                    </div>
                </div>
                <div className='login_inputs'>
                    <div className="all_inputs">
                        <div className="logo">
                            <img src={Logo} alt="Logo" />
                        </div>
                        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                            <div className='login_input_div'>
                                <input type="text" placeholder='Email' className='login_inputs_individual' value={username} onChange={handleUserName} />
                                <div className="login_error-message">{username_empty && "Enter Valid Email*"}</div>
                            </div>
                            <div className='login_input_div'>
                                <input type="password" placeholder='Password' className='login_inputs_individual' value={password} onChange={handlepassword} />
                                <div className="login_error-message">{password_empty && "Enter Valid Password*"}</div>
                            </div>
                        </div>
                        <div className='error_forgot display-flex'>
                            <div className=' error_msg_login'>
                                {invalid_state && (
                                    <span className='display-flex' style={{ justifyContent: "start" }}>*Invalid Credentials</span>
                                )}
                                {inactive_user && (
                                    <span className='display-flex' style={{ justifyContent: "start" }}>*Inactive User</span>
                                )}
                                {inactive_site && (
                                    <span className='display-flex' style={{ justifyContent: "start" }}>*Inactive Site</span>
                                )}
                            </div>
                            <div className="forget">
                                <span className='display-flex' style={{ justifyContent: "end" }}>Forgot Password</span>
                            </div>
                        </div>
                        <div className="login_btn_div">
                            <input type="submit" className='login_btn' value={"Login"} onClick={validate_login} />
                        </div>
                    </div>

                </div>
            </div>
            <div className='sketch_images'>
                <img src={sketch1} alt="sketch1" className='sketch1' />
                <img src={sketch2} alt="sketch2" className='sketch2' />
            </div>
        </>
    )
}
export default Login;