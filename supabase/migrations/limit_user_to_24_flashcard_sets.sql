-- DROP FUNCTION IF EXISTS check_user_flashcard_sets_amount CASCADE;
-- CREATE OR REPLACE FUNCTION check_user_flashcard_sets_amount() RETURNS TRIGGER AS $fn$
--   DECLARE
--     rc int;
--   BEGIN
--     rc := (SELECT count(*) FROM public.flashcard_sets WHERE user_id = NEW.user_id); 
--     RAISE NOTICE 'number of rows %', rc;
--     IF rc >= 24 THEN
--       RAISE EXCEPTION 'User has exceed maximum number of allowed flashcard sets. %', rc;
--     END IF;
--     RETURN NEW;
--   END;
-- $fn$ LANGUAGE plpgsql;

-- DROP TRIGGER IF EXISTS validate_flashcard_sets_limit_trigger on public.flashcard_sets CASCADE;
-- CREATE TRIGGER validate_flashcard_sets_limit_trigger
--   BEFORE INSERT ON public.flashcard_sets
--   FOR EACH ROW
--   EXECUTE FUNCTION check_user_flashcard_sets_amount();

create or replace function limit_number_of_flashcards_fn() returns trigger as $fn$
  declare
    total int;
  begin
    select count(*) into total from public.flashcard_sets where user_id=new.user_id;

    if total  >= 24 then
      raise exception using
        message='MAX_ALLOWED_SETS_CREATED',
        hint='User has exceeded the amount of flashcard sets allowed (24).';
    end if;

    return new;
  end;
$fn$ language plpgsql;

create trigger check_flashcard_sets_limit_trigger
  before insert on public.flashcard_sets
  for each row execute function limit_number_of_flashcards_fn();