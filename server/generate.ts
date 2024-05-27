"use server";

import { getAirPollution, getGeocoding, getWeather } from "./openweather";

export const generateReport = async (prevState: any, formData: FormData) => {
  
  // add error handling
  const city = formData.get("city") as string;
  const voice = formData.get("voice") as string;
  const air_pollution = formData.get("air_pollution") as string;

  try {
    const geocoding = await getGeocoding(city);
    if (geocoding.length === 0) {
      throw new Error("No geocoding results found");
    }
    let weather = await getWeather(geocoding[0].lat, geocoding[0].lon);
    if (air_pollution === "on") {
      const air = await getAirPollution(geocoding[0].lat, geocoding[0].lon);
      return { voice: voice, status: "success", weather: weather, air: air };
    }
    return { voice: voice, status: "success", weather: weather, air: null };
  } catch (error) {
    console.error(error);
    return { voice: "", status: "error", weather: null, air: null };
  }
};
