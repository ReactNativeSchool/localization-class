import { format } from 'date-fns';
import { API_KEY } from "@env";

export const apiRates = ( baseCurrency, quoteCurrency) => {
 
  console.log(
    `###baseCurrency: ${baseCurrency}, quoteCurrency: ${quoteCurrency}`,
  );
  return new Promise((resolve) => {
    return fetch(
      `https://free.currconv.com/api/v7/convert?q=${baseCurrency}_${quoteCurrency}&compact=ultra&apiKey=${API_KEY}`,
    )
      .then((res) => res.json())
      .then((res) => {

        const [keys] = Object.keys(res);
        const val = res[keys];
        const currKey = keys.split('_')[0];
        const quoteKey = keys.split('_')[1];

        const _rates = {
          [quoteKey]: val,
          [currKey]: 1,
        };
        console.log(`rates:${JSON.stringify(_rates)}`);
        resolve({
          base: baseCurrency,
          date: format(new Date(), 'yyyy-MM-dd'),
          rates: {
            ..._rates,
            [baseCurrency]: 1,
          },
        });
      });
  });
};
