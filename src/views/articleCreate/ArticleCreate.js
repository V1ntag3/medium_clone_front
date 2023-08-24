import './ArticleCreate.css';
import Logo from '../../assets/imgs/2.png'
import { Link, useNavigate } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { validarTextoEmBranco } from '../../validators.js'
import axios from 'axios'
import config from '../../config';
import { Figure } from 'react-bootstrap';

function ArticleCreate() {
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [abstract, setAbstract] = useState('')
    const [article, setArticle] = useState('')
    const navigate = useNavigate()
    const [image, setImage] = useState({
        file: null,
    })
    const [image64, setImage64] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [subtitleError, setSubtitleError] = useState(false)
    const [abstractError, setAbstractError] = useState(false)
    const [imageError, setImageError] = useState(false)

    const createArticle = () => {
        setTitleError(validarTextoEmBranco(title) ? true : false)
        setSubtitleError(validarTextoEmBranco(subtitle) ? true : false)
        setAbstractError(validarTextoEmBranco(abstract) ? true : false)
        setImageError(image.file === null ? true : false)


        if (!imageError && !titleError && !subtitleError && !abstractError) {
            axios.post(config.baseURL + '/api/article/create', {
                title: title,
                subtitle: subtitle,
                abstract: abstract,
                text: article,
                bannerImage: image64
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(response => {
                console.log(response)
                navigate('/')
            }).catch((error) => {
                if (error.response.status === 401) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('expires')
                }
            });
        }
    }

    return (
        <div style={{ height: 'calc(100vh - 66px)', overflow: 'auto', marginTop: 66 }}>
            <div className="Nav">
                <div className='LogoContainer'>
                    <img alt='logo' className='Logo' src={Logo} />
                    <span style={{ marginLeft: 10 }} className="NameApp">NewMedium</span>
                </div>

                <div style={{ display: 'flex' }}>
                    <Link to="/"> <button className='ButtonPadrao'>Home</button></Link>
                </div>

            </div>

            <div style={{ width: '100%', maxWidth: 700, margin: 'auto', marginTop: 20, marginBottom: 20 }}>
                <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
                    <button onClick={() => createArticle()} style={{ width: 165, marginRight: 10 }} className='ButtonPadrao'>Create Article</button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Figure>
                        <Figure.Image
                            width={250}
                            src={image.file} />
                    </Figure>
                    {/* <img alt='' src={image.file} style={{ width: , background: 'white' }} accept="image/*" /> */}
                    <label htmlFor='imageInput' className='ButtonPadrao' style={{ width: 160, textAlign: 'center', padding: '10px 15px', color: imageError ? '#FF2E2E' : 'white' }} >Adicionar Banner</label>
                    <input accept="image/png,image/jpeg" id='imageInput' className='' style={{ display: 'none' }} type='file' onChange={(event) => {

                        const file = event.target.files[0];

                        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
                        if (!acceptedImageTypes.includes(file['type'])) {
                            setImageError(true);
                            setImage({
                                fileReal: "",
                                file: ""
                            })
                            return;
                        }
                        setImageError(false);

                        setImage({
                            fileReal: event.target.files[0],
                            file: URL.createObjectURL(event.target.files[0])
                        })


                        var reader = new FileReader();

                        reader.onload = function () {
                            var base64String = reader.result.replace("data:", "")
                                .replace(/^.+,/, "");

                            setImage64(base64String)
                        }

                        reader.readAsDataURL(file);

                    }} />
                </div>

                {/* title */}
                <label className='LabelPadrao'>title</label>
                <input placeholder='please enter with your title' className='InputPadrao' type='text' value={title} onChange={(event) => setTitle(event.target.value)} />
                <span className='ErrorMessege' style={{ display: titleError ? 'block' : 'none' }}>title invalid</span>
                {/* subtitle */}
                <label className='LabelPadrao'>subtitle</label>
                <input placeholder='please enter with your subtitle' className='InputPadrao' type='text' value={subtitle} onChange={(event) => setSubtitle(event.target.value)} />
                <span className='ErrorMessege' style={{ display: subtitleError ? 'block' : 'none' }}>subtitle invalid</span>
                {/* abstract */}
                <label className='LabelPadrao'>abstract</label>
                <textarea maxLength={200} style={{ height: 140 }} placeholder='please enter with your abstract' className='InputPadrao' value={abstract} onChange={(event) => setAbstract(event.target.value)} />
                <span className='ErrorMessege' style={{ display: abstractError ? 'block' : 'none' }}>abstract invalid</span>
                {/* bannerimage */}

                <div style={{ marginBottom: 20, marginTop: 10 }} data-color-mode="light">
                    <MDEditor style={{ margin: '0px 20px' }} height={'70vh'} value={article} onChange={setArticle} />
                </div>


            </div>


        </div>
    );
}

export default ArticleCreate;