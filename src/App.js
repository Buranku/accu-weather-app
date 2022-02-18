
import './App.css';
import React, {useEffect, useState} from "react";
import {Weather} from "./Weather";
import styles from "./styles.css";
import { LocationSearch } from './Location';

function App() {

  const [weatherInfo, setWeatherInfo] = useState();

  const [location, setLocation] = useState("");

  const[city, setCity] = useState("");



  const num= (num) =>{
    const stringNum = num + '';
    const stringLen = stringNum.length;

    if(stringLen===1){
      return'0' + stringNum;

    }
    else{
      return stringNum;
    }
  };
  useEffect(()=>{
    if(location){
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${location}?apikey=jdJtjY5LHZvdj0IS8iiRqturSfo6sjq3`
    )
    .then(res => res.json())
    .then(res => {setWeatherInfo(res.DailyForecasts.map(df=>{
      return{
        min: df.Temperature.Minimum.Value,
        max: df.Temperature.Maximum.Value,
        type: df.Day.IconPhrase,
        icon: num(df.Day.Icon)
      }
    }))
  });}
}, [location]);

  return (
    <div>
    <LocationSearch 
      onCity={cityInfo =>{
        setLocation(cityInfo.key);
        setCity(cityInfo.name);
      }}

    />



    <div className={styles.weather}>
      {!!weatherInfo && weatherInfo.map((i, index)=>(
        <div key={index} >
          <Weather min={i.min} max={i.max} type={i.type} icon={i.icon} city={city}></Weather>
        </div>
      ))}
    </div>
    </div>
  );
}

export default App;
