import { NextRequest, NextResponse } from "next/server";
import { generateScript } from "@/server/openai-adapter";
import { generateAudio } from "@/server/openai-adapter";
import { WeatherData } from "@/types/openweather";
import { Voice } from "@/server/openai-adapter";

export async function POST(req: NextRequest) {
  // add error handling for invalid json response
  const { voice, data } = (await req.json()) as { voice: string; data: WeatherData };

  try {
    let voiceType: Voice;
    if (voice === "masculine") {
      voiceType = "onyx";
    } else if (voice === "feminine") {
      voiceType = "nova";
    } else if (voice === "neutral") {
      voiceType = "alloy";
    } else {
      throw new Error("Invalid voice type");
    }

    const script = await generateScript(data);
    const audioBuffer = await generateAudio(script!, voiceType);
    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
