import axios from 'axios';
import config from '../../config.js'
import UserDefault from '../../assets/imgs/user.svg'
import { useEffect, useState } from 'react';

// List Articles
function Articles({ articlesData, bannerHome, activeScroll = true}) {

    const [articles, setArticles] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(2);

    useEffect(() => {
        setIsFetching(!activeScroll)
        setArticles(articlesData);
    }, [articlesData]);

    // Função para lidar com o evento de scroll
    const handleScroll = (event) => {
        if ( event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight - 100 && !isFetching) {
            setIsFetching(() => true);

            axios.get(config.baseURL + "/api/articles/all?limit=10&page=" + page)
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

                    if (response.data.length === 0) return
                    setIsFetching(() => false);
                    setArticles(() => articlesArray);
                    setPage(prevPage => prevPage + 1); // Usando a função de atualização do estado para obter o valor mais recente de 'page'
                })
        }
    }
    function calcularTempoLeitura(texto) {
        const palavrasPorMinuto = 200; // Altere esse valor para se adequar à velocidade de leitura do seu público
        const palavras = texto.trim().split(/\s+/); // Divide o texto em palavras
        const numeroPalavras = palavras.length; // Obtém o número total de palavras
        const tempoLeituraMinutos = Math.ceil(numeroPalavras / palavrasPorMinuto); // Calcula o tempo de leitura em minutos, arredondado para cima
        return tempoLeituraMinutos;
    }

    return (
        <div style={{ position: 'relative', top: 66, overflow: 'auto',height: 'calc(100vh - 67px)' }} onScroll={handleScroll} >
            { bannerHome }
            <div id='articles' className='ArticlesContainer' >
                {
                    articles.length > 0 && articles.map((element, index) => {
                        return <div key={index} className='CardArticle'>
                            <div className='Dados'>
                                <div className='Perfil'>
                                    <img alt='user_photo' src={element.photoUser === "" ? UserDefault : config.baseURL + element.photoUser} />
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
                                    <p style={{ textAlign: 'justify' }}>
                                        {element.abstract}
                                    </p>
                                </div>
                                <img src={config.baseURL + element.img} />
                            </div>
                        </div>
                    })
                }
            </div>
        </div>

    );
}

export default Articles;