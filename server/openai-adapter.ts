import OpenAI from "openai";
import { AirPollutionResponse, WeatherResponse } from "@/types/openweather";

export type Voice = "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";

// todo: try changing prompts around
export const WEATHER_PROMPT ="You are the weather correspondent for Generative Weather Radio. You will be given weather data and your job is to generate a weather report for the radio station. Your response should only contain the text to be spoken on the radio and should contain the stations name."
export const AIR_PROMPT="You are the weather correspondent for Generative Weather Radio. You will be given weather data and your job is to generate a weather report for the radio station. You will also be given air quality data and should include it in your response. Your response should only contain the text to be spoken on the radio and should contain the stations name."

export async function generateScript(weather: WeatherResponse, air?: AirPollutionResponse) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: air ? AIR_PROMPT : WEATHER_PROMPT },
      { role: "user", content: air ? JSON.stringify( { weather, air: air.list[0] }) : JSON.stringify(weather) },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}

export async function generateAudio(script: string, voice: Voice) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: voice,
    input: script,
  });
  return Buffer.from(await mp3.arrayBuffer());
}

