import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField } from "../../molecules";
import { Button } from "../../atoms";

const updatePrazoSchema = z.object({
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

type UpdatePrazoFormType = z.infer<typeof updatePrazoSchema>;

interface UpdatePrazoFormProps {
  onSubmit: (prazo: string) => Promise<void>;
  onCancel: () => void;
  initialPrazo?: string;
  isLoading?: boolean;
}

export const UpdatePrazoForm = memo<UpdatePrazoFormProps>(({
  onSubmit,
  onCancel,
  initialPrazo,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePrazoFormType>({
    resolver: zodResolver(updatePrazoSchema),
    defaultValues: { prazo: initialPrazo ? initialPrazo.split("T")[0] : "" },
  });

  const handleFormSubmit = async (data: UpdatePrazoFormType) => {
    const prazoDate = new Date(data.prazo);
    prazoDate.setHours(23, 59, 59, 999);
    await onSubmit(prazoDate.toISOString());
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col gap-4">
        <FormField
          label="Novo Prazo"
          name="prazo"
          type="date"
          error={errors.prazo?.message}
          required
          {...register("prazo")}
        />

        <div className="flex gap-2 justify-end mt-4">
          <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Atualizar"}
          </Button>
        </div>
      </div>
    </form>
  );
});

UpdatePrazoForm.displayName = "UpdatePrazoForm";

