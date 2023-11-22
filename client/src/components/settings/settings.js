import React, { useState } from 'react';

export const Settings = function ({background, setBackground, setFont}) {
    // eslint-disable-next-line no-unused-vars
    const [prevBackground, setPrevBackground] = useState('')
    const [hasClicked, setHasClicked] = useState(false);
    
    const handleMouseOver = (button) => {
        const bgSelection = button.target.id;
        setHasClicked(false);
        setPrevBackground(background);
        setBackground(bgSelection);
    }

    const handleMouseLeave = () => {
        if (!hasClicked) {
            setBackground(prevBackground);
        }
    }

    const handleClick = (colour) => {
        setBackground(colour);
        setHasClicked(true);
    }

    return (
        <div className="Settings ml-16 mt-20">
            <div>
                <h1 className="text-xl font-semibold my-5 border-b-4 border-black pb-2 w-max">Change background</h1>
                <button id='mountains' onClick={() => handleClick('mountains')} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className="settings-button">Mountains</button>
                <button id='squiggly' onClick={() => handleClick('squiggly')} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className="settings-button">Squiggly</button>
                <button id='grey' onClick={() => handleClick('grey')} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className="settings-button">Grey</button>
                <button id='sunny' onClick={() => handleClick('sunny')} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className="settings-button">Sunny</button>
                <button id='jellyfish' onClick={() => handleClick('jellyfish')} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className="settings-button">Jellyfish</button>
            </div>
            <div>
                <h1 className='text-xl font-semibold my-5 border-b-4 border-black pb-2 w-max'>Change font</h1>
                <button onClick={() => setFont('font-sans')} className='settings-button'>Sans</button>
                <button onClick={() => setFont('font-serif')} className='settings-button'>Serif</button>
                <button onClick={() => setFont('font-mono')} className='settings-button'>Mono</button>
                <button onClick={() => setFont('comic-sans')} className='settings-button'>Comic</button>
            </div>
        </div>
    )
}