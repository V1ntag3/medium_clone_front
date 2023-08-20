import './ArticleView.css';
import Logo from '../../assets/imgs/2.png'
import { Link, useNavigate, useParams } from 'react-router-dom'

import ReactMarkdown from 'https://esm.sh/react-markdown@7'
import CodeBlock from "./CodeBlock";

import { useEffect, useState } from 'react';
import axios from 'axios'
import config from '../../config';
import NavBar from '../components/NavBar';

function ArticleView() {

    const { articleId } = useParams();

    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [abstract, setAbstract] = useState('')
    const [article, setArticle] = useState('')
    const [banner, setBanner] = useState('')
    const navigate = useNavigate()

    const getArticle = () => {

        axios.get(config.baseURL + '/api/articles/article/' + articleId).then(response => {

            console.log(response.data)
            setBanner(response.data.title)
            setTitle(response.data.title)
            setSubtitle(response.data.subtitle)

            setAbstract(response.data.abstract)

            setArticle(response.data.text)

            setBanner(response.data.photoBanner)


        })
            .catch(error => {
                console.log(error)
            });

    }
    useEffect(() => {
        getArticle()
    })
    const returnBg = (urlF) =>{
       return 'url(' + config.baseURL  + urlF + ')'
    }
    return (
        <div style={{ height: '100vh', overflow: 'auto' }}>
            <NavBar/>
            <div className='BannerArticleView' style={{ background: returnBg(banner), marginTop: 66, marginBottom: 0 }}>
            </div>

            <div style={{ maxWidth: 700, marginTop: 66, marginBottom: 20, paddingInline: 15, overflowX: 'hidden' , marginTop:0, margin:'auto'}}>
                <h1 className='TitleArticleView'> {title} </h1>
                <h2 className='SubTitleArticleView' >{subtitle}</h2>
                <div className='TextArticleView'>
                    <ReactMarkdown
                        renderers={{ code: CodeBlock }}
                    >
                        {article}
                    </ReactMarkdown>

                </div>


            </div>



        </div>

    );
}

export default ArticleView;