import { format, formatDistanceToNow, isPast, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, "dd/MM/yyyy", { locale: ptBR });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
};

export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
};

export const getPrazoStatus = (prazo: string): "success" | "warning" | "danger" | "secondary" => {
  const prazoDate = new Date(prazo);
  prazoDate.setHours(23, 59, 59, 999);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isPast(prazoDate) && !isToday(prazoDate)) {
    return "danger";
  }

  return "secondary";
};

