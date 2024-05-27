"use server";

import { getAirPollution, getGeocoding, getWeather } from "./openweather";

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
      return { voice: voice, status: "success", weather: weather, air: air, message: "" };
    }
    return { voice: voice, status: "success", weather: weather, air: null, message: "" };
  } catch (error) {
    console.error(error);
    return { voice: "", status: "error", weather: null, air: null, message: (error as Error).message };
  }
};
