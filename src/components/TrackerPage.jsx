import Upper from "./Upper.jsx";
import Counter from "./Counter.jsx";
import Footer from "./Footer.jsx";

const TrackerPage = () => {
    return (
        <main className={'relative h-screen bg-[url("/background.jpg")] bg-no-repeat bg-cover overflow-hidden'}>
            <div className="absolute inset-0 bg-black/50"></div>
            <Upper/>
            <Counter/>
            <Footer/>
        </main>
    );
};

export default TrackerPage;