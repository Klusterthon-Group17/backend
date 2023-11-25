export const generateCode = () => {
  const characters =
    '0123456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += characters[Math.floor(Math.random() * characters.length)];
  }
  return code;
};
