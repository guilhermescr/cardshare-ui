export const APP_ROUTES = {
  LOGIN: '/auth',
  CHECK_EMAIL: '/auth/check-email',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};

export const PROTECTED_ROUTES = [
  APP_ROUTES.DASHBOARD,
  APP_ROUTES.PROFILE,
  APP_ROUTES.SETTINGS,
];

export const PUBLIC_ROUTES = [APP_ROUTES.LOGIN, APP_ROUTES.CHECK_EMAIL];

export const KNOWN_ROUTES = [...PUBLIC_ROUTES, ...PROTECTED_ROUTES];
