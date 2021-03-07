export const formatMoney = (amount, currencySign) => {
  const sign = currencySign ? currencySign : '';
  return amount ? sign+amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
}

export const decodeMoney = money => money.toString().replace(/,/g, '');

export const dayDifference = day => {
  const date1 = new Date(day);
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
}

export const parseJwt = token => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
};