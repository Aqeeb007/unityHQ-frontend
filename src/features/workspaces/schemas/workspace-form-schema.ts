import { z } from 'zod';

export const workspaceFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Workspace name is required')
    .min(3, 'Workspace name must be at least 3 characters')
    .max(50, 'Workspace name must be less than 50 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
});

export type WorkspaceFormValues = z.infer<typeof workspaceFormSchema>;