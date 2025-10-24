import "../style/SearchBar.css"
import { useState } from "react";   
import { useCountry } from './CountryContext';

const SearchBar = () => {   
    const [searchTerm, setSearchTerm] = useState('');
    const { performSearch, countryData, searchResults } = useCountry();

    const handleSearch = () => {
        performSearch(searchTerm);
    };

    // Use searchResults length when searching, otherwise use filtered countryData length
    const resultsCount = searchResults.length > 0 ? searchResults.length : countryData.length;

    return (
        <div className="search">
            <span>Found {resultsCount} results</span>
            <div className="search-container">
                <div className="search-icon" onClick={handleSearch}></div>
                <input 
                    type="text" 
                    placeholder="Search by Name, Region, Subregion" 
                    className="searchBar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
            </div>
        </div>
    )
}
export default SearchBar;