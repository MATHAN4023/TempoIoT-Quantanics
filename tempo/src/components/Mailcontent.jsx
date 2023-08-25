import React from "react";
import tempiot from '../assets/logo/tempiot.jpg';
import CryptoJS from 'crypto-js';


function Mailcontent({ email, Designation, siteid, first_name, last_name ,mailstate }) {

    const plainTexts = email;
    const secretKeys = 'edf6537e67f256578bbb90b2adb1617622d6cbe49702b832c99c6feb8cce817c';
    const encryptString = (plainTexts, secretKeys) => {
        const encrypted = CryptoJS.AES.encrypt(plainTexts, secretKeys).toString();
        const base64Encoded = btoa(encrypted);
        return base64Encoded;
    };
    const encryptedtext=encryptString(plainTexts,secretKeys)
    return (
        <div style={{ backgroundColor: "rgb(238, 236, 235)" }}>
            <div style={{ display: 'flex', flexDirection: 'row', height: "fit-content", backgroundColor: 'white', width: "70%", margin: '0 auto' }}>
                <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <header>
                            <img src={tempiot} style={{ width: "280px" }} alt="Logo" />
                        </header>
                        <div>
                            <h1 style={{ textAlign: 'left', marginLeft: "10px" }}>We are excited to have you onboard!</h1>
                            <h3 style={{ textAlign: 'left', marginLeft: "10px" }}>Dear {first_name} {last_name},</h3>
                            <p style={{ textAlign: 'left', marginLeft: "10px", whiteSpace: "wrap", wordSpacing: "5px" }}>
                                Congratulations on your successful account creation with us! We are delighted
                                to have you onboard and are excited to provide you with a seamless and enjoyable experience.
                            </p>
                            <p style={{ fontWeight: 'bold', textAlign: 'left', marginLeft: "10px", lineHeight: "1" }}>Site Name: {siteid}</p>
                            <p style={{ fontWeight: 'bold', textAlign: 'left', marginLeft: "10px", lineHeight: "1" }}>Role: {Designation}</p>
                            <p style={{ fontWeight: 'bold', textAlign: 'left', marginLeft: "10px" }}>Username: {email}</p>
                            { mailstate &&(
                                <a href={`https://tempoiot.quantanics.in/NewPassword/${encryptedtext}`} style={{ textDecoration: 'none', color: 'white', display: 'block', textAlign: 'left', backgroundColor: 'rgb(92, 36, 145)', border: '1px solid black', padding: '8px 16px', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', width: '110px', marginLeft: "10px" }}>Set Password!</a>
                            )}
                            <p style={{ textAlign: 'left', marginTop: '10px', marginLeft: "10px", lineHeight: "0.5" }}>Please Note:</p>
                            <p style={{ textAlign: 'left', marginLeft: "10px", wordSpacing: "5px" }}>
                                Quantanics Techserv pvt ltd will never send you an email for your Login Credential.
                                Please do not respond to any email requesting such information.
                            </p>
                            <p style={{ textAlign: 'left', marginLeft: "10px" }}>
                                Warm Regards,<br />
                                Quantanics Techserv
                            </p>
                        </div>
                        <footer style={{ width: "100%" }}>
                            <p style={{ backgroundColor: 'rgb(92, 92, 232)', color: 'white', padding: "20px", height: "fit-content" }}>
                                {'\u00A0'}*** This message is intended only for the person or entity to which it is addressed and may contain confidential and/or
                                privileged information. If you have received this message in error, please notify the sender immediately and
                                delete this message from your system ***
                            </p>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mailcontent;