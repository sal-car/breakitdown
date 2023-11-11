export const Navigation = function ({handleNavbarClick, toggleCreateModal}) {


    return (
        <div className="Navigation">
            <header className="header">
                <div className="left-header">
                    <button onClick={handleNavbarClick} className="nav-icon">
                        <div className="nav-line"></div>
                        <div className="nav-line"></div>
                        <div className="nav-line"></div>
                    </button>
                    <input type="text" placeholder="Search" className="search-bar" />
                </div>
                <div className="middle-header">
                    <div className="logo">
                        breakitdown
                    </div>
                </div>
                <div className="right-header">
                    <button onClick={toggleCreateModal} className="new-project-btn">New project</button>
                </div>
            </header>
        </div>
    )

}