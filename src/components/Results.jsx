import { useCountry } from './CountryContext';
import '../style/Results.css'

const Results = () => {
    const { countryData, searchResults } = useCountry();
    
    const displayData = searchResults.length > 0 ? searchResults : countryData;
    const usedData = displayData.slice(0, 15);
    
    // Add safety check
    if (!usedData || usedData.length === 0) {
        return (
            <div className="results">
                <p>No countries found</p>
            </div>
        );
    }

    return (
        <div className="results">
            <table>
                <thead>
                    <tr>
                        <th>Flag</th>
                        <th>Name</th>
                        <th>Population</th>
                        <th>Area</th>
                        <th>Region</th>
                    </tr>
                </thead>
                <tbody>
                    {usedData.map((country) => (
                        <tr key={country.name?.common || country.cca3}>
                            <td>
                                {country.flags && (
                                    <img 
                                        src={country.flags.png} 
                                        alt={`Flag of ${country.name?.common || 'Unknown'}`} 
                                        width="60" 
                                        height="35" 
                                    />
                                )}
                            </td>
                            <td>{country.name?.common || 'Unknown'}</td>
                            <td>{country.population?.toLocaleString()}</td>
                            <td>{country.area?.toLocaleString()}</td>
                            <td>{country.region}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Results;