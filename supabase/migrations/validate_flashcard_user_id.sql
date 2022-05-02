create or replace function validate_upsert_flashcard_fn() returns trigger as $fn$
  declare
    setUserId uuid;
  begin
    select user_id into setUserId from public.flashcard_sets where id=new.set_id;
    
    if setUserId <> new.user_id then
      raise exception using
        message='UNAUTHORIZED_MODIFY_FLASHCARDS',
        hint='User not allow to modify flashcard in the other flashcard_set';
    end if;

    return new;
  end;
$fn$ language plpgsql;

create trigger validate_before_insert_flashcard_trigger
  before INSERT
  on public.flashcards
  FOR EACH row
  execute function validate_upsert_flashcard_fn();

create trigger validate_before_update_flashcard_trigger
  before update
  on public.flashcards
  FOR EACH row
  execute function validate_upsert_flashcard_fn();