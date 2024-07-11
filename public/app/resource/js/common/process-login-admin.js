import { db } from '../configfb.js';
import { ref, get, child } from 'firebase/database';

export async function checkAdminCredentials(usernameAdmin, passwordAdmin) {
  if (!usernameAdmin || !passwordAdmin) {
    throw new Error('Input tidak lengkap');
  }

  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, 'Admin'));

  if (snapshot.exists()) {
    const admins = snapshot.val();
    for (let key in admins) {
      if (admins[key].username === usernameAdmin && admins[key].password === passwordAdmin) {
        return true;
      }
    }
    return false;
  } else {
    throw new Error('Tidak ada data admin yang ditemukan.');
  }
}
