DROP POLICY IF EXISTS "messages_public_insert" ON public.messages;
CREATE POLICY "messages_public_insert" ON public.messages
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(trim(sender_name)) BETWEEN 1 AND 120
  AND length(trim(sender_email)) BETWEEN 3 AND 320
  AND sender_email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  AND length(trim(body)) BETWEEN 1 AND 5000
  AND length(coalesce(subject, '')) <= 200
  AND read = false
  AND archived = false
);
