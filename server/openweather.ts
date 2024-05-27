import { WeatherResponse, GeocodingResponse, AirPollutionResponse } from "@/types/openweather";

const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEO_BASE_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const AIR_POLLUTION_BASE_URL = 'http://api.openweathermap.org/data/2.5/air_pollution';


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
      throw new Error('An unknown error occurred');
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
      throw new Error('An unknown error occurred');
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
      throw new Error('An unknown error occurred');
    }
  }
}


