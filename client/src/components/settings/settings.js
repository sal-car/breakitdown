import React from 'react';

export const Settings = function ({setBackground}) {

    return (
        <div className="Settings ml-16 mt-20">
            <h1 className="create-project-header text-xl font-semibold mb-5">Change background</h1>
            <button onClick={() => setBackground('white')} className="bg-transparent text-lg hover:bg-black  text-black font-semibold hover:text-white py-3 px-5  hover:border-transparent rounded-xl mr-2">White</button>
            <button onClick={() => setBackground('mountains')} className="bg-transparent text-lg hover:bg-black  text-black font-semibold hover:text-white py-3 px-5  hover:border-transparent rounded-xl mr-2">Mountains</button>
            <button onClick={() => setBackground('squiggly')} className="bg-transparent text-lg hover:bg-black  text-black font-semibold hover:text-white py-3 px-5  hover:border-transparent rounded-xl mr-2">Squiggly</button>
            <button onClick={() => setBackground('grey')} className="bg-transparent text-lg hover:bg-black  text-black font-semibold hover:text-white py-3 px-5  hover:border-transparent rounded-xl mr-2">Grey</button>
            <button onClick={() => setBackground('sunny')} className="bg-transparent text-lg hover:bg-black  text-black font-semibold hover:text-white py-3 px-5  hover:border-transparent rounded-xl mr-2">Sunny</button>
            <button onClick={() => setBackground('jellyfish')} className="bg-transparent text-lg hover:bg-black  text-black font-semibold hover:text-white py-3 px-5  hover:border-transparent rounded-xl mr-2">Jellyfish</button>

        </div>

    )
}