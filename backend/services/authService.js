import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePasswords } from '../utils/passwordUtils.js';
import { generateToken } from '../utils/jwtUtils.js';

const prisma = new PrismaClient();

export const signup = async (userData) => {
  const { name, email, password } = userData;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'USER'
    },
  });

  const token = generateToken(user);
  return { token, user };
};

export const login = async (credentials) => {
  const { email, password } = credentials;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await comparePasswords(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user);
  return { token, user };
};
