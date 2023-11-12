import {Link} from "react-router-dom";
import './singleComicPage.scss';
import withSingleItem from "../../withSingleItem/WithSingleItem";


const SingleComicPage = ({item}) => {
    return (
        <div className="single-comic">
            <img src={item.thumbnail} alt={item.title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{item.title}</h2>
                <p className="single-comic__descr">{item.description}</p>
                <p className="single-comic__descr">{item.pageCount}</p>
                <p className="single-comic__descr">Language: {item.language}</p>
                <div className="single-comic__price">{item.price}$</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

const WithSingleComicPage = withSingleItem(SingleComicPage);


export default WithSingleComicPage;