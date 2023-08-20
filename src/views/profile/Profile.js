import './Profile.css';
import Logo from '../../assets/imgs/2.png'
import axios from 'axios';
import config from '../../config.js'
import { Link, useParams } from 'react-router-dom'
import Articles from '../components/Articles';

import { useEffect, useState } from 'react';
import ProfileInfo from '../components/ProfileInfo';
import NavBar from '../components/NavBar';

function Profile() {
    const [articles, setArticles] = useState([])
    const [imageProfile, setImageProfile] = useState('')
    const [followers, setFollowers] = useState(0)
    const [followings, setFollowings] = useState(0)
    const [about, setAbout] = useState('')

    useEffect(() => {
        if (localStorage.getItem('token')) {
            axios.get(config.baseURL + '/api/user/profile', {
                maxBodyLength: Infinity,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            }).then((response) => {
                setImageProfile(response.data.image_profile)
                setFollowings(response.data.followings)
                setFollowers(response.data.followers)
                setAbout(response.data.about)
            })
                .catch((error) => {
                    if (error.response.status === 401 || error.response.status === 404) {
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

        axios.get(config.baseURL + '/api/articles/my', {
            maxBodyLength: Infinity,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        }).then((response) => {
            var articlesArray = []
            console.log(response.data)
            for (const key in response.data.articles) {
                var date = new Date(response.data.articles[key].createTime)
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
                    id: response.data[key].id,

                    title: response.data.articles[key].title,
                    subtitle: response.data.articles[key].subtitle,
                    abstract: response.data.articles[key].abstract,
                    img: response.data.articles[key].photoBanner,
                    date: mesAbreviado + " " + doisUltimosDigitosAno,
                    readTime: calcularTempoLeitura(response.data.articles[key].text),
                    photoUser: response.data.image_profile,
                    nameUser: response.data.name
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
            <NavBar />
            <Articles articlesData={articles} activeScroll={false} bannerHome={<ProfileInfo imageProfile={imageProfile} about={about} followers={followers} followings={followings} />} />
        </>
    );
}

export default Profile;