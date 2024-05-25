import OpenAI from "openai";
import { WeatherResponse } from "@/types/openweather";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateScript(weather: WeatherResponse) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "Respond with a local radio station's weather report based on the provided weather information. Only respond with the text to be spoken by the radio announcer and explain all the details in plain english with a light tone." },
      { role: "user", content: JSON.stringify(weather) },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}

export async function generateAudio(script: string) {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "onyx",
      input: "Today is a wonderful day to build something people love!",
    });
    return Buffer.from(await mp3.arrayBuffer());
}

