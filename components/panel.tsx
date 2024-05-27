"use client";

import { generateReport } from "@/server/generate";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { GenForm } from "./genform";
import WeatherCard from "./weathercard";
import { Spinner } from "./ui/spinner";
import { Button } from "./ui/button";
import { AirPollutionResponse, WeatherResponse } from "@/types/openweather";

const initialState = {
  voice: "",
  status: "init",
  weather: null,
  air: null,
  message: ""
};

export default function Panel() {
  const [state, formAction] = useFormState(generateReport, initialState);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const fetchAudio = async (voice: string, weather: WeatherResponse, air?: AirPollutionResponse) => {
    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voice, weather, air }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate audio");
      }
      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (state.status === "success" && state.weather != null && !audioUrl) {
      console.log("generating audio")
      if (state.air != null) {
        fetchAudio(state.voice, state.weather, state.air);
      } else {
        fetchAudio(state.voice, state.weather);
      }
    }
  }, [state, audioUrl]);

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Generative Weather Radio
            </h1>
            <p className="mx-auto max-w-[700px] md:text-xl text-zinc-700 dark:text-zinc-300">
              Tune in to a AI generated weather broadcast from the city of your choice.
            </p>
          </div>
          {state.status === "success" && state.weather && (
            <WeatherCard
              city={state.weather.name}
              temperature={state.weather.main.temp.toString()}
              high={state.weather.main.temp_max.toString()}
              low={state.weather.main.temp_min.toString()}
              weather={state.weather.weather[0].description}
            />
          )}
          {state.status === "success" && audioUrl && (
            <>
            <audio controls src={audioUrl} className="mt-10" />
              <Button variant="secondary" onClick={() => window.location.reload()}>
                Reset
              </Button>
            </>
          )}
          {state.status === "success" && !audioUrl && (
            <div className="flex items-center">
              <Spinner className="fill-black dark:fill-white" />
              <p className="ml-2">generating audio...</p>
            </div>
          )}
          {state.status !== "success" && <GenForm formAction={formAction} message={state.message} />}
        </div>
      </div>
    </section>
  );
}
