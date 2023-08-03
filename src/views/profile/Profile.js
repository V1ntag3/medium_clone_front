import './Profile.css';
import Logo from '../../assets/imgs/2.png'
import axios from 'axios';
import config from '../../config.js'
import { Link } from 'react-router-dom'
import Articles from '../components/Articles';

import { useEffect, useState } from 'react';
import ProfileInfo from '../components/ProfileInfo';

const instance = axios.create({
    baseURL: config.baseURL,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
    },
});

function Profile() {
    const [articles, setArticles] = useState([])
    const [imageProfile, setImageProfile] = useState('')
    const [followers, setFollowers] = useState(0)
    const [followings, setFollowings] = useState(0)
    const [about, setAbout] = useState('')

    useEffect(() => {
        if (localStorage.getItem('token')) {
            let configAxios = {
                method: 'get',
                maxBodyLength: Infinity,
                url: config.baseURL + '/api/user/profile',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            };

            axios.request(configAxios)
                .then((response) => {
                    setImageProfile(response.data.image_profile)
                    setFollowings(response.data.followings)
                    setFollowers(response.data.followers)
                    setAbout(response.data.about)
                })
                .catch((error) => {
                   if(error.response.status === 401 || error.response.status === 404){
                    // localStorage.removeItem('token')
                    // localStorage.removeItem('expires')
                }
                });
        }
        getArticles()

    }, []);

    function calcularTempoLeitura(texto) {
        const palavrasPorMinuto = 200; // Altere esse valor para se adequar à velocidade de leitura do seu público

        const palavras = texto.trim().split(/\s+/); // Divide o texto em palavras

        const numeroPalavras = palavras.length; // Obtém o número total de palavras

        const tempoLeituraMinutos = Math.ceil(numeroPalavras / palavrasPorMinuto); // Calcula o tempo de leitura em minutos, arredondado para cima

        return tempoLeituraMinutos;
    }

    function getArticles() {
        let configAxios = {
            method: 'get',
            maxBodyLength: Infinity,
            url: config.baseURL + '/api/articles/my',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        };
        axios.request(configAxios).then((response) => {
                console.log(response)
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
                        photoUser: imageProfile,
                        nameUser: response.data[key].User.name
                    }
                    articlesArray.push(item)
                }
                setArticles(articlesArray)

            }).catch((error) => {
                if (error.status === 401) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('expires')
                }
            })
    }

    return (
        <>
            <div className="Nav" style={{ width: 'calc(100% - 40px)' }}>
                <div className='LogoContainer'>
                    <img className='Logo' src={Logo} />
                    <span style={{ marginLeft: 10 }} className="NameApp">NewMedium</span>
                </div>
                <div>
                    <Link to="/"> <button className='ButtonPadrao'>Home</button></Link>
                </div>
            </div>
            <Articles articlesData={articles} activeScroll={false} bannerHome={<ProfileInfo imageProfile={imageProfile} about={about} followers={followers} followings={followings}/>}  />
        </>
    );
}

export default Profile;