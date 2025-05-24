import { EventColor } from "calendar-utils";

enum CompletionStatus {
  'late' = 'late',
  'completed' = 'completed',
  'pending' = 'pending'
} 

export const colors: Record<CompletionStatus, EventColor> = {
  late: {
    primary: '#ff0000',
    secondary: '#aa0b0b'
  },
  completed: {
    primary: '#00ff00',
    secondary: '#239623',
  },
  pending: {
    primary: '#ff7f00',
    secondary: '#a86119',
  },
};