'server only';
import * as fs from 'fs';
import path from 'path';

const storeFolderPath = path.join(process.cwd(), '/src/store');
const storePath = path.join(storeFolderPath, 'store.txt');

const saveStore = async (store: Store) => {
  await wait(100);
  fs.writeFileSync(storePath, JSON.stringify(store));
};

const readStore = async () => {
  await wait(100);
  const data = fs.readFileSync(storePath, 'utf-8');
  try {
    return JSON.parse(data) as Store;
  } catch {
    return {
      users: [],
    };
  }
};

/*

This is a fake database. Don't use this method in client side !

*/

export type User = {
  id: number;
  name: string;
  email: string;
};
const wait = async (ms: number) => new Promise((r) => setTimeout(r, ms));

const DEFAULT_USER = [
  {
    id: 1,
    name: 'Jean',
    email: 'jean@google.com',
  },
  {
    id: 2,
    name: 'Pascal',
    email: 'pascal@google.com',
  },
];

type Store = {
  users: User[];
};

const getStore = async (): Promise<Store> => {
  return readStore();
};

const getUsers = async () => {
  console.log('getUsers : get all users !');

  const STORE = await getStore();

  await wait(100);
  return [...STORE.users];
};

const byId = async (id: number) => {
  const STORE = await getStore();

  const user = STORE.users.find((u) => u.id === id);

  return user;
};

const addUser = async (user: Omit<User, 'id'>) => {
  const STORE = await getStore();

  await wait(100);

  const newUser = {
    id: (STORE.users.at(-1)?.id ?? 0) + 1,
    ...user,
  };

  STORE.users = [...STORE.users, newUser];
  saveStore(STORE);

  return newUser;
};

const updateUser = async (user: User) => {
  const STORE = await getStore();
  await wait(100);

  const index = STORE.users.findIndex((u) => u.id === user.id);

  if (index === -1) {
    throw new Error('User not found');
  }

  STORE.users[index] = user;
  saveStore(STORE);

  return [...STORE.users];
};

const deleteUser = async (id: number) => {
  const STORE = await getStore();
  await wait(100);

  STORE.users = STORE.users.filter((u) => u.id !== id);
  saveStore(STORE);

  return [...STORE.users];
};

export const db = {
  users: {
    all: getUsers,
    add: addUser,
    byId: byId,
    update: updateUser,
    delete: deleteUser,
  },
};
