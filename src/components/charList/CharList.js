import './charList.scss';
import {React, useState, useEffect, useRef} from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import PropTypes from "prop-types";
import {memo} from "react";

function compareProps(prevProps, newProps){
    return prevProps.onCharSelected === newProps.onCharSelected;
}

const CharList = memo((props) => {

    const [chars, setChars] = useState([]),
        [newItemLoading, setNewItemLoading] = useState(false),
        [offset, setOffset] = useState(210),
        [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => onRequest(offset, true), [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(loadingData)
    }

    const loadingData = (newChars) => {
        // const {logger, secondLog} = await import('./someFunc');
        // logger();
        // secondLog();
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }
        setChars(chars => [...chars, ...newChars]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const itemRefs = useRef([]);

    // const onClickChar = (e, id) => {
    //     const {onCharSelected} = props;
    //
    //     if (itemRef) {
    //         itemRef.classList.remove('char__item_selected');
    //     }
    //
    //     const target = e.target.closest('.char__item');
    //
    //     createItemRef(target);
    //
    //     itemRef.classList.add('char__item_selected');
    //     itemRef.focus();
    //
    //     onCharSelected(id);
    // }

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const getItemRefs = (el, ind) =>{
        itemRefs.current[ind] = el;
    }

    const {onCharSelected} = props;

    const CharListItems = chars.map((item, ind) => <CharListItem key={item.id}
                                                                 getItemRefs={el => getItemRefs(el, ind)}
                                                                 onClickChar={() => {
                                                                     onCharSelected(item.id)
                                                                     focusOnItem(ind)
                                                                 }}
                                                                 name={item.name} img={item.thumbnail}/>);
    const spinner = loading && !newItemLoading ? <Spinner/> : null,
        errorMessage = error ? <ErrorMessage/> : null;

    // if (loading){
    //     import('./someFunc')
    //         .then(obj=> obj.default())
    //         .catch();
    // }

    return (
        <div className="char__list">
            <ul className="char__grid">
                {spinner}
                {errorMessage}
                {CharListItems}
            </ul>
            <button
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
                style={{'display': charEnded ? 'none' : 'block'}}
                disabled={newItemLoading}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}, compareProps)


const CharListItem = (props) => {

    const {onClickChar, getItemRefs, img, name} = props,
        objectFitValue = img.includes('image_not_available') ? 'contain' : 'cover',
        styleImg = {
            objectFit: objectFitValue,
        };

    return (
        <li ref={getItemRefs} className="char__item" tabIndex="0" onClick={onClickChar}>
            <img style={styleImg} src={img} alt="abyss"/>
            <div className="char__name">{name}</div>
        </li>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;