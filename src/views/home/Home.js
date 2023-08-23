import './Home.css';
import './BackGround.css'
import './ArticlesList.css';

import Articles from '../components/Articles';
import BannerHome from '../components/BannerHome';
import NavBar from '../components/NavBar';
function Home() {


    return (
        <>
            <NavBar/>
            {<Articles bannerHome={<BannerHome />} />}

        </>
    );
}

export default Home;