CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'::public.app_role
  )
$$;

REVOKE ALL ON SCHEMA private FROM PUBLIC, anon;
GRANT USAGE ON SCHEMA private TO authenticated;
REVOKE EXECUTE ON FUNCTION private.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.is_admin() TO authenticated;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.claim_admin_if_none(uuid) FROM PUBLIC, anon, authenticated;

DROP POLICY IF EXISTS "user_roles_admin_all" ON public.user_roles;
CREATE POLICY "user_roles_admin_all" ON public.user_roles
FOR ALL TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

DROP POLICY IF EXISTS "profile_admin_write" ON public.profile;
CREATE POLICY "profile_admin_write" ON public.profile
FOR ALL TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

DROP POLICY IF EXISTS "projects_admin_write" ON public.projects;
CREATE POLICY "projects_admin_write" ON public.projects
FOR ALL TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

DROP POLICY IF EXISTS "blog_admin_write" ON public.blog_posts;
CREATE POLICY "blog_admin_write" ON public.blog_posts
FOR ALL TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

DROP POLICY IF EXISTS "gallery_admin_write" ON public.gallery_images;
CREATE POLICY "gallery_admin_write" ON public.gallery_images
FOR ALL TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

DROP POLICY IF EXISTS "services_admin_write" ON public.services;
CREATE POLICY "services_admin_write" ON public.services
FOR ALL TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

DROP POLICY IF EXISTS "testimonials_admin_write" ON public.testimonials;
CREATE POLICY "testimonials_admin_write" ON public.testimonials
FOR ALL TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

DROP POLICY IF EXISTS "experience_admin_write" ON public.experience;
CREATE POLICY "experience_admin_write" ON public.experience
FOR ALL TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

DROP POLICY IF EXISTS "skills_admin_write" ON public.skills;
CREATE POLICY "skills_admin_write" ON public.skills
FOR ALL TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

DROP POLICY IF EXISTS "certs_admin_write" ON public.certifications;
CREATE POLICY "certs_admin_write" ON public.certifications
FOR ALL TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

DROP POLICY IF EXISTS "messages_admin_all" ON public.messages;
CREATE POLICY "messages_admin_all" ON public.messages
FOR ALL TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

DROP POLICY IF EXISTS "settings_admin_write" ON public.site_settings;
CREATE POLICY "settings_admin_write" ON public.site_settings
FOR ALL TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

DROP POLICY IF EXISTS "media_admin_all" ON public.media_files;
CREATE POLICY "media_admin_all" ON public.media_files
FOR ALL TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

DROP POLICY IF EXISTS "portfolio_media_admin_insert" ON storage.objects;
CREATE POLICY "portfolio_media_admin_insert" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'portfolio-media' AND private.is_admin());

DROP POLICY IF EXISTS "portfolio_media_admin_update" ON storage.objects;
CREATE POLICY "portfolio_media_admin_update" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'portfolio-media' AND private.is_admin())
WITH CHECK (bucket_id = 'portfolio-media' AND private.is_admin());

DROP POLICY IF EXISTS "portfolio_media_admin_delete" ON storage.objects;
CREATE POLICY "portfolio_media_admin_delete" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'portfolio-media' AND private.is_admin());
