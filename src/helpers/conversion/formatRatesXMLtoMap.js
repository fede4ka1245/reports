export const formatRatesXMLtoMap = (rates) => {
  const dom = new DOMParser().parseFromString(rates, "text/xml");

  const ratesMap = new Map();

  Array.from(dom.getElementsByTagName("Valute")).forEach((el) => {
    const charCode = el.getElementsByTagName("CharCode")[0].textContent;
    const numCode = el.getElementsByTagName("NumCode")[0].textContent;
    const value = el.getElementsByTagName("Value")[0].textContent;
    const nominal = el.getElementsByTagName("Nominal")[0].textContent;

    ratesMap[charCode] = {
      numCode,
      value: Number(value.replace(",", ".")),
      nominal: Number(nominal),
    };
  });

  return ratesMap;
};
