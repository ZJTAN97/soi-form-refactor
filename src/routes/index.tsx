import { createFileRoute, Link } from "@tanstack/react-router";
import "../App.css";
import { Stack } from "@mantine/core";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <Stack h="50vh" align="center" flex="center">
      <Link to="/careers/new">New Career Form</Link>
    </Stack>
  );
}
