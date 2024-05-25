"use server";

import { getWeather } from "./openweather";

export const generateReport = async (prevState: any, formData: FormData) => {

    console.log("Generating report...");
  const latitude = parseFloat(formData.get("latitude") as string);
  const longitude = parseFloat(formData.get("longitude") as string);

  if (isNaN(latitude) || isNaN(longitude)) {
    console.error("Invalid latitude or longitude");
    return {weather: null, status: "error"};
  }

  try {
    const weather = await getWeather(latitude, longitude);
    return {weather: weather, status: "success"};
  } catch (error) {
    console.error(error);
    return {weather: null, status: "error"};
  }

};

