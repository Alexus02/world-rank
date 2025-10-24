import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CountryContext = createContext();

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};

export const CountryProvider = ({ children }) => {
  const [regions, setRegions] = useState([]);
  const [sortBy, setSortBy] = useState("Population");
  const [searchResults, setSearchResults] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [unMembership, setUnMembership] = useState(null);

  const changeSortBy = (input) => {
    setSortBy(input);
  };

  const changeRegion = (input) => {
    setRegions(input);
  };

  const changeUnMembership = (input) => {
    setUnMembership(input);
  };

  // Sorting function
  const sortCountries = useCallback((data, sortType) => {
    const sortedData = [...data];
    
    switch(sortType) {
      case "Population":
        return sortedData.sort((a, b) => b.population - a.population);
      case "area":
        return sortedData.sort((a, b) => b.area - a.area);
      case "alphabetical":
        return sortedData.sort((a, b) => a.name.common.localeCompare(b.name.common));
      default:
        return sortedData;
    }
  }, []);

  const fetchCountries = useCallback(async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,currencies,population,region,subregion,flags,area,unMember");
      const data = await response.json();
      // Sort the initial data by population (default)
      const sortedData = sortCountries(data, "Population");
      setCountryData(sortedData);
      setFilteredData(sortedData);
    } catch(error) {
      console.log(error);
    }
  }, [sortCountries]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  // Apply filters and sorting whenever regions, unMembership, sortBy, or countryData changes
  useEffect(() => {
    let filtered = [...countryData];

    // Apply UN membership filter
    if (unMembership === "UN") {
      filtered = filtered.filter(country => country.unMember === true);
    } else if (unMembership === "nonUN") {
      filtered = filtered.filter(country => country.unMember === false);
    }

    // Apply region filter
    if (regions.length > 0) {
      filtered = filtered.filter(country => regions.includes(country.region));
    }

    // Apply sorting
    const sortedAndFiltered = sortCountries(filtered, sortBy);
    setFilteredData(sortedAndFiltered);
  }, [countryData, regions, unMembership, sortBy, sortCountries]);

  const performSearch = useCallback((term) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }
    
    const filtered = filteredData.filter(country => 
      country.name?.common?.toLowerCase().includes(term.toLowerCase()) ||
      country.region?.toLowerCase().includes(term.toLowerCase()) ||
      country.subregion?.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(filtered);
  }, [filteredData]);

  const value = {
    regions,
    sortBy,
    searchResults,
    countryData: filteredData, // Use filteredData instead of raw countryData
    unMembership,
    changeSortBy,
    changeRegion,
    changeUnMembership,
    performSearch
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
};