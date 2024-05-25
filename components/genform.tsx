"use client";

import { generateReport } from "@/server/generate";
import { useFormStatus, useFormState } from "react-dom";

const initialState = {
  script: "",
  status: "init",
  weather: null
};

// TODO: refactor all this, move the state to the parent component
export function GenForm() {
  const [state, formAction] = useFormState(generateReport, initialState);

  if(state.status === "success") {
    return (
      <div>{state.script}</div>
    );
  }

  return (
    <form action={formAction} className="mt-8 flex flex-col items-center">
      <label htmlFor="latitude" className="text-lg font-bold mb-2">
        Latitude:
      </label>
      <input
        type="number"
        id="latitude"
        name="latitude"
        min="-90"
        max="90"
        step="any"
        className="w-48 p-2 border border-zinc-3000 text-zinc-700 rounded-md mb-4"
        placeholder="Enter latitude"
      />

      <label htmlFor="longitude" className="text-lg font-bold mb-2">
        Longitude:
      </label>
      <input
        type="number"
        id="longitude"
        name="longitude"
        min="-180"
        max="180"
        step="any"
        className="w-48 p-2 border border-zinc-300 text-zinc-700 rounded-md mb-4"
        placeholder="Enter longitude"
      />

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  let buttonMessage = pending ? "Loading..." : "Subscribe";

  return (
    <button
      type="submit"
      className="bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded"
    >
      Submit
    </button>
  );
}
