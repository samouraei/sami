const bcrypt = require('bcryptjs');

const hashPassword = async () => {
  const password = '123456789';
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log('Hashed Password:', hashedPassword);
};

hashPassword();


// const testPassword = async () => {
//   const plainPassword = '123456789';
//   const hashedPassword = '$2a$12$waTd86rrLuIKiifbKIPGaOC7rd2TivwkiTbxjsRU6KDEg5RUeihOW';

//   const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
//   console.log(isMatch ? 'Password matches!' : 'Password does not match!');
// };

// testPassword();
