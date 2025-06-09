import { EventColor } from "calendar-utils";
import { CompletionStatus } from "../models/CompletionStatuts";

export const colors: Record<CompletionStatus, EventColor> = {
  unstarted: {
    primary: '#333333',
    secondary: '#888888'
  },
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