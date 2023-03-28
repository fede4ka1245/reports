import { nanoid } from "nanoid";
import { unitsDescriptions } from "@/helpers/unitsDescriptions";
import {selectOptions} from "@/helpers/selectOptions";

export const getEmptyReport = () => {
  return {
    key: nanoid(),
    name: "",
    dates: "",
    hikeId: "",
    moneySums: {},
    moneyCodes: ["RUB"],
    members: "",
    inactiveMembers: "",
    expenses: [],
    conversions: [],
    checklist: [
      {
        header: "Регистрация в МЧС",
        hint: "Комментарии, номер группы",
        result: selectOptions[2],
        comment: "",
      },
      {
        header: "ТБ фото отправлено на tb@vpoxod.ru",
        hint: "Комментарии",
        result: selectOptions[2],
        comment: "",
      },
      {
        header: "Все прошло хорошо",
        hint: "Комментарии",
        result: selectOptions[2],
        comment: "",
      },
      {
        header: "Фотоальбом есть",
        hint: "Комментарии, ссылки",
        result: selectOptions[2],
        comment: "",
      },
      {
        header: "Посты в соцсетях есть",
        hint: "Комментарии, ссылки",
        result: selectOptions[2],
        comment: "",
      },
      {
        header: "С общественным снаряжением четко",
        hint: "Комментарии",
        result: selectOptions[2],
        comment: "",
      },
    ],
    incomingPayments: [
      {
        type: "members",
        label: "Оплаты участников с исключениями",
        description: unitsDescriptions.clientsSumWithExceptions.description,
        payments: [],
      },
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
        label: "Доходы инструктора",
        description: unitsDescriptions.instructorRevenue.description,
        payments: [],
      },
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
};
