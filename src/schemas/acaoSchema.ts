import { z } from "zod";

export const acaoFormSchema = z.object({
  acao: z.string().min(3, "A ação deve ter pelo menos 3 caracteres").max(200, "A ação deve ter no máximo 200 caracteres"),
  prazo: z.string().min(1, "O prazo é obrigatório").refine(
    (date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    },
    {
      message: "O prazo deve ser uma data futura ou hoje",
    }
  ),
});

export type AcaoFormSchemaType = z.infer<typeof acaoFormSchema>;

