import { Card } from "@/components/ui/card"
import { SVGProps } from "react"

interface WeatherCardProps {
  city: string
  temperature: string
  high: string
  low: string
  weather: string
}   

export default function WeatherCard({ city, temperature, high, low, weather }: WeatherCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto p-6 shadow-lg rounded-lg">
      <div className="flex w-full items-start mb-4">
        <div className="w-1/2 text-left">
          <h2 className="text-2xl font-bold">{city}</h2>
          <p />
        </div>
        <div className="flex w-1/2 items-center justify-start space-x-2">
          <ThermometerIcon className="w-6 h-6" />
          <span className="text-4xl font-bold">{temperature}°F</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-start">
          <p className="mb-1">High/Low</p>
          <p className="font-bold">{high}°F / {low}°F</p>
        </div>
        <div className="flex flex-col items-start">
          <p className="mb-1">Weather</p>
          <p className="font-bold">{weather}</p>
        </div>
      </div>
    </Card>
  );
}

function ThermometerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
    </svg>
  );
}