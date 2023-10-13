-- Add deleted_at column to public.flashcard_sets
ALTER TABLE
  public.flashcard_sets
ADD
  COLUMN IF NOT EXISTS deleted_at timestamptz;

-- Add deleted_at column to public.flashcards
ALTER TABLE
  public.flashcards
ADD
  COLUMN IF NOT EXISTS deleted_at timestamptz;

-- Create or replace function to soft delete public.flashcard_sets and public.flashcards
CREATE
OR REPLACE FUNCTION flashcard_sets_soft_delete_fn() RETURNS TRIGGER AS $fn$
  BEGIN
    UPDATE public.flashcard_sets SET deleted_at=now() WHERE id=OLD.id;
    UPDATE public.flashcards SET deleted_at=now() WHERE set_id=OLD.id;
    RETURN NULL;
  END;
$fn$ LANGUAGE plpgsql;

-- Drop trigger 'before delete public.flashcard_sets' before create
DROP TRIGGER IF EXISTS flashcard_sets_soft_delete_trigger ON public.flashcard_sets CASCADE;

-- Add trigger to before delete public.flashcard_sets
CREATE TRIGGER flashcard_sets_soft_delete_trigger BEFORE DELETE ON public.flashcard_sets FOR EACH ROW EXECUTE FUNCTION flashcard_sets_soft_delete_fn();

-- Create a view to hide deleted flashcard_sets
CREATE
OR REPLACE VIEW flashcard_sets_view AS
SELECT

CREATE INDEX IF NOT EXISTS deleted_at_idx ON public.flashcard_sets (deleted_at);
  *
FROM
  public.flashcard_sets
WHERE
  deleted_at = null;

-- Create a view to hide deleted flashcards
CREATE
OR REPLACE VIEW flashcards_view AS
SELECT
  *
FROM
  public.flashcards
WHERE
  deleted_at = null;

CREATE INDEX IF NOT EXISTS deleted_at_idx ON public.flashcards (deleted_at);
