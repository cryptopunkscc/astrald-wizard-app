import { createRouter } from 'sv-router';

export const router = createRouter({
  '/': () => import('./screens/Dashboard.svelte'),
  '/setup': () => import('./screens/Setup.svelte'),
  '/claim-node': () => import('./screens/ClaimNode.svelte'),
  '/settings': () => import('./screens/Settings.svelte'),
});
