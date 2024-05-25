"use server";

import { generateAudio, generateScript } from "./openai-adapter";
import { getWeather } from "./openweather";

export const generateReport = async (prevState: any, formData: FormData) => {
  const latitude = parseFloat(formData.get("latitude") as string);
  const longitude = parseFloat(formData.get("longitude") as string);

  if (isNaN(latitude) || isNaN(longitude)) {
    console.error("Invalid latitude or longitude");
    return { script: "", status: "error", audio: null };
  }

  try {
    const weather = await getWeather(latitude, longitude);
    const script = await generateScript(weather);
    const audio = await generateAudio(script!);

    return { script: script, status: "success", audio: audio };
  } catch (error) {
    console.error(error);
    return { script: "", status: "error", audio: null };
  }
};
