import bcrypt from 'bcryptjs';

const password = 'admin@12345';

const hashPassword = async () => {
  const hashed = await bcrypt.hash(password, 10);
  console.log(hashed);
};

hashPassword();
