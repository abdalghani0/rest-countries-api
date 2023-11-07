import "./App.css";
import { useState } from 'react';

function SearchBar({ filter, setFilter, searchText, setSearchText}) {

    function handleFilterChange(event) {
        setFilter(event.target.value);
    }

    function handleSearchChange(event) {
        setSearchText(event.target.value);
    }

    return (
        <section id = "search-bar" className = "search-filter-bar">

            <div className = "search-bar">
                <svg style = {{marginRight: "8px"}} className='search-icon' width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"></path><path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"></path></svg>
                <input className='input' type="text" placeholder="Search for a country..." onChange = {(e) => handleSearchChange(e)} />
            </div>

            <select className = "filter" value = {filter} onChange = {(e) => handleFilterChange(e)}>
                <option value = "Africa">Africa</option>
                <option value = "Americas">Americas</option>
                <option value = "Asia">Asia</option>
                <option value = "Europe">Europe</option>
                <option value = "Oceania">Oceania</option>
                <option value = "All">All</option>
            </select>

        </section>
    );
}

export default SearchBar;