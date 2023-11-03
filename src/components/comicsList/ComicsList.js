import './comicsList.scss';
import useMarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const ComicsList = () =>  {

    const [comics, setComics] = useState([]),
          [offset, setOffset] = useState(30),
          [newItemLoading, setNewItemLoading] = useState(false),
          [charEnded, setCharEnded] = useState(false);

    const {loading, error, clearError, getAllComics} = useMarvelService();

    const limit = 8;

    useEffect(() => {
        onRequest(true)
    }, []);

    const onRequest = (initial=false) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        clearError();
        getAllComics(offset, limit)
            .then(onDataLoaded)
    }

    const onDataLoaded = (newComics) => {
        let ended = false
        if (newComics.length < limit) ended = true;
        setComics(comics=>[...comics, ...newComics]);
        setOffset(offset=> offset + limit);
        setCharEnded(ended);
        setNewItemLoading(false);
    }

    const renderItems = () => {
        return comics.map((item, ind) => <ComicListItem key={ind} itemObj={item} />);
    }

    const styleObj = {
        display : charEnded ? "none" : "block"
    }

    const spinner = (loading && !newItemLoading) ? <Spinner/> : null,
        errorItem = error ? <ErrorMessage/> : null;

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {spinner}
                {errorItem}
                {renderItems()}
            </ul>
            <button className="button button__main button__long"
                    style={styleObj}
                    onClick={() => onRequest(false)}
                    disabled={newItemLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const ComicListItem = (props) => {

    const {title, thumbnail, price} = props.itemObj;

    return (
        <li className="comics__item">
            <a href="#">
                <img src={thumbnail} alt="x-men" className="comics__item-img"/>
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{`${price}`.toUpperCase()}</div>
            </a>
        </li>
    )
}

export default ComicsList;