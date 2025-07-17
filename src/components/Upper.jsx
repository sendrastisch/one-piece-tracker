import logo from '/logo-transparent.png';

const Upper = () => {
    return (
        <header className="relative z-10 pt-20 p-5 font-fell text-white text-2xl flex flex-col items-center justify-center">
            <p className="">What episode of</p>
            <img src={logo} alt="logo" />
            <p className="">is Sandra at?</p>
        </header>

    );
};

export default Upper;