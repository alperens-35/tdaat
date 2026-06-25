
-- Create a private schema not exposed via the Data API
CREATE SCHEMA IF NOT EXISTS private;

-- Recreate has_role inside the private schema
CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Only the RLS policies (running as table owner) and service_role need to invoke it.
REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- Rewrite every policy that referenced public.has_role to use private.has_role
DROP POLICY IF EXISTS "admins can view applications" ON public.membership_applications;
CREATE POLICY "admins can view applications" ON public.membership_applications
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins can update applications" ON public.membership_applications;
CREATE POLICY "admins can update applications" ON public.membership_applications
  FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins can view subscribers" ON public.newsletter_subscribers;
CREATE POLICY "admins can view subscribers" ON public.newsletter_subscribers
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins can update subscribers" ON public.newsletter_subscribers;
CREATE POLICY "admins can update subscribers" ON public.newsletter_subscribers
  FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins can delete subscribers" ON public.newsletter_subscribers;
CREATE POLICY "admins can delete subscribers" ON public.newsletter_subscribers
  FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins can view registrations" ON public.event_registrations;
CREATE POLICY "admins can view registrations" ON public.event_registrations
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins can update registrations" ON public.event_registrations;
CREATE POLICY "admins can update registrations" ON public.event_registrations
  FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins can delete registrations" ON public.event_registrations;
CREATE POLICY "admins can delete registrations" ON public.event_registrations
  FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "only admins insert roles" ON public.user_roles;
CREATE POLICY "only admins insert roles" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "only admins update roles" ON public.user_roles;
CREATE POLICY "only admins update roles" ON public.user_roles
  FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "only admins delete roles" ON public.user_roles;
CREATE POLICY "only admins delete roles" ON public.user_roles
  FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- Drop the public-exposed version
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
