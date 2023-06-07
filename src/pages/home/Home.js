import React from 'react';
import HeroSection from "../../components/header/HeroSection";
import HomeSection from "../../components/homeSection/HomeSection";

function Home() {
    return (
        <>
        <div className="home">
        </div>
        <HeroSection />
            <HomeSection
                heading="Get started"
                text="To me, photography is an art of observation. It's about finding something interesting in an ordinary place... I've found it has little to do with the things you see and everything to do with the way you see them. - Elliott Erwitt"
                buttonLabel="signup"
                buttonLink="/signup"
                subtext="Join our community!"
            />
        </>

    )
}

export default Home;