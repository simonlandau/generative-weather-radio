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
      <CardContent className="flex flex-col p-6 space-y-4">
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
