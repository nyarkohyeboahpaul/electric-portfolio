
-- ============ ROLES ============
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

CREATE POLICY "user_roles_admin_all" ON public.user_roles FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "user_roles_self_read" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- ============ updated_at trigger ============
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============ PROFILE (single row) ============
CREATE TABLE public.profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Alex Wallace',
  tagline text DEFAULT 'UI/UX Designer & Frontend Developer',
  roles text[] NOT NULL DEFAULT ARRAY['Designer','Developer','Creator'],
  eyebrow text DEFAULT 'HELLO, I''M A',
  bio text DEFAULT '',
  short_bio text DEFAULT '',
  email text DEFAULT 'hello@alexwallace.design',
  avatar_url text,
  cv_url text,
  hero_cta1_text text DEFAULT 'View My Work',
  hero_cta1_link text DEFAULT '/projects',
  hero_cta2_text text DEFAULT 'Download CV',
  hero_cta2_link text DEFAULT '#',
  stat1_label text DEFAULT 'Projects', stat1_value integer DEFAULT 120,
  stat2_label text DEFAULT 'Clients',  stat2_value integer DEFAULT 45,
  stat3_label text DEFAULT 'Years',    stat3_value integer DEFAULT 6,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profile_public_read" ON public.profile FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "profile_admin_write" ON public.profile FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_profile_updated BEFORE UPDATE ON public.profile FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
INSERT INTO public.profile (id) VALUES (gen_random_uuid());

-- ============ PROJECTS ============
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text DEFAULT '',
  cover_image_url text,
  images text[] DEFAULT ARRAY[]::text[],
  category text DEFAULT 'UI & UX',
  tags text[] DEFAULT ARRAY[]::text[],
  role text DEFAULT '',
  tools text[] DEFAULT ARRAY[]::text[],
  live_url text,
  github_url text,
  status text NOT NULL DEFAULT 'published',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "projects_public_read_published" ON public.projects FOR SELECT TO anon, authenticated
  USING (status = 'published' OR public.is_admin());
CREATE POLICY "projects_admin_write" ON public.projects FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_projects_updated BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ BLOG POSTS ============
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  cover_image_url text,
  excerpt text DEFAULT '',
  body text DEFAULT '',
  category text DEFAULT 'Design',
  tags text[] DEFAULT ARRAY[]::text[],
  meta_title text,
  meta_description text,
  og_image_url text,
  status text NOT NULL DEFAULT 'draft',
  scheduled_at timestamptz,
  read_time integer DEFAULT 5,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "blog_public_read_published" ON public.blog_posts FOR SELECT TO anon, authenticated
  USING (status = 'published' OR public.is_admin());
CREATE POLICY "blog_admin_write" ON public.blog_posts FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER trg_blog_updated BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ GALLERY ============
CREATE TABLE public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text DEFAULT '',
  description text DEFAULT '',
  image_url text NOT NULL,
  alt_text text DEFAULT '',
  category text DEFAULT 'UI Design',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gallery_public_read" ON public.gallery_images FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "gallery_admin_write" ON public.gallery_images FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============ SERVICES ============
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon_name text NOT NULL DEFAULT 'Sparkles',
  project_count_label text DEFAULT '12 Projects',
  title text NOT NULL,
  description text DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "services_public_read" ON public.services FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "services_admin_write" ON public.services FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============ TESTIMONIALS ============
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote text NOT NULL,
  client_name text NOT NULL,
  client_role text DEFAULT '',
  company text DEFAULT '',
  avatar_url text,
  rating integer NOT NULL DEFAULT 5,
  published boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "testimonials_public_read" ON public.testimonials FOR SELECT TO anon, authenticated
  USING (published = true OR public.is_admin());
CREATE POLICY "testimonials_admin_write" ON public.testimonials FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============ EXPERIENCE ============
CREATE TABLE public.experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL DEFAULT 'work',
  role_or_degree text NOT NULL,
  company_or_institution text NOT NULL,
  date_range text DEFAULT '',
  bullets text[] DEFAULT ARRAY[]::text[],
  display_order integer NOT NULL DEFAULT 0
);
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
CREATE POLICY "experience_public_read" ON public.experience FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "experience_admin_write" ON public.experience FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============ SKILLS ============
CREATE TABLE public.skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_name text NOT NULL,
  skill_name text NOT NULL,
  percentage integer NOT NULL DEFAULT 80,
  display_order integer NOT NULL DEFAULT 0
);
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "skills_public_read" ON public.skills FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "skills_admin_write" ON public.skills FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============ CERTIFICATIONS ============
CREATE TABLE public.certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  issuer text DEFAULT '',
  year text DEFAULT '',
  icon_name text DEFAULT 'Award',
  display_order integer NOT NULL DEFAULT 0
);
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "certs_public_read" ON public.certifications FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "certs_admin_write" ON public.certifications FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============ MESSAGES ============
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name text NOT NULL,
  sender_email text NOT NULL,
  subject text DEFAULT '',
  body text NOT NULL,
  read boolean NOT NULL DEFAULT false,
  archived boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "messages_public_insert" ON public.messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "messages_admin_all" ON public.messages FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- ============ SITE SETTINGS ============
CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings_public_read" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "settings_admin_write" ON public.site_settings FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============ MEDIA FILES ============
CREATE TABLE public.media_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  url text NOT NULL,
  size_bytes bigint DEFAULT 0,
  type text DEFAULT 'image',
  used_in text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "media_admin_all" ON public.media_files FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============ STORAGE BUCKETS ============
INSERT INTO storage.buckets (id, name, public) VALUES
  ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "storage_public_read_portfolio" ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'portfolio-media');
CREATE POLICY "storage_admin_write_portfolio" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'portfolio-media' AND public.is_admin());
CREATE POLICY "storage_admin_update_portfolio" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'portfolio-media' AND public.is_admin());
CREATE POLICY "storage_admin_delete_portfolio" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'portfolio-media' AND public.is_admin());
