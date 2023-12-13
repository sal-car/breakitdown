import React, { useState } from 'react';
import { LoginPage } from './login';


export const HeroSection = function ({setIsAuthenticated}) {
    const [openLoginPage, setOpenLoginPage] = useState(false);

    const scrollToAbout = function () {
        const about = document.getElementById("about");
        about.scrollIntoView({behavior: "smooth"});
    };

    return (
        <div className="wrapper">
            {
                openLoginPage &&
            <LoginPage setOpenLoginPage={setOpenLoginPage} setIsAuthenticated={setIsAuthenticated}></LoginPage>
            }
            <div data-testid='splash-bg' className="HeroSection inset-0 z-0 h-[91vh]">
                {/* FIXME do something with this button */}
                <button className="sticky shadow-md text-3xl h-20 w-44 top-[61.5vh] left-[44vw] bg-[#EA5127] hover:bg-transparent  hover:text-[#EA5127] font-normal font-sans text-white py-2 px-3 border hover:border-[#EA5127]  border-transparent rounded-xl ">Get started</button>
                <button onClick={scrollToAbout} className="relative shadow-sm bg-transparent text-xl h-14 w-42 px-6 left-5 hover:bg-violet-900 text-violet-900 font-semibold hover:text-white border border-violet-900 hover:border-transparent rounded ">About</button>
                <button onClick={() => setOpenLoginPage(true)}  className="relative shadow-sm bg-transparent text-xl h-14 w-42 ml-5 px-6 left-6 hover:bg-violet-900 text-violet-900 font-semibold hover:text-white border border-violet-900 hover:border-transparent rounded ">Log in</button>
            </div>
            <div id="about" className="About shadow-5xl bg-[#779BF6] h-[89vh] z-20 ">
                <div className="info absolute w-1/2 flex flex-col justify-center align-middle left-[24vw] top-[105vh]">
                    <h2 className='text-white mb-5 text-center text-5xl font-extrabold leading-none tracking-tight '>About</h2>
                    <p className=' text-white leading-7 text-center text-xl tracking-wide'>
                    Struggling with overwhelm? We got you. With breakitdown you will go from project chaos to simple serenity. We help you slice up your tasks, so you can keep things on point <span className='italic'>and get things done. </span>
                    </p>
                    <div className="about-img h-[52vh]"></div>
                </div>
            </div>
        </div>
    )
}