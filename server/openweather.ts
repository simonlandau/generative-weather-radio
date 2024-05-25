import { WeatherResponse } from "@/types/openweather";

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function getWeather(latitude: number, longitude: number): Promise<WeatherResponse> {
  try {
    const response = await fetch(`${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}&units=imperial`);
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

