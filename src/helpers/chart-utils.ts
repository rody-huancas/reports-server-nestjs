import axios from 'axios';

export const chartJsToImage = async (charConfig: unknown) => {
  const encodedUri = encodeURIComponent(JSON.stringify(charConfig));
  const chartUrl = `https://quickchart.io/chart?c=${encodedUri}`;

  const response = await axios.get(chartUrl, { responseType: 'arraybuffer' });

  return `data:image/png;base64,${Buffer.from(response.data).toString('base64')}`;
};
