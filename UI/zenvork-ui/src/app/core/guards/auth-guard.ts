import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = document.cookie.includes('accessToken');
  if (!isLoggedIn) {
    window.location.href = '/login';
  }
  return isLoggedIn;
};
