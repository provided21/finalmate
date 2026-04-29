-- FinalMate 后续真实数据库设计草案

CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE courses (
  id UUID PRIMARY KEY,
  owner_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  semester TEXT,
  exam_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE course_files (
  id UUID PRIMARY KEY,
  course_id UUID REFERENCES courses(id),
  filename TEXT NOT NULL,
  mime_type TEXT,
  storage_url TEXT,
  parse_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE knowledge_units (
  id UUID PRIMARY KEY,
  course_id UUID REFERENCES courses(id),
  title TEXT NOT NULL,
  chapter TEXT,
  exam_weight INTEGER DEFAULT 0,
  mastery INTEGER DEFAULT 0,
  content JSONB NOT NULL DEFAULT '{}'
);

CREATE TABLE wrongbook_items (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  course_id UUID REFERENCES courses(id),
  unit_id UUID REFERENCES knowledge_units(id),
  question TEXT NOT NULL,
  answer TEXT,
  feedback JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
