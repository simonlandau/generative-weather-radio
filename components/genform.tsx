"use client";

import { useFormStatus } from "react-dom";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

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
  return (
    <Button type="submit" disabled={pending}>{pending ? <Spinner className="fill-white dark:fill-black"/> : "Generate"}</Button>
  );
}
