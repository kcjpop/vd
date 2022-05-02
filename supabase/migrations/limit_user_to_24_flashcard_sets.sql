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
