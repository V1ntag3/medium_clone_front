import './LoginRegister.css';
import axios from 'axios';
import config from '../../config.js'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validarEmail, validarSenha, validarTextoEmBranco } from '../../validators.js'
import NavBar from '../components/NavBar';
import Input from '@mui/material/Input';

import IconButton from '@mui/material/IconButton';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';

function LoginRegister() {

    const navigate = useNavigate()
    // variaveis do login
    const [emailLogin, setEmailLogin] = useState("")
    const [passwordLogin, setPasswordLogin] = useState("")
    const [showPasswordLogin, setShowPasswordLogin] = useState(false)

    // variaveis do registro
    const [nameRegister, setNameRegister] = useState("")
    const [surnameRegister, setSurnameRegister] = useState("")
    const [emailRegister, setEmailRegister] = useState("")
    const [passwordRegister, setPasswordRegister] = useState("")
    const [showPasswordRegister, setShowPasswordRegister] = useState(false)

    const [confirmPasswordRegister, setConfirmPasswordRegister] = useState("")
    const [showConfPasswordRegister, setShowConfPasswordRegister] = useState(false)

    // variaveis do login
    const [emailLoginError, setEmailLoginError] = useState("")
    const [passwordLoginError, setPasswordLoginError] = useState("")
    const [naoCadasError, setNaoCadasError] = useState(false)

    // variaveis do registro
    const [nameRegisterError, setNameRegisterError] = useState(false)
    const [surnameRegisterError, setSurnameRegisterError] = useState(false)
    const [emailRegisterError, setEmailRegisterError] = useState(false)
    const [passwordRegisterError, setPasswordRegisterError] = useState(false)
    const [confirmPasswordRegisterError, setConfirmPasswordRegisterError] = useState(false)
    const [cadasError, setCadasError] = useState(false)

    const [registerOn, setRegisterOn] = useState(false)
    function changeRegister() {
        registerOn ? setRegisterOn(false) : setRegisterOn(true)
        setTimeout(() => {
            setEmailLogin('')
            setEmailLoginError(false)
            setPasswordLogin('')
            setPasswordLoginError(false)
            setNameRegister('')
            setNameRegisterError(false)
            setSurnameRegister('')
            setSurnameRegisterError(false)
            setEmailRegister('')
            setEmailRegisterError(false)
            setPasswordRegister('')
            setPasswordRegisterError(false)
            setConfirmPasswordRegister('')
            setConfirmPasswordRegisterError(false)
            setNaoCadasError(false)
            setCadasError(false)
        }, 400);

    }

    function login(event) {
        event.preventDefault();

        setEmailLoginError(validarEmail(emailLogin) || validarTextoEmBranco(emailLogin) ? true : false)
        setPasswordLoginError(validarTextoEmBranco(passwordLogin) || validarSenha(passwordLogin) ? true : false)
        setNaoCadasError(false)
        if (!emailLoginError && !passwordLoginError) {
            axios.post(config.baseURL + '/api/auth/login', {
                email: emailLogin,
                password: passwordLogin
            }).then(response => {
                console.log(response)
                if (response.status === 200) {
                    localStorage.setItem('token', response.data['token'])
                    localStorage.setItem('expires', response.data['expires'])
                    setTimeout(() => {
                        navigate("/")
                    }, 200);
                }
            })
                .catch(error => {
                    console.log(error)
                    if (error.response.data["message"] === 'Invalid password' || error.response.data["message"] === 'user not found') {
                        setNaoCadasError(true)
                    }
                });
        }

    }
    function register(event) {
        event.preventDefault();


        setNameRegisterError(validarTextoEmBranco(nameRegister) ? true : false)
        setSurnameRegisterError(validarTextoEmBranco(surnameRegister) ? true : false)

        setEmailRegisterError(validarEmail(emailRegister) || validarTextoEmBranco(emailRegister) ? true : false)
        setPasswordRegisterError(validarTextoEmBranco(passwordRegister) || passwordRegister !== confirmPasswordRegister || validarSenha(passwordRegister) ? true : false)
        setConfirmPasswordRegisterError(validarTextoEmBranco(confirmPasswordRegister) || passwordRegister !== confirmPasswordRegister || validarSenha(confirmPasswordRegister) ? true : false)



        if (!emailRegisterError && !passwordRegisterError && !nameRegisterError && !surnameRegisterError && !confirmPasswordRegisterError) {
            axios.post(config.baseURL + '/api/auth/register', {
                name: nameRegister,
                surname: surnameRegister,
                email: emailRegister,
                password: passwordRegister
            }).then(response => {
                console.log(response)
                if (response.status === 200) {
                    changeRegister()
                }
            })
                .catch(error => {
                    console.log(error)

                    if (error.data === 'E-mail already registered') {

                    }
                });
        }

    }


    return (
        <>
            <NavBar />


            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                <div style={registerOn === true ? { transform: `rotateY(180deg)` } : {}} className='ContainerLoginRegister'>
                    {/* <div className='Backgound'>

                    </div> */}
                    <div className='Login'>
                        <h1>SingIn</h1>
                        <form onSubmit={login}>
                            <label className='LabelPadrao'>email</label>
                            <input placeholder='please enter with your email' className='InputPadrao' type='email' value={emailLogin} onChange={(event) => setEmailLogin(event.target.value)} />
                            <span className='ErrorMessege' style={{ display: emailLoginError ? 'block' : 'none' }}>email invalid</span>

                            <label className='LabelPadrao'>password</label>
                            <Input
                                style={{display:'flex'}}
                                placeholder='please enter with your password' className='InputPadrao' value={passwordLogin} onChange={(event) => setPasswordLogin(event.target.value)}
                                type={showPasswordLogin ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => {
                                                setShowPasswordLogin(showPasswordLogin === true ? false : true)
                                            }}
                                            edge="end"
                                        >
                                            {showPasswordLogin ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <span className='ErrorMessege' style={{ display: passwordLoginError ? 'block' : 'none' }}>password invalid</span>
                            <span className='ErrorMessege' style={{ display: naoCadasError ? 'block' : 'none' }}>user not found</span>


                            <button type='submit' className='Button ButtonLogin'>SingIn</button>
                        </form>
                        <h3>Not have an account yet? <div onClick={() => changeRegister()} className='LinkToRegister'>Register</div></h3>
                    </div>
                    <div className='Register'>
                        <h1>Create Account</h1>
                        <form onSubmit={register}>
                            <label className='LabelPadrao'>name</label>
                            <input placeholder='please enter with your name' className='InputPadrao' type='text' value={nameRegister} onChange={(event) => setNameRegister(event.target.value)} />
                            <span className='ErrorMessege' style={{ display: nameRegisterError ? 'block' : 'none' }}>name invalid</span>

                            <label className='LabelPadrao'>surname</label>
                            <input placeholder='please enter with your surname' className='InputPadrao' type='text' value={surnameRegister} onChange={(event) => setSurnameRegister(event.target.value)} />
                            <span className='ErrorMessege' style={{ display: surnameRegisterError ? 'block' : 'none' }}>surname invalid</span>

                            <label className='LabelPadrao'>email</label>
                            <input placeholder='please enter with your email' className='InputPadrao' type='text' value={emailRegister} onChange={(event) => setEmailRegister(event.target.value)} />
                            <span className='ErrorMessege' style={{ display: emailRegisterError ? 'block' : 'none' }}>email invalid</span>
                            <span className='ErrorMessege' style={{ display: cadasError ? 'block' : 'none' }}>email already registered</span>

                            <label className='LabelPadrao'>password</label>
                            <Input
                                style={{display:'flex'}}
                                placeholder='please enter with your password' className='InputPadrao' value={passwordRegister} onChange={(event) => setPasswordRegister(event.target.value)}                                 type={showPasswordRegister ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => {
                                                setShowPasswordRegister(showPasswordRegister === true ? false : true)
                                            }}
                                            edge="end"
                                        >
                                            {showPasswordRegister ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <span className='ErrorMessege' style={{ display: passwordRegisterError ? 'block' : 'none' }}>password invalid</span>

                            <label className='LabelPadrao'>confirm password</label>
                            <Input
                                style={{display:'flex'}}
                                placeholder='please confirm your password' className='InputPadrao'  value={confirmPasswordRegister} onChange={(event) => setConfirmPasswordRegister(event.target.value)}                                 
                                type={showConfPasswordRegister ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => {
                                                setShowConfPasswordRegister(showConfPasswordRegister === true ? false : true)
                                            }}
                                            edge="end"
                                        >
                                            {showConfPasswordRegister ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <span className='ErrorMessege' style={{ display: confirmPasswordRegisterError ? 'block' : 'none' }}>confirm password invalid</span>

                            <button type='submit' className='ButtonRegister'>Register</button>
                        </form>

                        <h3>Have a account? <div onClick={() => setRegisterOn(false)} className='LinkToRegister'>SingIn</div></h3>
                    </div>
                </div>
            </div >

        </>
    );
}

export default LoginRegister;