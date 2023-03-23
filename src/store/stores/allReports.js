import { unitsDescriptions } from "@/helpers/unitsDescriptions";

export const allReports = {
  reports: [],
  balance: {},
  expenses: [],
  incomingPayments: [
    {
      type: "instructors",
      label: "Получено от инструкторов",
      description: unitsDescriptions.fromInstructors.description,
      payments: [],
    },
    {
      type: "instructors",
      label: "Получено от кураторов",
      description: unitsDescriptions.fromTutors.description,
      payments: [],
    },
    {
      type: "office",
      label: "Получено из офиса",
      description: unitsDescriptions.fromOffice.description,
      payments: [],
    },
  ],
  outgoingPayments: [
    {
      type: "instructors",
      label: "Передано инструкторам",
      description: unitsDescriptions.toInstructors.description,
      payments: [],
    },
    {
      type: "instructors",
      label: "Передано кураторам",
      description: unitsDescriptions.toTutors.description,
      payments: [],
    },
    {
      type: "office",
      label: "Передано в офис",
      description: unitsDescriptions.toOffice.description,
      payments: [],
    },
  ],
};
