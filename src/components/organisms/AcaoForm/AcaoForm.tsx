import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../molecules";
import { Button } from "../../atoms";
import { acaoFormSchema, type AcaoFormSchemaType } from "../../../schemas";
import type { AcaoFormData } from "../../../types";

interface AcaoFormProps {
  onSubmit: (data: AcaoFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<AcaoFormData>;
  isLoading?: boolean;
}

export const AcaoForm = memo<AcaoFormProps>(({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AcaoFormSchemaType>({
    resolver: zodResolver(acaoFormSchema),
    defaultValues: initialData,
  });

  const handleFormSubmit = async (data: AcaoFormSchemaType) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col gap-4">
        <FormField
          label="Ação"
          error={errors.acao?.message}
          required
          {...register("acao")}
        />

        <FormField
          label="Prazo"
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
            {isLoading ? "Salvando..." : "Adicionar"}
          </Button>
        </div>
      </div>
    </form>
  );
});

AcaoForm.displayName = "AcaoForm";

