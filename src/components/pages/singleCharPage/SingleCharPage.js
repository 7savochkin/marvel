import {Link} from "react-router-dom";
import withSingleItem from "../../withSingleItem/WithSingleItem";
import "../singleComicPage/singleComicPage.scss";


const SingleCharPage = ({item}) => {
    return (
        <div className="single-comic">
            <img src={item.thumbnail} alt={item.name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{item.name}</h2>
                <p className="single-comic__descr">{item.description}</p>
            </div>
            <Link to="/" className="single-comic__back">Back</Link>
        </div>
    )
}


const WithSingleCharPage = withSingleItem(SingleCharPage);

export default WithSingleCharPage;