import {
  Button,
  Flex,
  NumberInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";

import { createFileRoute } from "@tanstack/react-router";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { DateInput } from "@mantine/dates";
import { zodResolver } from "@hookform/resolvers/zod";
import { careerRequestSchema } from "./-schema/career";
import { SourceOfInformationButton } from "./-components/SourceOfInformationButton";
import { SourceOfInformationArrayValue } from "./-components/SourceOfInformationArrayValue";
import { notifications } from "@mantine/notifications";

export const Route = createFileRoute("/careers/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const formMethods = useForm({
    mode: "onChange",
    resolver: zodResolver(careerRequestSchema),
    defaultValues: {
      company: "",
      lastDrawnSalary: null,
      joinDate: null as unknown as Date,
      appointment: {
        position: "",
        rank: "",
        sourceOfInformations: [],
      },
      skills: [],
      sourceOfInformations: [],
    },

    // Asynchronous values ( Edit Mode Test )
    // values: {
    //   company: "",
    //   lastDrawnSalary: 0,
    //   duration: null,
    //   appointment: {
    //     position: "",
    //     rank: "",
    //     sourceOfInformations: [],
    //   },
    //   skills: ["Docker", "Kubernetes"],
    //   sourceOfInformations: [],
    // },
  });

  const { handleSubmit } = formMethods;

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit((payload) => {
          console.log(payload);
          notifications.show({
            message: "Successfully submitted form",
          });
        })}
      >
        <Stack p="xl" gap="md">
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
                  required
                />
              )}
            />
          </SourceOfInformationButton>

          <SourceOfInformationButton
            name="joinDate"
            parentControl={formMethods.control}
          >
            <Controller
              control={formMethods.control}
              name="joinDate"
              render={({ field, fieldState }) => (
                <DateInput
                  {...field}
                  value={field.value as Date}
                  onChange={(date) => {
                    if (date) field.onChange(new Date(date));
                  }}
                  required
                  error={fieldState.error?.message}
                  label="Joined date"
                  placeholder="Salary"
                  valueFormat="DD MMM YYYY"
                />
              )}
            />
          </SourceOfInformationButton>

          <SourceOfInformationArrayValue name="skills">
            {(id) => (
              <SourceOfInformationButton
                name={`skills.${id}`}
                parentControl={formMethods.control}
              >
                <Controller
                  control={formMethods.control}
                  name={`skills.${id}`}
                  render={({ field, fieldState }) => (
                    <TextInput
                      label={`Skill ${id}`}
                      {...field}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </SourceOfInformationButton>
            )}
          </SourceOfInformationArrayValue>

          <SourceOfInformationButton
            name="lastDrawnSalary"
            parentControl={formMethods.control}
          >
            <Controller
              control={formMethods.control}
              name="lastDrawnSalary"
              render={({ field, fieldState }) => (
                <NumberInput
                  {...field}
                  value={field.value as number}
                  error={fieldState.error?.message}
                  label="Last drawn salary"
                  placeholder="Salary"
                />
              )}
            />
          </SourceOfInformationButton>

          <Stack py="md">
            <Text fw={600}>Appointment Details</Text>
            <SourceOfInformationButton
              name="appointment.position"
              parentControl={formMethods.control}
            >
              <Controller
                control={formMethods.control}
                name="appointment.position"
                render={({ field, fieldState }) => (
                  <TextInput
                    {...field}
                    error={fieldState.error?.message}
                    label="Position"
                  />
                )}
              />
            </SourceOfInformationButton>

            <SourceOfInformationButton
              name="appointment.rank"
              parentControl={formMethods.control}
            >
              <Controller
                control={formMethods.control}
                name="appointment.rank"
                render={({ field, fieldState }) => (
                  <TextInput
                    {...field}
                    error={fieldState.error?.message}
                    label="Rank"
                  />
                )}
              />
            </SourceOfInformationButton>
          </Stack>
        </Stack>

        <Flex justify="flex-end" w="40%" pt="xl" gap="md">
          <Button variant="default">Back</Button>
          <Button type="submit">Validate</Button>
        </Flex>
      </form>
    </FormProvider>
  );
}
