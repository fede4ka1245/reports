export const allReportsStore = {
  expenses: [],
  incomingPayments: [
    {
      type: "instructors",
      label: "Получено от инструкторов",
      payments: [],
    },
    {
      type: "instructors",
      label: "Получено от кураторов",
      payments: [],
    },
    {
      type: "office",
      label: "Получено из офиса",
      payments: [],
    },
  ],
  outgoingPayments: [
    {
      type: "instructors",
      label: "Передано инструкторам",
      payments: [],
    },
    {
      type: "instructors",
      label: "Передано кураторам",
      payments: [],
    },
    {
      type: "office",
      label: "Передано в офис",
      payments: [],
    },
  ],
};
