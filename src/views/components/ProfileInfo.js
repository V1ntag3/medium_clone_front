import config from '../../config.js'
import { Container } from 'react-bootstrap';
import UserDefault from '../../assets/svgs/user.svg'
import Logout from '../../assets/svgs/sair.svg'
import { useNavigate } from 'react-router-dom';
function ProfileInfo({imageProfile, about, followers, followings }) {
    var navigate = useNavigate()
    
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('expires')
        navigate('/')    }

        
    return (

        <Container style={{ background: '#FFC017', height: 'auto', borderBottom: '1px solid black', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{width: '100%', maxWidth: 700}}> <span style={{float:'right', padding:9, background:'black', color:'white', borderRadius:20, marginTop:5}}>Add Article</span> <img alt='logout' onClick={() => logout()} style={{width:25, marginTop:10, float:'right', marginRight:15, cursor:'pointer'}} src={Logout}/></div>
            <div style={{ width: '100%', maxWidth: 700, margin: 20, display:'flex', flexDirection:'row',    justifyContent: 'space-around', alignItems: 'center',textAlign:'center', marginBottom:0 }}>
                <img alt='user' style={{ width: 100, height: 100, borderRadius: '50%', border: '3px solid white'}} src={imageProfile === "" ? UserDefault : config.baseURL + imageProfile} />

                <div className='TextInfoUser'>
                    <div style={{fontWeight:600}}>Followers</div>
                    <div>{followers}</div>

                </div>
                <div className='TextInfoUser'>
                    <div style={{fontWeight:600}}>Following</div>
                    <div>{followings}</div>

                </div>
            </div>
            <div style={{maxWidth:700, textAlign:'left', margin:'30px 0px', padding: '0px 35px', color: 'white'}}><span style={{fontStyle: 'italic', fontFamily:'cursive', display : about == "" ? 'none' : 'block'}}>"{about}"</span> </div>
        </Container>
    );
}

export default ProfileInfo;