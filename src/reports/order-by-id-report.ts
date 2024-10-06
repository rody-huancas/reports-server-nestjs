import { Content, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
// sections
import { footerSection } from './sections/footer.section';
// helpers
import { CurrencyFormatter, DateFormatter } from 'src/helpers';

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [10, 30],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 20,
    bold: true,
    margin: [0, 30, 0, 0],
  },
  subheader: {
    fontSize: 16,
    bold: true,
    margin: [0, 20, 0, 0],
  },
};

export const orderByIdReport = (): TDocumentDefinitions => {
  return {
    styles: styles,
    header: logo,
    pageMargins: [40, 60, 40, 60],
    footer: footerSection,
    content: [
      // Headers
      {
        text: 'Tucan Code',
        style: 'header',
      },
      // Dirección
      {
        columns: [
          {
            text: '15 Montgomery Str, Suite 100, \nOttawa ON K2Y 9X1, CABADA\nN: 123456748859\nhttps://www.novtiq.com/',
          },
          {
            text: [
              { text: 'Recibo N° 1234155\n', bold: true },
              `Fecha del recibo: ${DateFormatter.getDDMMMMYYYY(new Date())}\nPagar antes de: ${DateFormatter.getDDMMMMYYYY(new Date())}\n`,
            ],
            alignment: 'right',
          },
        ],
      },
      // QR
      { qr: 'https://rodyhuancas.vercel.app/', fit: 75, alignment: 'right' },
      // Dirección del cliente
      {
        text: [
          {
            text: 'Cobrar a: \n',
            style: 'subheader',
          },
          `Razon social: Richter Supermark Michael Holz 
            Grenzacherweg 237`,
        ],
      },
      // Tabla del detalle de la orden
      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],
            [
              '1',
              'Producto 1',
              '1',
              '1000',
              {
                text: CurrencyFormatter.formatCurrency(1800),
                alignment: 'right',
              },
            ],
            [
              '2',
              'Producto 2',
              '2',
              '2000',
              {
                text: CurrencyFormatter.formatCurrency(2000),
                alignment: 'right',
              },
            ],
            [
              '3',
              'Producto 3',
              '3',
              '2000',
              {
                text: CurrencyFormatter.formatCurrency(150),
                alignment: 'right',
              },
            ],
          ],
        },
      },
      // Salto de línea
      '\n\n',
      // Totales
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'Subtotal',
                  {
                    text: CurrencyFormatter.formatCurrency(2150),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total', bold: true },
                  {
                    text: CurrencyFormatter.formatCurrency(150),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
