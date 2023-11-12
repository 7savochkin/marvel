import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";


const withSingleItem = (Component) => {
    return ({fetchFunc}) => {
        const {itemId} = useParams();
        const [item, setItem] = useState(null);
        const {loading, error, clearError} = useMarvelService();

        useEffect(() => {
            updateComic();
        }, [itemId]);

        const updateComic = () => {
            clearError();
            fetchFunc(itemId)
                .then(onComicLoaded)
        }

        const onComicLoaded = (newItem) => {
            setItem(newItem);
        }

        const spinner = loading ? <Spinner/> : false,
            errorMessage = error ? <ErrorMessage/> : false,
            content = !(loading || errorMessage || !item) ? <Component item={item}/> : null;

        return (
            <>
                {spinner}
                {errorMessage}
                {content}
            </>
        )
    }
}

export default withSingleItem;