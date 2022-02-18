import {useState} from "react";
import styles from "./styles.css";

export const LocationSearch = ({onCity}) =>{

    const[city, setCity] = useState("");
    const[error, setError] = useState();
    const[hovering, setHovering] = useState(false);
    const[citystate, setCitystate] = useState();

    const getLocation = (ct) =>{
        setCitystate(ct);

        const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=jdJtjY5LHZvdj0IS8iiRqturSfo6sjq3&q=${ct}`;
        fetch(url)
        
        .then(res=> {
            if(!res.ok){
                throw Error("Could not find the city");
            }
            setError(false);
            return res.json();
        })
        
        .then(res=>res[0])
        .then(res=> {onCity({
            name: res.EnglishName,
            key: res.Key,
        });
        setCity("");
        }).catch(e => {
            setError(e.message);
        })
    };

    return(
        <div className="text">
            <input
            placeholder="Enter the name of a city"
            value={city}
            onChange={a=> setCity(a.target.value)}
             />
            <button onMouseEnter={()=>{setHovering(true)}} onMouseLeave={()=>{setHovering(false)}} style={{backgroundColor: hovering ? "#99ccff" : "#3269ce"}} onClick={()=>getLocation(city)}>Show weather info</button>
            {error && <div>Could not find the city "{citystate}", please check that you wrote it correctly</div>}
        </div>
    )
}