import './baseHeader.css';

function BaseHeader() {
    return (
        <>
            <header>
                <img src="multimedia/logo-scrum-05.png" id="logo-header" height="50" draggable="false"/>
                <nav className="nav-menu-left">
                    <ul id="menu">
                        <li id="nav-home"><a href="home.html" draggable="false">My Scrum</a></li>
                        <li id="nav-all-tasks"><a>All Tasks</a></li>
                    </ul>
                </nav>
                <div className="nav-menu-right">
                    <img src="multimedia/prf-img-placeholder.PNG" id="profile-pic" draggable="false"/>
                    <a href="edit-profile.html" id="first-name-label" draggable="false"></a>
                    <button className="logout-button" id="logout-button-header">
                        <img src="multimedia/logout.png" alt="Logout Icon" draggable="false"/>
                        Logout
                    </button>
                </div>
            </header>
        </>
    );
}
export default BaseHeader; 