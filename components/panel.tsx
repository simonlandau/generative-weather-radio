"use client";

import { generateReport } from "@/server/generate";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { GenForm } from "./genform";

const initialState = {
  script: "",
  status: "init",
  weather: null,
};

export default function Panel() {
  const [state, formAction] = useFormState(generateReport, initialState);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // maybe make this a custom hook
  useEffect(() => {
    const fetchAudio = async (script: string) => {
      try {
        const response = await fetch(`/api/report?script=${encodeURIComponent(script)}`);
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

    if (state.status === "success" && state.script) {
      fetchAudio(state.script!);
    }
  }, [state.script, state.status]);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center justify-center">
        <p>{state.script}</p>
        {audioUrl && <audio controls src={audioUrl} />}
      </div>
    );
  }

  return <GenForm formAction={formAction} />;
}
