import robin from '/robin.png';
import hancock from '/hancock.png';

const Footer = () => {
    return (
        <footer className="gap-x-2 sm:gap-x-8 lg:gap-x-32 flex w-screen absolute justify-center space-evenly bottom-0 brightness-75">
            <img className={`w-72 sm:w-96 object-cover`} src={robin} alt="robin" />
            <img className={`w-72 sm:w-96 object-cover`} src={hancock} alt="hancock" />
        </footer>
    );
};

export default Footer;