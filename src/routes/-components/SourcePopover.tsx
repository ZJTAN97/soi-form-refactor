import {
  ActionIcon,
  Box,
  Button,
  Card,
  CloseIcon,
  Flex,
  Popover,
  ScrollArea,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
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
  name,
  parentControl,
  handleUpdateSourcesOfInformation,
}: {
  name: string;
  parentControl: Control<SourceOfInformationType>;
  handleUpdateSourcesOfInformation: (payload: SourceOfInformationType) => void;
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "update" | "read">("read");
  const [currentSourceId, setCurrentSourceId] = useState<number | undefined>();

  const { append, remove, update } = useFieldArray<SourceOfInformationType>({
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

  const handleSubmitSource = handleSubmit((payload) => {
    if (mode === "create") {
      append(payload);
    }

    if (mode === "update" && currentSourceId !== undefined) {
      update(currentSourceId, payload);
    }

    reset();
    setMode("read");
  });

  const addSourceOfInformation = () => {
    handleUpdateSourcesOfInformation({
      field: name,
      content: "",
      sources: currentSources,
    });
    setIsPopoverOpen(false);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
    reset();
    setMode("read");
  };

  return (
    <Popover
      opened={isPopoverOpen}
      width="25%"
      position="right-start"
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <Box
          variant="transparent"
          color="violet"
          mt={26}
          onClick={() => setIsPopoverOpen(true)}
        >
          {currentSources.length > 0 ? (
            <TextInput
              readOnly
              value={`${currentSources.length} source(s)`}
              size="xs"
              w={100}
            />
          ) : (
            <IconFile />
          )}
        </Box>
      </Popover.Target>
      <Popover.Dropdown p="lg">
        <Flex justify="space-between" align="center">
          <Text fw={500}>Source of Information</Text>
          <CloseIcon size="16" onClick={closePopover} />
        </Flex>
        {mode === "read" ? (
          <Stack pt="md">
            <ScrollArea type="always" h={200} scrollbarSize={5}>
              <Stack pr="lg">
                {currentSources.map((source, id) => (
                  <Card key={source.remarks} withBorder radius="md" p="md">
                    <Flex justify="space-between">
                      <Text size="sm" fw={600}>
                        {source.type}
                      </Text>
                      <CloseIcon size="16" onClick={() => remove(id)} />
                    </Flex>

                    <Text pt="xs" size="xs">
                      {source.remarks}
                    </Text>

                    <Flex justify="flex-end" pt="xs">
                      <Button
                        variant="default"
                        size="compact-xs"
                        onClick={() => {
                          setMode("update");
                          setCurrentSourceId(id);
                          reset(source);
                        }}
                      >
                        Edit
                      </Button>
                    </Flex>
                  </Card>
                ))}
              </Stack>
            </ScrollArea>
            <Button
              onClick={() => setMode("create")}
              color="gray"
              mr="md"
              size="xs"
            >
              Add source of information
            </Button>
            <Button size="xs" mr="md" onClick={addSourceOfInformation}>
              Confirm and close
            </Button>
          </Stack>
        ) : (
          <form onSubmit={handleSubmitSource}>
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
              {mode === "create" ? (
                <Flex justify="flex-end" pt="md">
                  <Button type="submit">Create</Button>
                </Flex>
              ) : mode === "update" ? (
                <Flex pt="md" justify="space-between">
                  <Button color="red">Delete</Button>
                  <Button type="submit">Update</Button>
                </Flex>
              ) : null}
            </Stack>
          </form>
        )}
      </Popover.Dropdown>
    </Popover>
  );
};
