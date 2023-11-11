import "./charFilter.scss";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from "yup";
import useMarvelService from "../../services/MarvelService";
import {useState} from "react";
import {Link} from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";


const CharFilter = () => {

    const [char, setChar] = useState({}),
          [notFound, setNotFound] = useState(false),
         [startPoint, setStartPoint] = useState(false);

    const {loading, error, clearError, getCharacterByName} = useMarvelService();

    const findChar = (name) => {
        setStartPoint(true);
        clearError();
        setNotFound(false);

        getCharacterByName(name)
            .then(onCharLoaded)
    }

    const onCharLoaded = (newChar) => {
        if (newChar.length) {
            setChar(newChar[0]);
        } else {
            setNotFound(true);
        }
    }

    const renderLink = () => {
        return (
            <div className="char__search-wrapper">
                <div className="char__search-success">There is {char.name}! Visit page?</div>
                <Link className="button button__secondary">
                    <div className="inner">To page</div>
                </Link>
            </div>
        )
    }

    const renderNotFoundMessage = () => {
        return (
            <div className="char__search-error">
                The character was not found. Check the name and try again
            </div>
        )
    }

    const errorMessage = error ? <ErrorMessage/> : null,
          notFoundMessage = notFound ? renderNotFoundMessage() : null,
          content = !(loading || error || notFound) && startPoint ? renderLink() : null;

    return (
        <div className={"char__search-form"}>
            <Formik
                initialValues={{
                    findChar: "",
                }}
                validationSchema={
                    Yup.object().shape({
                        findChar: Yup.string()
                            .required('This field is required')
                    })
                }
                onSubmit={values => findChar(values.findChar)}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field
                            type="text"
                            id="findChar"
                            name="findChar"
                            placeholder="Enter name"
                        />
                        <button
                            type='submit'
                            className="button button__main"
                            disabled={loading}
                        >
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="findChar"/>
                </Form>
            </Formik>
            {errorMessage}
            {notFoundMessage}
            {content}
        </div>
    )
}

export default CharFilter;