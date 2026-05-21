import { createFileRoute } from "@tanstack/react-router";
import { EditRoute } from "./projects.new";

export const Route = EditRoute;

// Re-declare so the TanStack Router plugin picks this file up.
// The actual component is defined in ./projects.new (shared form).
void createFileRoute;
