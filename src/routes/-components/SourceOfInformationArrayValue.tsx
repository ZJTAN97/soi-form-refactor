import { Button, Flex, Stack, Text } from "@mantine/core";
import { useState, type ReactNode } from "react";
import { useFormContext } from "react-hook-form";

export const SourceOfInformationArrayValue = ({
  name,
  children,
}: {
  name: string;
  children: (id: number) => ReactNode;
}) => {
  const { getValues, setValue } = useFormContext();

  const currentValues = getValues(name) as string[];

  // Internal State management
  // To keep rendering down to component level
  const [_values, _setValues] = useState(currentValues);

  const appendFromArray = () => {
    setValue(name, [...getValues(name), ""] as any);
    _setValues([..._values, ""] as any);
  };

  const removeFromArray = (id: number) => {
    setValue(name, currentValues.filter((_, index) => index !== id) as any);
    _setValues((prevItems) => prevItems.filter((_, index) => index !== id));
  };

  return (
    <Stack py="md">
      <Text>Skills</Text>
      {_values.map((value: string, id: number) => (
        <Stack key={value + id}>
          {children(id)}
          <Flex justify="flex-end" w="40%">
            <Button
              size="compact-xs"
              variant="light"
              color="red.5"
              onClick={() => removeFromArray(id)}
            >
              Remove
            </Button>
          </Flex>
        </Stack>
      ))}
      <Flex>
        <Button size="xs" variant="default" onClick={appendFromArray}>
          Add more
        </Button>
      </Flex>
    </Stack>
  );
};
