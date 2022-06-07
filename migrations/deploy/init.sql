-- Deploy Rawtube:init to pg

BEGIN;

CREATE TABLE "rawtube_user" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    description TEXT,
    avatar TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "rawtube_video" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    url_file TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    url_Thumbnail TEXT,
    public BOOLEAN NOT NULL,
    views INT NOT NULL DEFAULT 0,
    duration TEXT,
    user_id INT REFERENCES rawtube_user(id) ON DELETE SET NULL,
    release_date TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "rawtube_commentaries" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT REFERENCES rawtube_user(id) ON DELETE SET NULL,
    video_id INT REFERENCES rawtube_video(id) ON DELETE SET NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "rawtube_user_has_fav" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT REFERENCES rawtube_user(id) ON DELETE SET NULL,
    video_id INT REFERENCES rawtube_video(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);



COMMIT;
