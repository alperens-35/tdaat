ALTER TABLE public.membership_applications
  ADD CONSTRAINT membership_applications_status_check
  CHECK (status IN ('pending','approved','rejected'));

CREATE OR REPLACE FUNCTION public.membership_applications_force_pending()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.status := 'pending';
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS membership_applications_lock_status ON public.membership_applications;
CREATE TRIGGER membership_applications_lock_status
  BEFORE INSERT ON public.membership_applications
  FOR EACH ROW EXECUTE FUNCTION public.membership_applications_force_pending();