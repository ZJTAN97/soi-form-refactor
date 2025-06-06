import type { ReactNode } from "@tanstack/react-router";

import { SourcePopover } from "./SourcePopover";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  type Control,
} from "react-hook-form";
import { Box, Flex } from "@mantine/core";
import {
  sourceOfInformationSchema,
  type CareerRequestType,
  type SourceOfInformationType,
} from "../-schema/career";
import { zodResolver } from "@hookform/resolvers/zod";

export const SourceOfInformationButton = ({
  name,
  parentControl,
  children,
}: {
  name: string;
  parentControl: Control<CareerRequestType>;
  children: ReactNode;
}) => {
  const { append, update } = useFieldArray<CareerRequestType>({
    name: "sourceOfInformations",
    control: parentControl,
  });

  const { getValues } = useFormContext<CareerRequestType>();
  const currentSourcesOfInformation = getValues("sourceOfInformations");

  const existingSourceOfInformationIndex =
    currentSourcesOfInformation.findIndex((soi) => soi.field === name);

  const handleUpdateSourcesOfInformation = (
    payload: SourceOfInformationType
  ) => {
    if (existingSourceOfInformationIndex === -1) {
      // create scenario
      append(payload);
    } else {
      update(existingSourceOfInformationIndex, payload);
    }
  };

  const formMethods = useForm({
    resolver: zodResolver(sourceOfInformationSchema),
    defaultValues: {
      field: name,
      content: "",
      sources: [],
    },
  });

  return (
    <FormProvider {...formMethods}>
      <Flex align="center" gap="lg">
        <Box w="40%">{children}</Box>
        <SourcePopover
          name={name}
          parentControl={formMethods.control}
          handleUpdateSourcesOfInformation={handleUpdateSourcesOfInformation}
        />
      </Flex>
    </FormProvider>
  );
};
