import OpenAI from "openai";
import { WeatherResponse } from "@/types/openweather";

export enum Voice {
  Alloy = "alloy",
  Echo = "echo",
  Fable = "fable",
  Onyx = "onyx",
  Nova = "nova",
  Shimmer = "shimmer",
}


export async function generateScript(weather: WeatherResponse, voice: Voice) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are the weather correspondent for Generative Weather Radio. You will be given weather data and your job is to generate a weather report for the radio station. Your response should only contain the text to be spoken on the radio and should contain the stations name." },
      { role: "user", content: JSON.stringify(weather) },
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

