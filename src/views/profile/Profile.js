import './Profile.css';
import axios from 'axios';
import config from '../../config.js'
import Articles from '../components/Articles';
import { useEffect, useState } from 'react';
import ProfileInfo from '../components/ProfileInfo';
import NavBar from '../components/NavBar';
import { useParams } from 'react-router-dom';

function Profile() {
    const { userIdP } = useParams()

    const [imageProfile, setImageProfile] = useState('')
    const [followers, setFollowers] = useState(0)
    const [followings, setFollowings] = useState(0)
    const [about, setAbout] = useState('')
    const [userId, setUserId] = useState('')


    useEffect(() => {
        var escolha = typeof(userIdP) === 'string' ?  '/api/user/profile/' + userIdP : '/api/user/profile'
        axios.get(config.baseURL + escolha, {
                maxBodyLength: Infinity,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            }).then((response) => {
                setUserId(response.data.id)
                setImageProfile(response.data.image_profile)
                setFollowings(response.data.followings)
                setFollowers(response.data.followers)
                setAbout(response.data.about)
            }).catch((error) => {
                    if (error.response.status === 401 ) {
                        localStorage.removeItem('token')
                        localStorage.removeItem('expires')
                    }
                });
        

    },[]);


    return (
        <>
            <NavBar />
            <Articles userId={userId} bannerHome={<ProfileInfo userId={ typeof(userIdP) === 'stirng' ? userIdP : userId} imageProfile={imageProfile} about={about} followers={followers} followings={followings} />} />
        </>
    );
}

export default Profile;