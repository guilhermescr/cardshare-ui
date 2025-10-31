export const APP_ROUTES = {
  LOGIN: '/auth',
  CHECK_EMAIL: '/auth/check-email',
  DASHBOARD: '/dashboard',
  CREATE_CARD: '/new',
  PROFILE: '/:username',
  SETTINGS: '/settings',
  NOTIFICATIONS: '/notifications',
};

export const PROTECTED_ROUTES = [
  APP_ROUTES.DASHBOARD,
  APP_ROUTES.CREATE_CARD,
  APP_ROUTES.PROFILE,
  APP_ROUTES.SETTINGS,
  APP_ROUTES.NOTIFICATIONS,
];

export const PUBLIC_ROUTES = [APP_ROUTES.LOGIN, APP_ROUTES.CHECK_EMAIL];

export const KNOWN_ROUTES = [...PUBLIC_ROUTES, ...PROTECTED_ROUTES];
