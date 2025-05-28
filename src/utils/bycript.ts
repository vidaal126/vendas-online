import * as bcrypt from 'bcrypt';

export async function hashPassword(
  password: string,
  saltOrRounds = 10,
): Promise<string> {
  return await bcrypt.hash(password, saltOrRounds);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
