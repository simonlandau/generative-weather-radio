"use client";

import { useFormStatus } from "react-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface GenFormProps {
  formAction: (payload: FormData) => void;
}

export function GenForm({ formAction }: GenFormProps) {
  return (
    <Card>
      <form action={formAction}>
      <CardHeader>
        <CardTitle>Generate Weather Radio</CardTitle>
        <CardDescription>Tune in to a generative weather report from any city, 24/7</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Input placeholder="Enter city name" type="text" name="city" />
        <SubmitButton />
      </CardContent>
      </form>
    </Card>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  let buttonMessage = pending ? "Loading..." : "Generate";

  return (
    <Button type="submit">{buttonMessage}</Button>
  );
}
