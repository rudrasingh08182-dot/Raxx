-- Run this once in the Supabase SQL editor before uploading any data.

create extension if not exists vector;

create table if not exists knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  embedding vector(768),
  category text,          -- school | competitive-exam | btech-cse
  subject text,            -- maths, physics, dsa, polity...
  level text,               -- class-10, ssc-cgl, upsc, sem-5
  chapter int,
  chapter_name text,
  content_type text,        -- concept | formula | solved-example | practice-question | summary
  title text,
  tags text[],
  source_file text,
  created_at timestamp default now()
);

create index if not exists knowledge_chunks_embedding_idx
  on knowledge_chunks
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- RPC function for filtered similarity search (used by your RAG retrieval API)
create or replace function match_knowledge_chunks(
  query_embedding vector(768),
  match_count int default 5,
  filter_category text default null,
  filter_level text default null,
  filter_subject text default null
)
returns table (
  id uuid, content text, title text,
  category text, level text, subject text,
  similarity float
)
language sql stable as $$
  select id, content, title, category, level, subject,
         1 - (embedding <=> query_embedding) as similarity
  from knowledge_chunks
  where (filter_category is null or category = filter_category)
    and (filter_level is null or level = filter_level)
    and (filter_subject is null or subject = filter_subject)
  order by embedding <=> query_embedding
  limit match_count;
$$;
