import errorImg from './error.gif';

const ErrorMessage = () => {
    return (
        // <img src={process.env.PUBLIC +'/error.gif'} alt='error'></img>
        <img style={{display: "block", width: "250px",
            height: "250px", objectFit: "contain", margin: "0 auto"}} src={errorImg} alt='error'/>
    )
}


export default ErrorMessage;