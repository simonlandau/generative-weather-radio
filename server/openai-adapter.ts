import OpenAI from "openai";
import { WeatherData } from "@/types/openweather";

export type Voice = "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";

// TODO: try changing prompts around
export const WEATHER_PROMPT =
  "You are the weather correspondent for Generative Weather Radio. You will be given weather data and your job is to generate a weather report for the radio station. All tempatures will be in fahrenheit. Your response should only contain the text to be spoken on the radio and should contain the stations name.";

// TODO: extract WeatherData from WeatherResponse before generating script
export async function generateScript(data: WeatherData) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: WEATHER_PROMPT },
      { role: "user", content: JSON.stringify(data) },
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
