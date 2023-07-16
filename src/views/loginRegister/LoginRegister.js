import './LoginRegister.css';
import Logo from '../../assets/imgs/2.png'
import axios from 'axios';
import config from '../../config.js'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
const instance = axios.create({
    baseURL: config.baseURL,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

function LoginRegister() {

    useEffect(() => {
    }, []);

    const [registerOn, setRegisterOn] = useState(false)
    function changeRegister(){
        registerOn ? setRegisterOn(false):setRegisterOn(true)
        console.log(registerOn)
    }
    return (
        <>
            <div className="Nav">
                <div className='LogoContainer'>
                    <img className='Logo' src={Logo} />
                    <span style={{ marginLeft: 10 }} className="NameApp">NewMedium</span>
                </div>
                <div>
                    <Link to="/"> <button className='ButtonPadrao'>Home</button></Link>
                </div>
            </div>


            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                <div  style={registerOn == true ? {   transform: `rotateY(180deg)`  } : {}} className='ContainerLoginRegister'>
                    <div className='Backgound'>

                    </div>
                    <div className='Login'>
                        <h1>SingIn</h1>

                        <label className='LabelPadrao'>email</label>
                        <input className='InputPadrao' type='text' />

                        <label className='LabelPadrao'>password</label>
                        <input className='InputPadrao' type='text' />
                        <button className='Button ButtonLogin'>SingIn</button>
                        <h3>Not have an account yet? <div onClick={() => changeRegister()} className='LinkToRegister'>Register</div></h3>
                    </div>
                    <div className='Register'>
                        <h1>Create Account</h1>

                        <label className='LabelPadrao'>name</label>
                        <input className='InputPadrao' type='text' />

                        <label className='LabelPadrao'>surname</label>
                        <input className='InputPadrao' type='text' />

                        <label className='LabelPadrao'>email</label>
                        <input className='InputPadrao' type='text' />

                        <label className='LabelPadrao'>password</label>
                        <input className='InputPadrao' type='text' />

                        <label className='LabelPadrao'>confirma password</label>
                        <input className='InputPadrao' type='text' />

                        <button className='ButtonRegister'>Register</button>
                        <h3>Have a account? <div onClick={() => setRegisterOn(false)} className='LinkToRegister'>SingIn</div></h3>
                    </div>
                </div>
            </div >

        </>
    );
}

export default LoginRegister;