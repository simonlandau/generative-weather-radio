"use client";

import { useFormStatus } from "react-dom";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { Checkbox } from "./ui/checkbox";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GenFormProps {
  formAction: (payload: FormData) => void;
}

export function GenForm({ formAction }: GenFormProps) {
  return (
    <Card>
      <form action={formAction}>
        <CardContent className="flex flex-col p-6 space-y-4">
          <Input
            placeholder="Enter city name"
            type="text"
            name="city"
            required
          />
          <Select name="voice" required>
            <SelectTrigger>
              <SelectValue placeholder="voice" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="masculine">masculine</SelectItem>
              <SelectItem value="feminine">feminine</SelectItem>
              <SelectItem value="neutral">neutral</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center justify-start space-x-2">
            <Checkbox name="air_pollution" id="air_pollution" />
            <label htmlFor="air_pollution" className="text-sm">
              include air pollution
            </label>
          </div>
          <SubmitButton />
        </CardContent>
      </form>
    </Card>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <Spinner className="fill-white dark:fill-black" />
      ) : (
        "Generate"
      )}
    </Button>
  );
}
