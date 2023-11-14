import React, {useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';


export const LoginPage = function ({setOpenLoginPage, setIsAuthenticated}) {
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    })

    const handleInputChange = function (e) {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'name') {
            setFormData({...formData, name: value});
        } else if (name === 'password') {
            setFormData({...formData, password: value})
        }
    }

    return (
    <div className='LoginPage overflow-y-auto overflow-x-hidden min-h-[100vh] fixed top-0 right-0 left-0 z-50 justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full  bg-gray-600/50'>	
        <div className="relative p-4 min-w-fit  max-w-fit max-h-full top-[10vh] mx-auto">
            <div className="relative bg-white min-h-[50vh] rounded-xl shadow px-10 py-8 flex flex-col">
                <div className="header flex justify-between  mb-10">
                    <h1 className="create-project-header text-2xl font-semibold">Log in</h1>
                    <button onClick={() => setOpenLoginPage(false)} className="close-modal">
                        <CloseIcon style={{color: "#b5b1b1"}} className="absolute top-[15px] right-[15px]"></CloseIcon>
                    </button>
                </div>
                <div className="content flex flex-col gap-10 items-start">
                    <form className="flex flex-col font-semibold">
                        <label htmlFor="email">Email</label>
                        <input onChange={handleInputChange} required name="email" type="email" className="project-name outline-none border p-2.5 rounded-lg w-[400px] mb-3" />
                        <label htmlFor="password">Password</label>
                        <input onChange={handleInputChange} required name="password" type="password" className="project-name outline-none border p-2.5 rounded-lg w-[400px] "/>
                    </form>
                    <button onClick={() => setIsAuthenticated(true)}  className="relative self-center shadow-sm bg-transparent text-xl h-14 w-42 px-6 hover:bg-violet-900 text-violet-900 font-semibold hover:text-white border border-violet-900 hover:border-transparent rounded ">Log in</button>

                </div>
            </div>
        </div>
    </div>
    )
}