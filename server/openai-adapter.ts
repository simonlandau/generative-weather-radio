import OpenAI from "openai";
import { WeatherResponse } from "@/types/openweather";

export async function generateScript(weather: WeatherResponse) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "Respond with a local radio station's weather report based on the provided weather information. Your response should only contain the text to be spoken on the radio and mention the station name 'Generative Weather Radio'." },
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

