import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [temp, setTemp] = useState([]);
  const [city, setCity] = useState("");
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let { latitude, longitude } = position.coords;
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=ae59e318fd0b4392d31ede47cf68de90`
      );
      setTemp(weatherResponse.data.main.temp);
      const locationResponse = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=a11fddd7a4754deba4dc46f3e4f32a42`
      );
      setCity(locationResponse.data.results[0].components.city);
    });
    
  }, []);

  return (
    <div data-cy="weather-display">
      <h4 data-cy="temp">Temperature: {temp}°C </h4>
      <h4 data-cy="city">City: {city} </h4>
    </div>
  );
};

export default App;
