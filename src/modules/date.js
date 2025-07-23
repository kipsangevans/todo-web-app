// src/modules/date.js
import { parseISO, differenceInDays, format } from 'date-fns';

export function getDaysLeft(dueDateStr) {
  const today = new Date();
  const dueDate = parseISO(dueDateStr);
  return differenceInDays(dueDate, today);
}

export function formatDat(dateString) {
  return format(parseISO(dateString), 'MMMM do, yyyy');
}