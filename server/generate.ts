"use server";

import { generateScript } from "./openai-adapter";
import { getGeocoding, getWeather } from "./openweather";

export const generateReport = async (prevState: any, formData: FormData) => {
  const city = formData.get("city") as string;

  try {
    const geocoding = await getGeocoding(city);
    if (geocoding.length === 0) {
      throw new Error("No geocoding results found");
    }
    const weather = await getWeather(geocoding[0].lat, geocoding[0].lon);
    const script = await generateScript(weather);

    return { script: script, status: "success", weather: weather };
  } catch (error) {
    console.error(error);
    return { script: "", status: "error", weather: null };
  }
};
