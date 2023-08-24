import config from '../../config.js'
import { useState } from 'react';
import Logout from '../../assets/svgs/sair.svg'
import Editar from '../../assets/svgs/editar.svg'
import ModalGeneric from './modais/ModalGeneric.js';
import { Container } from 'react-bootstrap';
import UserDefault from '../../assets/svgs/user.svg'
import LogoutModal from '../../assets/svgs/logout.svg'
import { useNavigate, Link } from 'react-router-dom';
function ProfileInfo({ imageProfile, about, followers, followings, userId }) {
    var navigate = useNavigate()

    const [showModal, setShowModal] = useState()

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('expires')
        navigate('/')
    }

 
    const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    return (

        <Container style={{ background: '#FFC017', height: 'auto', borderBottom: '1px solid black', display: 'flex', alignItems: 'center', flexDirection: 'column', maxWidth: '100%' }}>
            <div style={{ width: '100%', maxWidth: 700 }}>
            {localStorage.getItem('token') !== null && parseJwt(localStorage.getItem('token')).iss === userId && <img alt='logout' className='ItemProfile' onClick={() => { setShowModal(true) }} src={Logout} />}
                {/* <img style={{marginTop:12}} alt='logout' className='ItemProfile' onClick={() => { setShowModal(true) }} src={Editar} /> */}
                {localStorage.getItem('token') !== null && parseJwt(localStorage.getItem('token')).iss === userId && <Link to="/articleCreate">
                        <span style={{ float: 'right', padding: 9, background: 'black', color: 'white', borderRadius: 20, marginTop: 5, marginRight: 10 }}>Add Article</span>
                    </Link>}
            </div>
            <div style={{ width: '100%', maxWidth: 700, margin: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', textAlign: 'center', marginBottom: 0 }}>
                <img alt='user' style={{ width: 100, height: 100, borderRadius: '50%', border: '3px solid white' }} src={imageProfile === "" ? UserDefault : config.baseURL + imageProfile} />

                <div className='TextInfoUser'>
                    <div style={{ fontWeight: 600 }}>Followers</div>
                    <div>{followers}</div>
                </div>
                <div className='TextInfoUser'>
                    <div style={{ fontWeight: 600 }}>Following</div>
                    <div>{followings}</div>

                </div>
            </div>
            <div style={{ maxWidth: 700, textAlign: 'left', margin: '30px 0px', padding: '0px 35px', color: 'white' }}><span style={{ fontStyle: 'italic', fontFamily: 'cursive', display: about === "" ? 'none' : 'block' }}>"{about}"</span> </div>
            <ModalGeneric textButtonConfirm={"Logout"} title={"Logouttt???"} text={"Are you sure you want to quit?"} image={LogoutModal}  show={showModal} execute={logout} setShow={() => {
                setShowModal(false)
            }} />
        </Container>
    );
}

export default ProfileInfo;