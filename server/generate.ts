"use server";

import { getGeocoding, getWeather } from "./openweather";

export const generateReport = async (prevState: any, formData: FormData) => {
  
  // add error handling
  const city = formData.get("city") as string;
  const voice = formData.get("voice") as string;

  try {
    const geocoding = await getGeocoding(city);
    if (geocoding.length === 0) {
      throw new Error("No geocoding results found");
    }
    const weather = await getWeather(geocoding[0].lat, geocoding[0].lon);

    return { voice: voice, status: "success", weather: weather };
  } catch (error) {
    console.error(error);
    return { voice: "", status: "error", weather: null };
  }
};
