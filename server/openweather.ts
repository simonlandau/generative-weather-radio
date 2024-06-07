import { WeatherResponse, GeocodingResponse, AirPollutionResponse, WeatherData } from "@/types/openweather";

const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const GEO_BASE_URL = "https://api.openweathermap.org/geo/1.0/direct";
const AIR_POLLUTION_BASE_URL = "http://api.openweathermap.org/data/2.5/air_pollution";

export async function getWeather(latitude: number, longitude: number): Promise<WeatherResponse> {
  try {
    const response = await fetch(`${WEATHER_BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}&units=imperial`);
    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }
    const data: WeatherResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getAirPollution(latitude: number, longitude: number): Promise<AirPollutionResponse> {
  try {
    const response = await fetch(`${AIR_POLLUTION_BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch air pollution data: ${response.statusText}`);
    }
    const data: AirPollutionResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch air pollution data: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getGeocoding(cityName: string): Promise<GeocodingResponse[]> {
  try {
    const response = await fetch(`${GEO_BASE_URL}?q=${encodeURIComponent(cityName)}&appid=${process.env.OPENWEATHER_API_KEY}&limit=1`);
    if (!response.ok) {
      throw new Error(`Failed to fetch geocoding data: ${response.statusText}`);
    }
    const data: GeocodingResponse[] = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch geocoding data: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export function parseWeatherData(weather: WeatherResponse, geocoding: GeocodingResponse, pollution?: AirPollutionResponse): WeatherData {
  return {
    location: geocoding.name,
    country: geocoding.country,
    state: geocoding.state,
    description: weather.weather[0].description,
    temperature: Math.round(weather.main.temp),
    feels_like: Math.round(weather.main.feels_like),
    min_temperature: Math.round(weather.main.temp_min),
    max_temperature: Math.round(weather.main.temp_max),
    pressure: weather.main.pressure,
    humidity: weather.main.humidity,
    visibility: weather.visibility,
    wind: weather.wind,
    cloud_coverage: weather.clouds.all,
    rain: weather.rain,
    snow: weather.snow,
    air_pollution: pollution
      ? {
          air_quality_index: pollution.list[0].main.aqi,
          co: pollution.list[0].components.co,
          no: pollution.list[0].components.no,
          no2: pollution.list[0].components.no2,
          o3: pollution.list[0].components.o3,
          so2: pollution.list[0].components.so2,
          pm2_5: pollution.list[0].components.pm2_5,
          pm10: pollution.list[0].components.pm10,
          nh3: pollution.list[0].components.nh3,
        }
      : undefined,
  };
}
