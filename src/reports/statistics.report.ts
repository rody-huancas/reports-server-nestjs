import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as Utils from 'src/helpers/chart-utils';

interface TopCountry {
  country: string;
  customers: number;
}

interface ReportOptions {
  title?: string;
  subtitle?: string;
  topCountries: TopCountry[];
}

const generateTopCountryDonut = async (topCountries: TopCountry[]): Promise<string> => {
  const data = {
    labels: topCountries.map((country) => country.country),
    datasets: [
      {
        label: 'Dataset 1',
        data: topCountries.map((country) => country.customers),
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      legend: {
        position: 'left',
      },
      plugins: {
        datalabels: {
          color: 'black',
        },
      },
    },
  };

  return Utils.chartJsToImage(config);
};

export const getStatisticsReport = async (options: ReportOptions): Promise<TDocumentDefinitions> => {
  const donutChart = await generateTopCountryDonut(options.topCountries);

  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        image: donutChart,
        width: 500,
      },
    ],
  };

  return docDefinition;
};
