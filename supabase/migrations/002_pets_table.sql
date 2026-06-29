create table public.pets (
  id                      uuid primary key default gen_random_uuid(),
  user_id                 uuid references auth.users on delete cascade not null,
  name                    text not null,
  species                 text not null,
  breed                   text,
  gender                  text default 'unknown',
  date_of_birth           date,
  weight                  numeric,
  weight_unit             text default 'kg',
  photo_url               text,
  color                   text,
  microchip_id            text,
  allergies               text,
  medical_conditions      text,
  current_medications     text,
  insurance_carrier       text,
  insurance_policy        text,
  vet_name                text,
  vet_phone               text,
  emergency_contact_name  text,
  emergency_contact_phone text,
  favorite_food           text,
  favorite_treats         text,
  notes                   text,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

alter table public.pets enable row level security;

create policy "Users can manage their own pets"
  on public.pets for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create trigger pets_updated_at
  before update on public.pets
  for each row execute procedure public.set_updated_at();
