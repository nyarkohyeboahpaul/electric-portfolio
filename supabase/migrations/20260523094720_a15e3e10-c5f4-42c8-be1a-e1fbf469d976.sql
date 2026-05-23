GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.claim_admin_if_none(uuid) FROM anon, authenticated;
