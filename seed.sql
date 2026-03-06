-- Namu Wellness - Seed Data

CREATE TABLE IF NOT EXISTS programs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category ENUM('meditacao', 'exercicio', 'nutricao') NOT NULL,
  duration_weeks INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  program_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  day_of_week ENUM('segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo') NOT NULL,
  duration_minutes INT NOT NULL,
  FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS participations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  activity_id INT NOT NULL,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);

-- Programas
INSERT INTO programs (name, description, category, duration_weeks) VALUES
('Mindfulness para Iniciantes', 'Programa de meditação guiada para quem está começando a prática de mindfulness.', 'meditacao', 4),
('Yoga Matinal', 'Sequências de yoga para começar o dia com energia e foco.', 'exercicio', 8),
('Nutrição Consciente', 'Programa de reeducação alimentar com foco em alimentação saudável e equilibrada.', 'nutricao', 6);

-- Atividades
INSERT INTO activities (program_id, title, description, day_of_week, duration_minutes) VALUES
(1, 'Respiração Consciente', 'Exercício de respiração para acalmar a mente.', 'segunda', 15),
(1, 'Body Scan', 'Meditação guiada de escaneamento corporal.', 'quarta', 20),
(2, 'Saudação ao Sol', 'Sequência clássica de yoga para aquecer o corpo.', 'terca', 30),
(2, 'Yoga Restaurativa', 'Posturas suaves para relaxamento profundo.', 'quinta', 45),
(3, 'Planejamento de Refeições', 'Organização do cardápio semanal saudável.', 'segunda', 25),
(3, 'Mindful Eating', 'Prática de alimentação consciente e presente.', 'sexta', 20);

-- Participações
INSERT INTO participations (user_name, activity_id, completed_at, notes) VALUES
('Ana Silva', 1, '2025-01-15 08:00:00', 'Primeira sessão, muito tranquila.'),
('Carlos Santos', 3, '2025-01-15 07:00:00', 'Ótima forma de começar o dia.'),
('Ana Silva', 2, '2025-01-17 09:00:00', 'Consegui relaxar bastante.'),
('Maria Oliveira', 5, '2025-01-13 18:00:00', 'Planejei a semana toda.'),
('Carlos Santos', 1, '2025-01-20 08:30:00', 'Melhorando a concentração.');