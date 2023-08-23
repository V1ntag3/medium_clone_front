import Logo from '../../assets/imgs/2.png'
import UserDefault from '../../assets/svgs/user.svg'
import { Link, useNavigate } from 'react-router-dom'
import config from '../../config'
import { useEffect, useState } from 'react'
import axios from 'axios'

function NavBar() {
    const navigate = useNavigate()

    const [imageProfile, setImageProfile] = useState('')

    useEffect(() => {
        const getArticlesProfile = async () => {
            if (localStorage.getItem('token')) {

                axios.get(config.baseURL + '/api/user/profile', {
                    maxBodyLength: Infinity,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    },
                }).then((response) => {
                    setImageProfile(response.data.image_profile);

                }).catch((error) => {
                    if (error.response.status === 401) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('expires');
                    }
                });


            }
        }
        getArticlesProfile()
    }, [])

    if (window.location.pathname === "/singin") {
        return (
            <div className="Nav">
                <div className='LogoContainer'>
                    <img alt='logo' className='Logo' src={Logo} />
                    <span style={{ marginLeft: 10 }} className="NameApp">NewMedium</span>
                </div>
                <div>
                    <Link to="/"> <button className='ButtonPadrao'>Home</button></Link>
                </div>
            </div>
        )
    } 
    if (window.location.pathname === "/") {
        return (
            <div className="Nav">
                <div className='LogoContainer'>
                    <img alt='logo' className='Logo' src={Logo} />
                    <span style={{ marginLeft: 10 }} className="NameApp">NewMedium</span>
                </div>
                <div>
                    {localStorage.getItem('token') ? <><img alt='profile' onClick={() => {
                        navigate('/profile')
                    }} style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid white', cursor: 'pointer' }} src={imageProfile === "" ? UserDefault : config.baseURL + imageProfile} /> </> : <Link to="/singin"> <button className='ButtonPadrao'>Sing in</button></Link>}
                </div>
            </div>
        )
    }
    else{
        return (
            <div className="Nav" >
                <div className='LogoContainer'>
                    <img alt='logo' className='Logo' src={Logo} />
                    <span style={{ marginLeft: 10 }} className="NameApp">NewMedium</span>
                </div>

                <div style={{ display: 'flex' }}>
                    <Link to="/"> <button className='ButtonPadrao'>Home</button></Link>
                </div>

            </div>
        )
    }


}

export default NavBar