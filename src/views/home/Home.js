import './Home.css';
import './BackGround.css'
import axios from 'axios';
import config from '../../config.js'
import { useEffect, useState } from 'react';
import Articles from '../components/Articles';
import BannerHome from '../components/BannerHome';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
function Home() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
     
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
                        id: response.data[key].id,
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
            <NavBar/>
            {!loading && <Articles articlesData={articles} bannerHome={<BannerHome />} />}

        </>
    );
}

export default Home;