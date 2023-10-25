import './charList.scss';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import nextId from "react-id-generator";

class CharList extends Component{

    state = {
        chars: [],
        loading: true,
        error: false

    }

    marvelService = new MarvelService();

    onUpdate = () =>{
        this.marvelService.getAllCharacters()
            .then(this.loadingData)
            .catch(this.onError)
    }

    onError(){
        this.setState({
            loading: false,
            error: true
        })
    }

    loadingData = (chars) =>{
        this.setState({
            chars: chars,
            loading: false,
            error: false,
        })
    }

    componentDidMount() {
        this.onUpdate();
    }


    render() {
        const {chars, loading, error} = this.state,
            CharListItems = chars.map(item => <CharListItem key={nextId()} name={item.name} img={item.thumbnail}/>);

        const spinner = loading ? <Spinner/> : null,
              errorMessage = error ? <ErrorMessage/> : null,
              content = !(loading || error) ? CharListItems : null;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {spinner}
                    {errorMessage}
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const CharListItem = (props) => {

    const objectFitValue = props.img.includes('image_not_available') ? 'contain' : 'cover',
        styleImg = {
            objectFit: objectFitValue,
        };

    return (
        <li className="char__item">
            <img style={styleImg} src={props.img} alt="abyss"/>
            <div className="char__name">{props.name}</div>
        </li>
    )
}

export default CharList;