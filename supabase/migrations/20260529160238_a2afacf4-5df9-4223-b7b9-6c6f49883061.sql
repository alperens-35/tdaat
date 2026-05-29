
CREATE TABLE public.arf_threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT 'Yeni sohbet',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.arf_threads TO authenticated;
GRANT ALL ON public.arf_threads TO service_role;

ALTER TABLE public.arf_threads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own threads" ON public.arf_threads FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own threads" ON public.arf_threads FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own threads" ON public.arf_threads FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own threads" ON public.arf_threads FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.arf_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL REFERENCES public.arf_threads(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user','assistant','system')),
  message jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX arf_messages_thread_idx ON public.arf_messages(thread_id, created_at);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.arf_messages TO authenticated;
GRANT ALL ON public.arf_messages TO service_role;

ALTER TABLE public.arf_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own messages" ON public.arf_messages FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own messages" ON public.arf_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own messages" ON public.arf_messages FOR DELETE TO authenticated USING (auth.uid() = user_id);
