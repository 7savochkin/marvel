import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();


    const _apiBase = 'https://gateway.marvel.com:443/v1/public/',
        _apiKey = 'apikey=045195123787d37272916229ff6f5efd',
        _baseOffset = 210,
        _limit = 9;

    const getAllCharacters = async (offset = _baseOffset) => {
        let url = `${_apiBase}characters?${_apiKey}&limit=${_limit}&offset=${offset}`
        const res = await request(url);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset=_baseOffset) => {
        const res = await request(`${_apiBase}comics?${_apiKey}&offset=${offset}&limit=${_limit}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0])
    }

    const validateDescription = (desc) => {
        return desc ? (desc.length > 220 ? desc.slice(0, 217) + '...' : desc) : "Description is not found";
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: validateDescription(char.description),
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || "There is no description",
            pageCount: comics.pageCount
                ? `${comics.pageCount} p.`
                : "No information about the number of pages",
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            language: comics.textObjects[0]?.language || "en-us",
            price: comics.prices[0].price
                ? `${comics.prices[0].price}$`
                : "not available",
        };
    };

    return {loading, error, clearError, getCharacterByName, getAllCharacters, getCharacter, getAllComics, getComic};
}

export default useMarvelService;



// class MarvelService{
//     _apiBase = 'https://gateway.marvel.com:443/v1/public/';
//     _apiKey = 'apikey=045195123787d37272916229ff6f5efd';
//     _baseOffset = 210;
//
//
//
//     getResource = async (url) => {
//         let res = await fetch(url);
//
//         if (!res.ok){
//             throw new Error(`Could not fetch ${url}, status: ${res.status}`);
//         }
//
//         return await res.json();
//     }
//
//     getAllCharacters = async (offset = this._baseOffset) => {
//          const res = await this.getResource(`${this._apiBase}characters?${this._apiKey}&limit=9&offset=${offset}`);
//          return res.data.results.map(this._transformCharacter);
//     }
//
//     getCharacter = async (id) => {
//         const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
//         return this._transformCharacter(res.data.results[0]);
//     }
//
//     validateDescription = (desc) => {
//         return desc ? (desc.length > 220 ? desc.slice(0, 217) + '...' : desc) : "Description is not found";
//     }
//
//     _transformCharacter = (char) => {
//         return {
//             id: char.id,
//             name: char.name,
//             description: this.validateDescription(char.description),
//             thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}` ,
//             homepage: char.urls[0].url,
//             wiki: char.urls[1].url,
//             comics: char.comics.items
//         }
//     }
// }
//
// export default MarvelService;