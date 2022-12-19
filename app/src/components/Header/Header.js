import React from "react";
const Header = () => {
    return <>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark ">
            <div className="container-fluid d-flex" >
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="https://goplugin.co">
                            Plugin
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="https://feeds.goplugin.co">
                            Feeds
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </>
}

export default Header;