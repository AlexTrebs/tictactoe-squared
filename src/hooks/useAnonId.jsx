import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function useAnonId() {
  useEffect(() => {
    let anonId = Cookies.get('anon_id');
    anonId ||= uuidv4();
    Cookies.set('anon_id', anonId, {
      path: '/',
      expires: 7,
      sameSite: 'strict',
    });
  }, []);
}
