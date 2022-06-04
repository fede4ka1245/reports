import { getHikeReport } from "@/modules/excel/reports/getHikeReport";
import { countResultForMoneyCode } from "@/modules/countResultForMoneyCode";
import { countProfitForMoneyCode } from "@/modules/countProfitForMoneyCode";

export const downloadRouteReport = (report) => {
  console.log(report)
  getHikeReport({
    hikeId: report.routeData.id,
    hikeName: report.routeData.name,
    hikeDates: report.routeData.date,
    activeMembers: report.members,
    inactiveMembers: report.inactiveMembers,
    result: [
      ...report.moneyCodes.map((code) => {
        return {
          moneyCode: code,
          result: countResultForMoneyCode(report.currentReportStore, code),
          profit: countProfitForMoneyCode(report.currentReportStore, code),
        };
      }),
    ],
    outgoingPayments: report.outgoingPayments,
    incomingPayments: report.incomingPayments,
    commonPayments: report.moneySums,
    expenses: report.expenses,
    conversions: report.conversions,
  });
};
