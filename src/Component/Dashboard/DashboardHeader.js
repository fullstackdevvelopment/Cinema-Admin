import React from 'react';
import {Link} from 'react-router-dom'
import Selects from "../Selects";
function DashboardHeader() {
    return (
        <div className="movies__nav__dashboard__banner">
            <nav className="movies__nav__dashboard__header">
                <Link to="" className="movies__nav__dashboard__item">
                    All
                </Link>
                <Link to="" className="movies__nav__dashboard__item">
                    Tickets
                </Link>
            </nav>
            <div className="movies__nav__dashboard__header__select">
                <div className="movies__nav__dashboard__select__item">
                    <Selects/>
                </div>
                <div className="movies__nav__dashboard__select__item">
                    <Selects/>
                </div>
            </div>
        </div>

    );
}

export default DashboardHeader;
