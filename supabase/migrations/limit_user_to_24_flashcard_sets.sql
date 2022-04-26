DROP FUNCTION IF EXISTS check_user_flashcard_sets_amount CASCADE;
CREATE OR REPLACE FUNCTION check_user_flashcard_sets_amount() RETURNS TRIGGER AS $fn$
  DECLARE
    rc int;
  BEGIN
    rc := (SELECT count(*) FROM public.flashcard_sets WHERE user_id = NEW.user_id); 
    RAISE NOTICE 'number of rows %', rc;
    IF rc >= 24 THEN
      RAISE EXCEPTION 'User has exceed maximum number of allowed flashcard sets. %', rc;
    END IF;
    RETURN NEW;
  END;
$fn$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS validate_flashcard_sets_limit_trigger on public.flashcard_sets CASCADE;
CREATE TRIGGER validate_flashcard_sets_limit_trigger
  BEFORE INSERT ON public.flashcard_sets
  FOR EACH ROW
  EXECUTE FUNCTION check_user_flashcard_sets_amount();