import React from 'react';
import { useState } from 'react';
import "./App.css";
import countries from "./data.json";
import Header from "./Header.jsx"
import SearchBar from "./SearchBar.jsx"

export default function App() {
    const [filter, setFilter] = useState("All");
    const [searchText, setSearchText] = useState("");
    const [countryIsClicked, setCountryIsClicked] = useState(false);
    const [clickedCountry, setClickedCountry] = useState({});

    return (
        <main className='app'>
            <Header />
            <SearchBar
                filter = {filter}
                setFilter = {setFilter}
                searchText = {searchText}
                setSearchText = {setSearchText} />
            {(!countryIsClicked) 
                    ? <Countries 
                        filter = {filter}
                        searchText = {searchText}
                        setClickedCountry = {setClickedCountry}
                        setCountryIsClicked = {setCountryIsClicked} />
                    : clickedCountry
            }

        </main>
    );
}

function Countries({ filter, searchText, setClickedCountry, setCountryIsClicked }) {

    const counties = [];

    countries.forEach((country) => {
        if(filter === "All") {
            if(searchText === "" || searchText === null)
                counties.push(
                    <Country 
                        country={country} 
                        setClickedCountry={setClickedCountry}
                        setCountryIsClicked={setCountryIsClicked} />
                )
            else 
                if(country.name === searchText)
                    counties.push(
                        <Country 
                            country={country} 
                            setClickedCountry={setClickedCountry}
                            setCountryIsClicked={setCountryIsClicked} />
                    )
        }
        else {
            if(country.region === filter)
                counties.push(
                    <Country 
                        country={country} 
                        setClickedCountry={setClickedCountry}
                        setCountryIsClicked={setCountryIsClicked} />
                )
        }
    })

    return (
        <section id = "countries" className= "countries">
            { counties }
        </section>
    );  
}

function Country({ country, setClickedCountry, setCountryIsClicked }) {

    function handelClick() {
        let searchBar = document.getElementById("search-bar");
        searchBar.style.display = "none";
        setClickedCountry(<Details country = { country } countryClicked={setCountryIsClicked}/>);
        setCountryIsClicked(true);
    }

    return (
        <a onClick={() => handelClick()}>
            <div className = "country">

                <img className = "flag" src = {country.flags.svg} width = "200px" height= "100px"/>

                <div className = "country-info">

                    <h5 className = "bold big">{ country.name }</h5><br/>

                    <ul>
                        <li>
                            <span className = "bold">Population:</span> <span>{ country.population }</span>
                        </li>
                        <li>
                           <span className = "bold">Region:</span> <span>{ country.region }</span>
                        </li>
                        <li>
                            <span className = "bold">Capital:</span> <span>{ country.capital }</span>
                        </li>
                    </ul>

                </div>
                
            </div>
        </a>
    );
}

function Details({ country, countryClicked }) {
    const [county, setCounty] = useState({country});
    const borders = [];
    let lags = "";
    let currencies = "";

    if(country.languages !== null && country.languages !== undefined)
        for(let i = 0; i < country.languages.length; i++) {
            if(i === country.languages.length - 1)
                lags += country.languages[i].name;
            else
                lags += country.languages[i].name + ",";
        }
        

    if(country.currencies !== null && country.currencies !== undefined)
        for(let i = 0; i < country.currencies.length; i++) {
            if(i === country.languages.length - 1)
                currencies += country.currencies[i].name;
            else
                currencies += country.languages[i].name + ",";
        }

    if(country.borders !== null && country.borders !== undefined)
        country.borders.forEach((border) => {
            borders.push(
                <span onClick={(e) => handleBordersClick(e)} className = "border">{border}</span>
            );
        });
    else
        borders.push("");

    function handleBordersClick(event) {
        setCounty(countries.find(c => c.name === event.target.value));
    }

    function handleBackClick() {
        let searchBar = document.getElementById("search-bar");
        searchBar.style.display = "flex";
        countryClicked(false);
    }

    return (
        <div className = "country-details">

            <a className = "back-btn" onClick = {() => handleBackClick()}>Back</a>

            <div className = "details">

                <img className = "flag-details" src = {country.flags.svg} width = "600px" height= "300px"/>

                <div className = "info">

                    <h5 className = "bold big">{ country.name }</h5>

                    <div className = "full-info">

                        <ul>
                            <li>
                                <span className = "bold">Native Name:</span> 
                                <span>{ country.nativeName }</span>
                            </li>
                            <li>
                                <span className = "bold">Population:</span> 
                                <span>{ country.population }</span>
                            </li>
                            <li>
                                <span className = "bold">Region:</span> 
                                <span>{ country.region }</span>
                            </li>
                            <li>
                                <span className = "bold">Sub Region:</span> 
                                <span>{ country.subregion }</span>
                            </li>
                            <li>
                                <span className = "bold">Capital:</span> 
                                <span>{ country.capital }</span>
                            </li>
                        </ul>
                        
                        <ul>
                            <li>
                                <span className = "bold">Top Level Domain:</span> { country.topLevelDomain }
                            </li>
                            <li>
                                <span className = "bold">Currencies:</span> { currencies}
                            </li>
                            <li>
                                <span className = "bold">Languages:</span> { lags}
                            </li>
                        </ul>

                    </div>

                    <div className = "country-borders">
                        <p>
                            <span className = "bold">Border Countries:</span> { borders }
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}