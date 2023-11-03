import './charInfo.scss';
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";


const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {charId} = props;

    const {loading, error, clearError, getCharacter} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [charId]);

    const updateChar = () => {
        if (!charId) {
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (newChar) => {
        setChar(newChar);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>,
        errorMessage = error ? <ErrorMessage/> : null,
        spinner = loading ? <Spinner/> : null,
        content = !(loading || errorMessage || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki, comics} = char,
        objectFitValue = thumbnail.includes('image_not_available') ? 'contain' : 'cover',
        styleImg = {
            objectFit: objectFitValue,
        };

    const getComicsList = () => {
        let comicsList = [];
        if (comics.length === 0) return <p>Comics were not found</p>;
        for (let i = 0; i < 9; i++) {
            if (comics.length > i) {
                comicsList.push(
                    <li key={i} className="char__comics-item">
                        {comics[i].name}
                    </li>
                )
            }
        }
        return comicsList;
    }

    return (
        <>
            <div className="char__basics">
                <img style={styleImg} src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {getComicsList()}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;