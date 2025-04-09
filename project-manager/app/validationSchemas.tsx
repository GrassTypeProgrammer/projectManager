import { z } from "zod";

export const issueSchema = z.object({
    title: z.string().min(1, 'title is required.').max(255),
    // Always have a max for security reasons. 65535 is the max length of a text field
    description: z.string().min(1, 'description is required.').max(65535),
});

export const patchIssueSchema = z.object({
    title: z.string().min(1, 'title is required.').max(255).optional(),
    description: z.string().min(1, 'description is required.').max(65535).optional(),
    // nullable allows you to set this as null, which will allow us to unassign a user
    assignedToUserID: z.string().min(1, 'AssignedToUserId is required').max(255).optional().nullable(),
});
