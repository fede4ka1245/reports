export const currentReportStore = {
  routeData: {
    date: "",
    name: "",
  },
  moneySums: {},
  moneyCodes: [],
  members: "",
  inactiveMembers: "",
  expenses: [],
  conversions: [],
  incomingPayments: [
    {
      type: "members",
      label: "Оплаты участников с исключениями",
      payments: [],
    },
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
      type: "members",
      label: "Доходы инструктора",
      payments: [],
    },
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
