import config from '../../config.js'
import { useState } from 'react';
import ModalLogout from './modais/ModalLogout.js';
import { Container } from 'react-bootstrap';
import UserDefault from '../../assets/svgs/user.svg'
import Logout from '../../assets/svgs/sair.svg'
import { useNavigate, Link } from 'react-router-dom';
function ProfileInfo({ imageProfile, about, followers, followings }) {
    var navigate = useNavigate()

    const [showModalLogout, setShowModalLogout] = useState()

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('expires')
        navigate('/')
    }


    return (

        <Container style={{ background: '#FFC017', height: 'auto', borderBottom: '1px solid black', display: 'flex', alignItems: 'center', flexDirection: 'column', maxWidth:'100%' }}>
            <div style={{ width: '100%', maxWidth: 700 }}> <img alt='logout' onClick={() => {setShowModalLogout(true)}} style={{ width: 25, marginTop: 14, float: 'right', marginRight: 15, cursor: 'pointer' }} src={Logout} /> <Link to="/articleCreate"><span style={{ float: 'right', padding: 9, background: 'black', color: 'white', borderRadius: 20, marginTop: 5, marginRight: 10 }}>Add Article</span></Link></div>
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
        <ModalLogout show={showModalLogout} execute={logout} setShow={() => {
            setShowModalLogout(false)
        }} />
        </Container>
    );
}

export default ProfileInfo;