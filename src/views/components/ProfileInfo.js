import config from '../../config.js'
import { Container } from 'react-bootstrap';
import UserDefault from '../../assets/imgs/user.svg'

function ProfileInfo({imageProfile, about, followers, followings }) {
 //
    return (

        <Container style={{ background: '#FFC017', height: 'auto', borderBottom: '1px solid black', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ width: '100%', maxWidth: 700, margin: 20, display:'flex', flexDirection:'row',    justifyContent: 'space-around', alignItems: 'center',textAlign:'center', marginBottom:0 }}>
                <img style={{ width: 100, height: 100, borderRadius: '50%', border: '3px solid white'}} src={imageProfile === "" ? UserDefault : config.baseURL + imageProfile} />

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