// src/hooks/useAnonId.js
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

export default function useAnonId() {
  useEffect(() => {
    let anonId = Cookies.get('anon_id');
    if (!anonId) {
      anonId = uuidv4();
    }
    Cookies.set('anon_id', anonId, {
      path: '/',
      expires: 7, // days
      sameSite: 'strict',
    });
  }, []);
}
