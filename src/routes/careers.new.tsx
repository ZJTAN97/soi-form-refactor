import { Button, NumberInput, Stack, TextInput } from "@mantine/core";
import {
  createFormHook,
  createFormHookContexts,
  useForm,
} from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/careers/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      name: "",
      yearsOfService: 5,
    },
    validators: {
      onChange: z.object({
        name: z.string().min(1, "Required"),
        yearsOfService: z.number().min(1, "More than 1 year"),
      }),
    },
    onSubmit: ({ value }) => {
      console.log(value);
      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Stack h="50vh" justify="center" align="center" gap="md">
        <form.Field
          name="name"
          // biome-ignore lint/correctness/noChildrenProp: <explanation>
          children={(field) => (
            <TextInput
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.currentTarget.value)}
              label="Career Name"
              error={field.state.meta.errors[0]?.message}
            />
          )}
        />
        <form.Field
          name="yearsOfService"
          // biome-ignore lint/correctness/noChildrenProp: <explanation>
          children={(field) => (
            <NumberInput
              label="Years of Service"
              name={field.name}
              onChange={(e) => field.handleChange(e as number)}
              onBlur={field.handleBlur}
              value={field.state.value}
              error={field.state.meta.errors[0]?.message}
            />
          )}
        />
        <Button type="submit">Click Me</Button>
      </Stack>
    </form>
  );
}
