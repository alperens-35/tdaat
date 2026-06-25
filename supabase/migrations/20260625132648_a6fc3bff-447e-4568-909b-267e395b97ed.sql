
-- Tighten EXECUTE on SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.membership_applications_force_pending() FROM PUBLIC, anon, authenticated;

-- Replace always-true WITH CHECK with meaningful validation
DROP POLICY IF EXISTS "anyone can register" ON public.event_registrations;
CREATE POLICY "anyone can register" ON public.event_registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(btrim(event_slug)) > 0
    AND length(btrim(event_title)) > 0
    AND length(btrim(full_name)) BETWEEN 1 AND 200
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (phone IS NULL OR length(phone) <= 50)
    AND (notes IS NULL OR length(notes) <= 2000)
  );

DROP POLICY IF EXISTS "anyone can apply" ON public.membership_applications;
CREATE POLICY "anyone can apply" ON public.membership_applications
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(btrim(full_name)) BETWEEN 1 AND 200
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (phone IS NULL OR length(phone) <= 50)
    AND (motivation IS NULL OR length(motivation) <= 5000)
  );

DROP POLICY IF EXISTS "anyone can subscribe" ON public.newsletter_subscribers;
CREATE POLICY "anyone can subscribe" ON public.newsletter_subscribers
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND lang IN ('tr','en')
  );

-- Allow admins to update/delete newsletter subscribers (e.g., unsubscribe handling)
CREATE POLICY "admins can update subscribers" ON public.newsletter_subscribers
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "admins can delete subscribers" ON public.newsletter_subscribers
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Lock down user_roles: only admins can manage role grants
CREATE POLICY "only admins insert roles" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "only admins update roles" ON public.user_roles
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "only admins delete roles" ON public.user_roles
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
