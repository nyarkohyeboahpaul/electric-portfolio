REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.claim_admin_if_none(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

DROP POLICY IF EXISTS "projects_public_read_published" ON public.projects;
CREATE POLICY "projects_public_read_published" ON public.projects
FOR SELECT TO anon, authenticated
USING (status = 'published');

DROP POLICY IF EXISTS "blog_public_read_published" ON public.blog_posts;
CREATE POLICY "blog_public_read_published" ON public.blog_posts
FOR SELECT TO anon, authenticated
USING (status = 'published');

DROP POLICY IF EXISTS "testimonials_public_read" ON public.testimonials;
CREATE POLICY "testimonials_public_read" ON public.testimonials
FOR SELECT TO anon, authenticated
USING (published = true);
