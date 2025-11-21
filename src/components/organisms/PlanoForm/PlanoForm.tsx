import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../molecules";
import { Button } from "../../atoms";
import { planoAcaoFormSchema, type PlanoAcaoFormSchemaType } from "../../../schemas";
import type { PlanoAcaoFormData } from "../../../types";

interface PlanoFormProps {
  onSubmit: (data: PlanoAcaoFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<PlanoAcaoFormData>;
  isLoading?: boolean;
}

export const PlanoForm = memo<PlanoFormProps>(({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanoAcaoFormSchemaType>({
    resolver: zodResolver(planoAcaoFormSchema),
    defaultValues: initialData,
  });

  const handleFormSubmit = async (data: PlanoAcaoFormSchemaType) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col gap-4">
        <FormField
          label="Título"
          error={errors.titulo?.message}
          required
          {...register("titulo")}
        />

        <FormField
          label="Objetivo"
          type="textarea"
          error={errors.objetivo?.message}
          required
          {...register("objetivo")}
        />

        <div className="flex gap-2 justify-end mt-4">
          <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>
    </form>
  );
});

PlanoForm.displayName = "PlanoForm";

