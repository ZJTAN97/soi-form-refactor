import { z } from "zod";

export const SOURCE_TYPES = [
  "LINKEDIN",
  "REDDIT",
  "TWITTER",
  "INDEED",
] as const;

export const sourceSchema = z.object({
  type: z.enum(SOURCE_TYPES).nullable(),
  remarks: z.string(),
});

export const sourceOfInformationSchema = z.object({
  field: z.string().min(1, "cannot be empty"),
  content: z.string().min(1, "cannnot be empty"),
  sources: z.array(sourceSchema),
});

export const careerRequestSchema = z.object({
  company: z.string().min(1, "Cannot be empty"),
  lastDrawnSalay: z.number(),
  duration: z.date().nullable(),
  appointment: z.object({
    position: z.string().min(1, "Position cannot be empty"),
    rank: z.string().min(1, "Rank cannot be empty"),
    sourceOfInformations: z.array(sourceOfInformationSchema),
  }),
  skills: z
    .array(z.string().min(1, "cannot be empty"))
    .min(1, "require at least one item"),
  sourceOfInformations: z.array(sourceOfInformationSchema),
});

export type SourceType = z.infer<typeof sourceSchema>;
export type SourceOfInformationType = z.infer<typeof sourceOfInformationSchema>;
export type CareerRequestType = z.infer<typeof careerRequestSchema>;
