import './Home.css';
import Logo from '../../assets/imgs/2.png'
import './BackGround.css'
import axios from 'axios';
import config from '../../config.js'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Articles from '../components/Articles';
import BannerHome from '../components/BannerHome';
import UserDefault from '../../assets/svgs/user.svg'

function Home() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [imageProfile, setImageProfile] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const getArticlesProfile = async () => {
            setLoading(true)
            if (localStorage.getItem('token')) {

                axios.get(config.baseURL + '/api/user/profile', {
                    maxBodyLength: Infinity,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    },
                }).then((response) => {
                        setImageProfile(response.data.image_profile);

                    }).catch((error) => {
                        if (error.response.status === 401 || error.response.status === 404) {
                            localStorage.removeItem('token');
                            localStorage.removeItem('expires');
                        }
                    });
              

            }
            axios.get(config.baseURL + "/api/articles/all")
            .then((response) => {
                var articlesArray = []
                for (const key in response.data) {

                    var date = new Date(response.data[key].createTime)

                    // Obtém os dois últimos dígitos do ano
                    const doisUltimosDigitosAno = date.getFullYear().toString().slice(-2);

                    // Array com os nomes dos meses abreviados
                    const mesesAbreviados = [
                        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
                    ];

                    // Obtém o mês atual e o mês abreviado
                    const mesAtual = date.getMonth();
                    const mesAbreviado = mesesAbreviados[mesAtual];

                    var item = {
                        title: response.data[key].title,
                        subtitle: response.data[key].subtitle,
                        abstract: response.data[key].abstract,
                        img: response.data[key].photoBanner,
                        date: mesAbreviado + " " + doisUltimosDigitosAno,
                        readTime: calcularTempoLeitura(response.data[key].text),
                        photoUser: response.data[key].User.imageProfile,
                        nameUser: response.data[key].User.name
                    }
                    articlesArray.push(item)
                }
                setArticles(articlesArray)
                setTimeout(() => {
                    setLoading(false)
                }, 200);
            })
        }

        getArticlesProfile();
    }, []);

    function calcularTempoLeitura(texto) {
        const palavrasPorMinuto = 200; // Altere esse valor para se adequar à velocidade de leitura do seu público

        const palavras = texto.trim().split(/\s+/); // Divide o texto em palavras

        const numeroPalavras = palavras.length; // Obtém o número total de palavras

        const tempoLeituraMinutos = Math.ceil(numeroPalavras / palavrasPorMinuto); // Calcula o tempo de leitura em minutos, arredondado para cima

        return tempoLeituraMinutos;
    }

    return (
        <>
            <div className="Nav" style={{ width: 'calc(100% - 40px)' }}>
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
            {!loading && <Articles articlesData={articles} bannerHome={<BannerHome />} />}

        </>
    );
}

export default Home;