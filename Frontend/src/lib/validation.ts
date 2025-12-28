export function isValidEmailStrict(value:string) {
  const re = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;
  return re.test(value);
};

export function isValidPassword(value:string) {
  const re = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_\-]).{8,}$/;
  return re.test(value);
};