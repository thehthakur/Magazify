"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export default function Submission_Form() {
  return (
    <form className="flex max-w-md flex-col gap-4 mx-auto my-12">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Your Name" />
        </div>
        <TextInput
          id="name"
          type="name"
          placeholder="your name"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="large" value="Your article" />
        </div>
        <TextInput id="large" type="text" sizing="lg" />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
