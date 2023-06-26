import { cache } from 'react';
import { db } from './store/store';

// 🦁 Créer une function `getAllUsers`
// Appel la function `db.users.all`
// Wrap cette function dans la function `cache` de React (que j'ai déjà importé)
export const getAllUsers = cache(async () => {
  const users = await db.users.all();

  return users;
});
