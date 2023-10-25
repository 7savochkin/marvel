import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";


class RandomChar extends Component {

    constructor(props) {
        super(props);
        console.log('constructor');
    }

    state = {
        char: {},
        loading: true,
        error: false,
        change: false
    }

    marvelService = new MarvelService();

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        console.log('request')
        this.marvelService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onRandomClick = () => {
        this.setState({
            change: true,
            loading: true,
            error: false,
        });
    }

    onCharLoaded = (char) =>{
        this.setState({
            char,
            loading: false,
            error: false,
            change: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    componentDidMount() {
        this.updateChar();
        // this.timerID = setInterval(this.updateChar, 3000);
    }

    componentDidCatch(error, errorInfo) {
        console.log('error');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('update')
        if (this.state.change) this.updateChar();
    }

    componentWillUnmount() {
        console.log('unmount');
    }

    render() {
        console.log('render');
        const {char, loading, error} = this.state,
            errorMessage = error ? <ErrorMessage/> : null,
            spinner = loading ? <Spinner/> : null,
            content = !(loading || errorMessage) ? <View char={char}/> : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.onRandomClick}
                            className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}


const View = ({char})=>{
    const {name, description, thumbnail, homepage, wiki} = char,
           objectFitValue = thumbnail.includes('image_not_available') ? 'contain' : 'cover',
           styleImg = {
               objectFit: objectFitValue,
           };

    return (
        <div className="randomchar__block">
            <img style={styleImg} src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;