import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

const logo: Content = {
  image    : 'src/assets/tucan-code-logo.png',
  width    : 100,
  height   : 100,
  alignment: 'center',
  margin   : [0, 0, 0, 20],
};

const currentDate: Content = {
  text     : DateFormatter.getDDMMMMYYYY(new Date()),
  alignment: 'right',
  margin   : [20, 30],
  width    : 200,
};

interface HeaderOptions {
  title?   : string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { title, subtitle, showLogo = true, showDate = true } = options;

  const headerLogo: Content = showLogo ? logo : null;
  const headerDate: Content = showDate ? currentDate : null;

  const headerSubtitle: Content = subtitle
    ? {
        text     : subtitle,
        alignment: 'center',
        margin   : [0, 2, 0, 0],
        style    : { fontSize: 16, bold: true },
      }
    : null;

  const headerTitle: Content = title
    ? {
        stack: [
          {
            text     : title,
            alignment: 'center',
            margin   : [0, 15, 0, 0],
            style    : { fontSize: 22, bold: true },
          },
          headerSubtitle
        ],
      }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
