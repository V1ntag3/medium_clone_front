import './Home.css';
import Logo from '../../assets/imgs/2.png'
import './BackGround.css'
import { Container } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config.js'
import {Link} from 'react-router-dom'

import { useEffect, useState } from 'react';

const instance = axios.create({
    baseURL: config.baseURL,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

function Home() {
    const [articles, setArticles] = useState([
        {
            title: "",
            subtitle: "awdaw",
            img: {
                src: 'sopefkp'
            },
            text: "adw",
            date: "rfwef"

        }
    ])
    useEffect(() => {
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

        instance.get("/api/articles/all")
            .then((response) => {
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
                        photoUser: response.data[key].User.imageProfile,
                        nameUser: response.data[key].User.name
                        }
                    articlesArray.push(item)
                }
                setArticles(articlesArray)

            })
    }

    return (
        <>
            <div className="Nav" style={{width: 'calc(100% - 50px)'}}>
                <div className='LogoContainer'>
                    <img className='Logo' src={Logo} />
                    <span style={{ marginLeft: 10 }} className="NameApp">NewMedium</span>
                </div>
                <div>
                <Link to="/singin"> <button className='ButtonPadrao'>Sing in</button></Link>
                </div>
            </div>
            <div style={{ position: 'relative', top: 66 }}>
                <div>

                    <Container style={{ background: '#FFC017', height: 300, borderBottom: '1px solid black', display: 'flex', alignItems: 'center' }}>
                        <span className='TextBanner'>
                            Compartillhe seu conhecimento
                        </span>
                        <div className="background">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </Container>
                </div>

                <div className='ArticlesContainer'>

                    {
                        articles.map((element, index) => {
                            return <div key={index} className='CardArticle'>
                                <div className='Dados'>
                                    <div className='Perfil'>
                                        <img src={config.baseURL  + element.photoUser} />
                                    </div>
                                    <span className='NomeDoPerfil'>{element.nameUser}</span>
                                    <span className='Time'>{element.date} . {element.readTime} min read</span>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div className='TextComplete'>
                                        <h2>
                                            {element.title}
                                        </h2>
                                        <h3>
                                            {element.subtitle}
                                        </h3>
                                        <p style={{textAlign: 'justify'}}>
                                            {element.abstract}
                                        </p>
                                    </div>
                                    <img src={config.baseURL +element.img} />
                                </div>
                            </div>


                        })
                    }



                </div>
            </div>
        </>
    );
}

export default Home;