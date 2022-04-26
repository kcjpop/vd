ALTER TABLE public.flashcards ADD COLUMN IF NOT EXISTS user_id uuid;

UPDATE ONLY public.flashcards
  SET user_id = set.user_id
  FROM (SELECT id, user_id FROM public.flashcard_sets) AS set
  WHERE set_id = set.id;

ALTER TABLE public.flashcard_sets ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.flashcard_sets ADD CONSTRAINT flashcards_user_id_fk FOREIGN KEY (user_id) REFERENCES auth.users(id) on DELETE CASCADE;
