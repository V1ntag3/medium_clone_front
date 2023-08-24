import axios from 'axios';
import config from '../../config.js'

import UserDefault from '../../assets/svgs/user.svg'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LataLixo from '../../assets/svgs/lixo.svg'
import DeleteImage from '../../assets/svgs/deleteImage.svg'
import ModalGeneric from '../components/modais/ModalGeneric.js'
// List Articles
function Articles({ bannerHome, userId = null }) {
    const navigate = useNavigate()
    const [articles, setArticles] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState()
    const [selectedArticle, setSelectedArticle] = useState()

    useEffect(() => {
        getArticles()
    }, [userId]);

    const getArticles = () => {
        var endpointer1 = '/api/articles/all?limit=10&page=' + page
        var endpointer2 = '/api/articles/' + userId + '?limit=10&page=' + page
        var escolha = userId === null ? endpointer1 : endpointer2
        axios.get(config.baseURL + escolha)
            .then((response) => {
                var articlesArray = [];
                articlesArray = articlesArray.concat(articles)
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
                        nameUser: response.data[key].User.name,
                        userId: response.data[key].User.id
                    }
                    articlesArray.push(item)
                }

                if (response.data.length === 0) return
                setArticles(articlesArray);
                setPage(prevPage => prevPage + 1); // Usando a função de atualização do estado para obter o valor mais recente de 'page'
                setIsFetching(() => false);

            }).catch((error) => {

            })
    }

    const deleteArticle = () => {
        axios.delete(config.baseURL + "/api/articles/" + selectedArticle, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    navigate(0)
                }
            }).catch((error) => {
                console.log(error)
            })
    }

    // Função para lidar com o evento de scroll
    const handleScroll = (event) => {
        if (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight - 100 && !isFetching) {
            setIsFetching(true);
            getArticles()
        }
    }

    function calcularTempoLeitura(texto) {
        const palavrasPorMinuto = 200; // Altere esse valor para se adequar à velocidade de leitura do seu público
        const palavras = texto.trim().split(/\s+/); // Divide o texto em palavras
        const numeroPalavras = palavras.length; // Obtém o número total de palavras
        const tempoLeituraMinutos = Math.ceil(numeroPalavras / palavrasPorMinuto); // Calcula o tempo de leitura em minutos, arredondado para cima
        return tempoLeituraMinutos;
    }
    const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
    return (
        <div style={{ position: 'relative', top: 66, overflow: 'auto', height: 'calc(100vh - 67px)' }} onScroll={handleScroll} >
            {bannerHome}
            <div id='articles' className='ArticlesContainer' >
                {
                    articles.length > 0 && articles.map((element, index) => {

                        return <div key={index} className='CardArticle'>
                            <div className='Dados'>
                                <Link to={'/profile/' + element.userId}>
                                    <div className='Perfil'>
                                        <img alt='user_photo' src={element.photoUser === "" ? UserDefault : config.baseURL + element.photoUser} />
                                    </div>
                                    <span className='NomeDoPerfil'>{element.nameUser}</span>
                                </Link>

                                <span className='Time'>{element.date} . {element.readTime} min read</span>
                                {window.location.pathname !== "/" && localStorage.getItem('token') !== null && parseJwt(localStorage.getItem('token')).iss === userId &&  <div><img onClick={() => {
                                    setShowModal(true)
                                    setSelectedArticle(element.id)
                                }} src={LataLixo} style={{ width: 20, height: 20, marginBottom: 5, marginLeft: 10, cursor: 'pointer' }} /></div>}
                            </div>
                            <Link style={{ color: 'black', textDecoration: 'none' }} to={"/article/" + element.id}>
                                <div style={{ display: 'flex' }}>
                                    <div className='TextComplete'>
                                        <h2>
                                            {element.title}
                                        </h2>
                                        <h3>
                                            {element.subtitle}
                                        </h3>
                                        <p style={{ textAlign: 'justify' }}>
                                            {element.abstract}
                                        </p>
                                    </div>
                                    <img alt="banner" src={config.baseURL + element.img} />
                                </div>
                            </Link>

                        </div>
                    })
                }
            </div>
            <ModalGeneric textButtonConfirm={"Delete"} image={DeleteImage} title={"Delete Article"} text={"After deleting the article you will not be able to recover"} execute={deleteArticle} show={showModal} setShow={() => {
                setShowModal(false)
            }} />
        </div>

    );
}

export default Articles;