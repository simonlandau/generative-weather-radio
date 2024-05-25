"use client";

import { useFormStatus } from "react-dom";

interface GenFormProps {
  formAction: (payload: FormData) => void;
}

export function GenForm({ formAction }: GenFormProps) {
  return (
    <form action={formAction} className="mt-8 flex flex-col items-center">
      <label htmlFor="city" className="text-lg font-bold mb-2">
        City Name:
      </label>
      <input
        type="text"
        id="city"
        name="city"
        className="w-48 p-2 border border-zinc-300 text-zinc-700 rounded-md mb-4"
        placeholder="Enter city name"
      />

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  let buttonMessage = pending ? "Loading..." : "Submit";

  return (
    <button
      type="submit"
      className="bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded"
    >
      {buttonMessage}
    </button>
  );
}
