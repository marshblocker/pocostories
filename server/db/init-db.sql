CREATE TABLE Users (
  username VARCHAR(36) NOT NULL UNIQUE,
  password VARCHAR(60) NOT NULL,
  avg_rating FLOAT NOT NULL DEFAULT 0.0,
  total_ratings INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY(username)
);

CREATE TABLE Stories (
  id INT GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(80) NOT NULL,
  story TEXT NOT NULL,
  username VARCHAR(36) NOT NULL,
  avg_rating FLOAT NOT NULL DEFAULT 0.0,
  total_ratings INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY(id),
  CONSTRAINT fk_user
    FOREIGN KEY(username)
      REFERENCES Users(username)
      ON DELETE CASCADE
);

CREATE TABLE Ratings (
  id INT GENERATED ALWAYS AS IDENTITY,
  rating INTEGER NOT NULL,
  comment TEXT NOT NULL DEFAULT '',
  username VARCHAR(36) NOT NULL,
  story_id INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY(id),
  CONSTRAINT fk_user
    FOREIGN KEY(username)
      REFERENCES Users(username)
      ON DELETE CASCADE,
  CONSTRAINT fk_story
    FOREIGN KEY(story_id)
      REFERENCES Stories(id)
      ON DELETE CASCADE
);