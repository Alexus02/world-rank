import { useEffect, useState } from "react";
import "../style/Sorting.css"
import { useCountry } from './CountryContext';

const Sorting = () => {
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [selectedUnMembership, setSelectedUnMembership] = useState(null);
    
    const { changeRegion, changeSortBy, changeUnMembership } = useCountry();

    const handleRegionChange = (region, isChecked) => {
        setSelectedRegions(prev => 
            isChecked 
                ? [...prev, region]
                : prev.filter(r => r !== region)
        );
    };

    const handleUnMembershipChange = (value) => {
        const newValue = selectedUnMembership === value ? null : value;
        setSelectedUnMembership(newValue);
        changeUnMembership(newValue);
    };

    useEffect(() => {
        changeRegion(selectedRegions);
    }, [selectedRegions]);

    return (
        <div className="Sorting">
            <div className="first-section">
                <label htmlFor="sort">Sort by</label><br/>
                <select name="sort" id="sort" onChange={(e) => changeSortBy(e.target.value)}>
                    <option value="Population">Population</option>
                    <option value="alphabetical">Alphabetical Order</option>
                    <option value="area">Area</option>
                </select>
            </div>
        
            <div className="region">      
                <p>Region</p> 
                <div className="continents">
                    <input type="checkbox" id="Americas" value="Americas" onChange={(e) => handleRegionChange(e.target.value, e.target.checked)}/>
                    <label htmlFor="Americas">Americas</label>
                    
                    <input type="checkbox" id="Antarctic" value="Antarctic" onChange={(e) => handleRegionChange(e.target.value, e.target.checked)}/>
                    <label htmlFor="Antarctic">Antarctic</label>
                    
                    <input type="checkbox" id="Europe" value="Europe" onChange={(e) => handleRegionChange(e.target.value, e.target.checked)}/>
                    <label htmlFor="Europe">Europe</label>
                    
                    <input type="checkbox" id="Asia" value="Asia" onChange={(e) => handleRegionChange(e.target.value, e.target.checked)}/>
                    <label htmlFor="Asia">Asia</label>
                    
                    <input type="checkbox" id="Africa" value="Africa" onChange={(e) => handleRegionChange(e.target.value, e.target.checked)}/>
                    <label htmlFor="Africa">Africa</label>
                    
                    <input type="checkbox" id="Oceania" value="Oceania" onChange={(e) => handleRegionChange(e.target.value, e.target.checked)}/>
                    <label htmlFor="Oceania">Oceania</label>
                </div> 
            </div>
            
            <div className="UN-membership">
                <input 
                    type="radio" 
                    id="UN" 
                    name="member" 
                    value="UN" 
                    checked={selectedUnMembership === "UN"}
                    onChange={(e) => handleUnMembershipChange(e.target.value)}
                />
                <label htmlFor="UN">
                    <div className="check"></div>
                    <span>Member of the United Nations</span>
                </label>
                <br/>
                <input 
                    type="radio" 
                    id="nonUN" 
                    name="member" 
                    value="nonUN" 
                    checked={selectedUnMembership === "nonUN"}
                    onChange={(e) => handleUnMembershipChange(e.target.value)}
                />
                <label htmlFor="nonUN">
                    <div className="check"></div>
                    <span>Independent</span>
                </label>
            </div>
        </div>
    )
}

export default Sorting;