export function GenForm() {

  return (
    <form className="mt-8 flex flex-col items-center">
      <label htmlFor="latitude" className="text-lg font-bold mb-2">
        Latitude:
      </label>
      <input
        type="number"
        id="latitude"
        name="latitude"
        min="-90"
        max="90"
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
        className="w-48 p-2 border border-zinc-300 text-zinc-700 rounded-md mb-4"
        placeholder="Enter longitude"
      />

      <button
        type="submit"
        className="bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
}
