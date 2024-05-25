import Panel from "@/components/panel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full">
      <h1 className="text-4xl font-bold">Generative Weather Radio</h1>
      <p className="text-2xl font-bold">
        Tune in to a generative weather report from any location, 24/7.
      </p>
      <Panel />
    </main>
  );
}
