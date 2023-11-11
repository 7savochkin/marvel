import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import {useState} from "react";
import CharFilter from "../charFilter/CharFilter";


const MainPage = () =>{

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => setChar(id);

    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <div className="char-info-group">
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharFilter/>
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;