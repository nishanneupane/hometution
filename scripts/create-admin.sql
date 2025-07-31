-- Create admin user for the platform
INSERT INTO "Admin" (id, email, password, name, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'admin@hrtuition.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMesJVe4JEWBFgUvVN/lm/HXVS', -- password: admin123
  'Admin User',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;
