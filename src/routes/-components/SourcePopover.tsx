import {
  ActionIcon,
  Button,
  Card,
  CloseIcon,
  Flex,
  Popover,
  Select,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import {
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
  type Control,
} from "react-hook-form";
import {
  SOURCE_TYPES,
  sourceSchema,
  type SourceOfInformationType,
} from "../-schema/career";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export const SourcePopover = ({
  parentControl,
  handleUpdateSourcesOfInformation,
}: {
  parentControl: Control<SourceOfInformationType>;
  handleUpdateSourcesOfInformation: (payload: SourceOfInformationType) => void;
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isReadMode, setIsReadMode] = useState(true);

  const { append } = useFieldArray<SourceOfInformationType>({
    control: parentControl,
    name: "sources",
  });

  const { getValues } = useFormContext<SourceOfInformationType>();
  const currentSources = getValues("sources");

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(sourceSchema),
    defaultValues: {
      remarks: "",
      type: null,
    },
  });

  const addSource = handleSubmit((payload) => {
    append(payload);
    setIsReadMode(true);
    reset();
  });

  const addSourceOfInformation = () => {
    handleUpdateSourcesOfInformation({
      field: "company",
      content: "",
      sources: currentSources,
    });
    setIsPopoverOpen(false);
  };

  return (
    <Popover
      opened={isPopoverOpen}
      width="25%"
      position="right-start"
      withArrow
      shadow="md"
      closeOnClickOutside={false}
    >
      <Popover.Target>
        <ActionIcon
          variant="transparent"
          color="violet"
          mt="md"
          onClick={() => setIsPopoverOpen(true)}
        >
          <IconFile />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown p="lg">
        <Flex justify="space-between" align="center">
          <Text fw={500}>Source of Information</Text>
          <CloseIcon size="16" onClick={() => setIsPopoverOpen(false)} />
        </Flex>
        {isReadMode ? (
          <Stack pt="md">
            {currentSources.map((source) => (
              <Card key={source.remarks} withBorder radius="md" p="xs">
                <Text size="sm" fw={600}>
                  {source.type}
                </Text>
                <Text pt="xs" size="xs">
                  {source.remarks}
                </Text>
              </Card>
            ))}
            <Button
              onClick={() => setIsReadMode(false)}
              variant="outline"
              color="gray"
            >
              Add source of information
            </Button>
            <Button onClick={addSourceOfInformation}>Confirm and close</Button>
          </Stack>
        ) : (
          <form onSubmit={addSource}>
            <Stack py="md">
              <Controller
                control={control}
                name="type"
                render={({ field, fieldState }) => (
                  <Select
                    {...field}
                    error={fieldState.error?.message}
                    label="Source Type"
                    data={SOURCE_TYPES}
                  />
                )}
              />
              <Controller
                control={control}
                name="remarks"
                render={({ field, fieldState }) => (
                  <Textarea
                    {...field}
                    error={fieldState.error?.message}
                    label="Remarks"
                  />
                )}
              />
              <Flex justify="flex-end" pt="md">
                <Button type="submit">Create</Button>
              </Flex>
            </Stack>
          </form>
        )}
      </Popover.Dropdown>
    </Popover>
  );
};
