-- Add requestType column to students table
ALTER TABLE students ADD COLUMN "requestType" TEXT DEFAULT 'student';

-- Update existing records to have 'student' as default
UPDATE students SET "requestType" = 'student' WHERE "requestType" IS NULL;
