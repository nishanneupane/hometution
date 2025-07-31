-- Create default admin user
INSERT INTO admins (id, email, password, name, created_at, updated_at)
VALUES (
  'admin_001',
  'admin@hrhometuition.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: password
  'System Administrator',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;
