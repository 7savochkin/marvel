import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";
import useMarvelService from "../../services/MarvelService";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const WithSingleComicPage = lazy(() => import('../pages/singleComicPage/SingleComicPage'));
const WithSingleCharPage = lazy(() => import('../pages/singleCharPage/SingleCharPage'));

const App = () => {

    const {getComic, getCharacter} = useMarvelService();

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/characters/:itemId" element={<WithSingleCharPage fetchFunc={getCharacter}/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:itemId" element={<WithSingleComicPage fetchFunc={getComic}/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;