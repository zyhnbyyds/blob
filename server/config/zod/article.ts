import { z } from 'zod';

export const AddSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const EditSchema = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});
