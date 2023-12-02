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

INSERT INTO users (username, password, avg_rating, total_ratings) 
VALUES 
  ('jack', '$2b$10$MM7e.vX1rEAO4V7m6WN0/.QVoeWv8jSuPyK1c217tu65HEqKVrGmO', 3, 2),
  ('sheila', '$2b$10$SEhbaHw2/cGAI3tvuHvtyOC9v4kxAm0uwNmJYAeejZuX8C8Epx092', 0, 0),
  ('peter', '$2b$10$A0w14/lfXRDcTpd/EEg2MeSuYYhglHw9pFT5d5Trpz.vH9qq0rOcW', 5, 1),
  ('max', '$2b$10$sx9Fr.d0h4RBO5UbtOqw7uF2HC4o4xhdGdYy4IwwzOQI6QaA48mtO', 4.25, 4)
;

INSERT INTO stories (title, story, username, avg_rating, total_ratings, created_at)
VALUES 
  ('The Execution of a Farmer Boy', '“I lost all faith when I realised not all caterpillars turn into butterflies.”', 'jack', 3, 2, '2023-12-02 04:21:43.622358+00'),
  ('The Tragedy of Flight 147', '“I dare you,” seven year old Michael teased his brother, who had his hands firmly on the lever of the door.', 'max', 3.5, 2, '2023-12-02 04:22:49.87853+00'),
  ('The Needle Killer', '“He won’t remember me doing this when he’s older,” his mother kept telling herself.', 'max', 5, 2, '2023-12-02 04:23:34.407971+00'),
  ('21st Century Man – A Study', '“I post, therefore I am.”', 'peter', 5, 1, '2023-12-02 04:26:13.316055+00'),
  ('The Abused Dancer', 'After everyone left, she did endless pirouettes on his grave.', 'sheila', 0, 0, '2023-12-02 04:28:44.488579+00')
;

INSERT INTO ratings (rating, comment, username, story_id, created_at)
VALUES 
  (5, 'Awesome.', 'max', 1, '2023-12-02 04:22:20.493299+00'),
  (1, 'Meh', 'peter', 1, '2023-12-02 04:24:49.589076+00'),
  (5, 'Wtf', 'peter', 3, '2023-12-02 04:25:01.814355+00'),
  (4, 'Haha no way!', 'peter', 2, '2023-12-02 04:25:17.223094+00'),
  (5, 'I comment, therefore I am.', 'sheila', 4, '2023-12-02 04:27:05.833645+00'),
  (3, 'Unrealistic but scary nonetheless.', 'sheila', 2, '2023-12-02 04:27:31.032164+00'),
  (5, 'Wtfff', 'sheila', 3, '2023-12-02 04:27:44.844192+00')
;