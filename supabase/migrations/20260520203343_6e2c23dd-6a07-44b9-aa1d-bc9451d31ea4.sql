
CREATE OR REPLACE FUNCTION public.claim_admin_if_none(_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin'::public.app_role) THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (_user_id, 'admin'::public.app_role)
    ON CONFLICT DO NOTHING;
    RETURN true;
  END IF;
  RETURN false;
END;
$$;

-- Allow signed-in users to call it (it self-guards: only first user wins).
GRANT EXECUTE ON FUNCTION public.claim_admin_if_none(uuid) TO authenticated;
