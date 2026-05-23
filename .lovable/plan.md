## Plan

1. **Repair the backend admin permission check**
   - Add a small database migration that grants logged-in users permission to execute the safe `public.is_admin()` and `public.has_role(...)` helpers.
   - Keep roles in `public.user_roles` and keep RLS enabled; this only fixes the helper permissions that currently block the assigned admin from being recognized.
   - Keep `claim_admin_if_none` disabled/unused so no one can self-claim admin from the UI.

2. **Make the frontend admin gate deterministic**
   - Update `src/lib/admin-auth.ts` so it no longer contains or exports `claimAdminIfNone`.
   - Make the admin check handle backend errors explicitly instead of silently treating a permission error as “not admin.”
   - Keep the assigned admin account flow: unauthenticated users go to `/admin/login`; authenticated admins enter the dashboard; non-admin users only get a sign-out option.

3. **Remove all stale claim-admin UI/code paths**
   - Search and remove any remaining text or imports for:
     - “Admin access required”
     - “Claim admin role”
     - `claimAdminIfNone`
   - Ensure `/admin` and `/admin/login` are the only admin entry paths, not `/login`.

4. **Validate the fix**
   - Confirm the assigned account `yeboahnyarkohpaul735@gmail.com` still has `admin` in `user_roles`.
   - Verify the permission error (`permission denied for function is_admin`) is eliminated.
   - Re-check the relevant admin auth files after changes so the old claim screen cannot render anymore.