import {
  ActionIcon,
  Box,
  Button,
  Flex,
  NumberInput,
  Popover,
  Stack,
  TextInput,
} from "@mantine/core";

import { createFileRoute } from "@tanstack/react-router";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { careerRequestSchema } from "./-schema/career";
import { SourceOfInformationButton } from "./-components/SourceOfInformationButton";

export const Route = createFileRoute("/careers/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const formMethods = useForm({
    resolver: zodResolver(careerRequestSchema),
    defaultValues: {
      company: "",
      lastDrawnSalay: 0,
      duration: null,
      appointment: {
        position: "",
        rank: "",
        sourceOfInformations: [],
      },
      skills: [],
      sourceOfInformations: [],
    },
  });

  console.log(formMethods.watch());

  return (
    <Stack p="xl">
      <FormProvider {...formMethods}>
        <form>
          <SourceOfInformationButton
            name="company"
            parentControl={formMethods.control}
          >
            <Controller
              control={formMethods.control}
              name="company"
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  error={fieldState.error?.message}
                  label="Company"
                  placeholder="Company name"
                />
              )}
            />
          </SourceOfInformationButton>
        </form>
      </FormProvider>
    </Stack>
  );
}
