import OpenAI from "openai";
import { WeatherResponse } from "@/types/openweather";

export async function generateScript(weather: WeatherResponse) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are the weather correspondent for a Generative Weather Radio. You will be given weather data and your job is to generate a weather report for the radio station. Your response should only contain the text to be spoken on the radio should contain the stations name." },
      { role: "user", content: JSON.stringify(weather) },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}

export async function generateAudio(script: string) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "onyx",
    input: script,
    });
  return Buffer.from(await mp3.arrayBuffer());
}

