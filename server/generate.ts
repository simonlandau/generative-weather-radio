"use server";

import { getAirPollution, getGeocoding, getWeather, parseWeatherData } from "./openweather";

export const generateReport = async (prevState: any, formData: FormData) => {
  const city = formData.get("city") as string;
  const voice = formData.get("voice") as string;
  const air_pollution = formData.get("air_pollution") as string;

  try {
    if (!/^[a-zA-Z\u0080-\u024F\s\/\-\(\)`\."']+$/.test(city)) {
      throw new Error("Invalid location name");
    }
    const geocoding = await getGeocoding(city);
    if (geocoding.length === 0) {
      throw new Error("No location found");
    }
    let weather = await getWeather(geocoding[0].lat, geocoding[0].lon);
    if (air_pollution === "on") {
      const air = await getAirPollution(geocoding[0].lat, geocoding[0].lon);
      let data = parseWeatherData(weather, geocoding[0], air);
      return { voice: voice, status: "success", data: data, message: "" };
    }
    let data = parseWeatherData(weather, geocoding[0]);
    return { voice: voice, status: "success", data: data, message: "" };
  } catch (error) {
    console.error(error);
    return { voice: "", status: "error", data: null, message: (error as Error).message };
  }
};
