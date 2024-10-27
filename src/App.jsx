import Box from '@mui/material/Box';
import './App.css';
import wind from './images/wind.png'
import clear from './images/clear.png'
import cloud from './images/clouds.png'
import drizzle from './images/drizzle.png'
import humidityIcon from './images/humidity.png'
import windSpeedIcon from './images/wind.png'
import mist from './images/mist.png';
import smoke from './images/smoke.png';
import rain from './images/rain.png'
import snow from './images/snow.png'
import haze from './images/haze.png'
import searchImg from './images/search.png'
import {useState} from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
export const App = () => {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState('');
  const [cityExist, setCityExist] = useState(false);

  const [weatherData, setWeatherData] = useState({
    windSpeed: '',
    temperature: '',
    humidity: '',
    cityName: '',
    weatherCondition: '',
    loading: true
  })
  const [forecast, setForecast] = useState([]);

  const weatherImages = {
    wind: wind,
    clear: clear,
    clouds: cloud,
    smoke: smoke,
    mist: mist,
    drizzle: drizzle,
    rain: rain,
    haze: haze,
    snow: snow,
  };
  const getForecast = () => {
    setWeatherData({...weatherData,loading: true})
    axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=c2c86d3965843e44f8b252b051c9334d`)
      .then(res => {
        setWeatherData(prevState => ({
          ...prevState, // Preserve the previous state values
          windSpeed: res.data.wind.speed,
          temperature: res.data.main.temp,
          humidity: res.data.main.humidity,
          cityName: res.data.name,
          weatherCondition: `${res.data.weather[0].main}`,
          loading: false // Ensure loading is set to false once data is fetched
        }));
        
        const { lon, lat } = res.data.coord;
        console.log(res.data);
        
        return axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=c2c86d3965843e44f8b252b051c9334d`
        );
        // console.log(res.data);
      })
      .then((res) => { 
        const filteredForecast = res.data.list.filter((forecast) =>
          forecast.dt_txt.includes('12:00:00') // Filter for entries at 12:00 PM each day
        );
        setForecast(filteredForecast);
        setTimeout(() => {
          console.log(forecast);
        }, 2000);
        setCityExist(true);
      })
      .catch(err => {
        console.log(err);
        setOpen(true);
        setCityExist(false);
        setWeatherData(prevState => ({ ...prevState, loading: false }));
      })
  }

  const handleClose = (event, reason) => {
    setOpen(false);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getForecast(); // Call the forecast function when Enter is pressed
    }
  };
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Please enter a valid city name!
        </Alert>
      </Snackbar>
      <Box sx={{ width: '100%' }} className="card">
        <Box className="search">
          <input type="text" autoFocus placeholder="enter city name.."  value={city} onChange={(e)=>setCity(e.target.value)} onKeyDown={handleKeyPress}/>
          <button className="search-button"><img src={searchImg} alt="search-image" onClick={getForecast} /></button>
        </Box>
        {cityExist &&
        <Stack spacing={{xs:'20px',sm:'20px',md:'20px',lg:'20px'}} sx={{paddingTop: '3em',justifyContent:'space-between',flexDirection:{xs:'column',sm:'column',md: 'row',lg:'row',xl:'row'}}}>
          <Stack spacing={2} sx={{ width: {xsl: '100%',sm: '100%', md: '50%',lg: '50%',xl: '50%'}}} className="weather">
            <h2 className="city">{weatherData.cityName}</h2>
            <h1 className="temp">{Math.round(weatherData.temperature)}°C</h1>
            <Stack direction='row' spacing={3} sx={{alignItems: 'center'}}>
              <img src={weatherImages[weatherData.weatherCondition.toLowerCase()]} alt="weather-icon" className="weather-icon"/>
              <p className='weather-condition'>{weatherData.weatherCondition}</p>
            </Stack>
            <Stack direction='row' spacing={5}  className="details">
                <Box className="forecast-data">
                    <img src={humidityIcon} alt="humidity icon"/>
                    <div>
                      <p className="humidity">{weatherData.humidity}%</p>
                      <p>Humidity</p>
                    </div>
                </Box>
                <Box  className="forecast-data">
                    <img src={windSpeedIcon} alt="wind speed icon"/>
                    <div>
                        <p className="wind">{weatherData.windSpeed} km/h</p>
                        <p>Wind Speed</p>
                    </div>
                </Box>
            </Stack>
          </Stack>
          <Box className="forecast" sx={{ width: {xsl: '100%',sm: '100%', md: '40%',lg: '40%',xl: '40%'} }}>
            <Box sx={{ display: 'block'}} className="forecast-container">
              {forecast.slice(0, 40).map((dayForecast, index) => (
                <Stack direction='row' spacing={2} sx={{justifyContent: 'space-evenly',alignItems: 'center'}} key={index} className="forecast-item">
                  <Box >
                    <p>{new Date(dayForecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }).slice(0,3)}</p>
                  </Box>
                  <img
                      src={weatherImages[dayForecast.weather[0].main.toLowerCase()]}
                      alt={dayForecast.weather[0].main}
                      className="forecast-icon"
                    />
                    <p>{dayForecast.weather[0].main}</p>
                    <p>{Math.round(dayForecast.main.temp_max)} / {Math.round(dayForecast.main.temp_min)}</p>
                </Stack>
              ))}
            </Box>
          </Box>
        </Stack>
        }
      </Box>
    </>
  );
}

