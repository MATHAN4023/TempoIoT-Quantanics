import sketch1 from '../assets/logo/sketch1.jpeg'
import sketch2 from '../assets/logo/sketch2.jpeg'
import Logo from '../assets/logo/tempiot.jpg'
import Qr_code from '../assets/logo/Qr.png'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const NewPassword = () => {
    const navigate=useNavigate();
    const [newpassword,setnewpassword]=useState("");
    const [confirmpassword,setconfirmpassword]=useState("");
    const { encryptedtext } = useParams();

    const secretKeys = 'edf6537e67f256578bbb90b2adb1617622d6cbe49702b832c99c6feb8cce817c';
    const decryptString = (encryptedBase64, secretKeys) => {
        const encrypted = atob(encryptedBase64); 
        const decrypted = CryptoJS.AES.decrypt(encrypted, secretKeys);
        const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
        return plaintext;
    };
    const decryptedtext=decryptString(encryptedtext,secretKeys)

    useEffect(() => {
        fetch(`https://tempoiotapi.quantanics.in/get-password?username=${decryptedtext}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.password) {
              alert("password already set,Back to Login");
              navigate('/')
            } else {
             //ok
            }
          })
          .catch((error) => console.error('Error fetching data', error));
      }, []);
   

    const handlenewpassword=(event)=>{
        setnewpassword(event.target.value)
    }
    const handleconfirmpassowrd=(event)=>{
        setconfirmpassword(event.target.value)
    }

    const handlesubmit=()=>{
        if(newpassword==="" || confirmpassword===""){
            alert("pssword empty")
        }
        else if(newpassword===confirmpassword){
            const body={newpassword,decryptedtext};
            fetch('https://tempoiotapi.quantanics.in/updatepassword',{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })
            alert("Password Set Successfully.Back to Login")
            navigate('/')
        }
        else{
            alert("password not match")
        }
    }

    return (
        <div style={{marginTop:"50px"}}>
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
                        <input type="text" placeholder='New Password' className='login_inputs_individual' onChange={handlenewpassword}  />
                        <input type="password" placeholder='Confirm Password' className='login_inputs_individual' onChange={handleconfirmpassowrd}  />
                        <div className="login_btn_div">
                            <input type="submit" className='login_btn' value={"Submit"}  onClick={handlesubmit} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='sketch_images'>
                <img src={sketch1} alt="sketch1" className='sketch1' />
                <img src={sketch2} alt="sketch2" className='sketch2' />
            </div>
        </div>
    )
}
export default NewPassword;