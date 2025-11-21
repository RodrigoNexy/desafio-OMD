import { z } from "zod";

export const planoAcaoFormSchema = z.object({
  titulo: z.string().min(3, "O título deve ter pelo menos 3 caracteres").max(100, "O título deve ter no máximo 100 caracteres"),
  objetivo: z.string().min(10, "O objetivo deve ter pelo menos 10 caracteres").max(500, "O objetivo deve ter no máximo 500 caracteres"),
});

export type PlanoAcaoFormSchemaType = z.infer<typeof planoAcaoFormSchema>;

