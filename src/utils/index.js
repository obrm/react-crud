export const formatNumber = (number) => {
  return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const calcPrice = (price) => {
  return (price * 3.5).toFixed(0).toLocaleString('he-IL') * 1.17;
};

export const calcAndFormatPrice = (price) => {
  return formatNumber(calcPrice(price));
};