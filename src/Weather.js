import styles from "./styles.css";
export const Weather= ({min, max, type, icon, city})=>{

    let averageF = (min+max)/2;
    let averageC = Math.floor(((averageF-32)*5)/9);

    const getBackgroundColor = (value) => {
        let color;
        if (value <= -20) {
            color = '#6BBCD1';
        } else if (value<=0) {
            color = '#002947';
        } else if (value <= 15) {
            color = '#FFF2CE';
        } else if (value <= 30) {
            color = '#FD9415';
        } else if (value > 30) {
            color = '#E23201';
        }
        return color;
    };

    return(
        <div className="weather" style={{backgroundColor: getBackgroundColor(averageC)}}>
            <h1>{city}</h1>
            <div className="celsius">{averageC} °C</div>
            <img src={`https://developer.accuweather.com/sites/default/files/${icon}-s.png`} alt={type} />
            <p>{type} </p>
            
        </div>
    );
};


