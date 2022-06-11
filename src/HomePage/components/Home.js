import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from './Slider';
import CardRoom from './CardRoom';
import Footer from './Footer';
import Navbar from './Navbar';

const Home = () => {

    return (
        <div style={{ width: '100%', maxWidth: '100%' }}>
            <Navbar />
            <Slider />
            <CardRoom />
            <Footer />
        </div>
    );
}
export default Home;