-- Add testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    message TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    location TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    related_id TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample testimonials
INSERT INTO testimonials (id, name, role, message, rating, location) VALUES
('test1', 'Priya Sharma', 'student', 'HR Home Tuition helped me improve my math grades significantly. The teacher was very patient and explained concepts clearly.', 5, 'Kathmandu'),
('test2', 'Ram Bahadur', 'parent', 'Excellent service! My daughter''s English has improved a lot since she started taking classes. Highly recommended.', 5, 'Lalitpur'),
('test3', 'Sita Poudel', 'student', 'The science tutor was amazing. Made complex topics easy to understand. Thank you HR Home Tuition!', 4, 'Bhaktapur');

-- Insert sample notifications
INSERT INTO notifications (id, title, message, type, is_read) VALUES
('notif1', 'New Student Registration', 'A new student "Anita Gurung" has registered for Math and Science tutoring.', 'student_registration', FALSE),
('notif2', 'Teacher Application', 'New teacher application received from "Bikash Thapa" for English subject.', 'teacher_application', FALSE),
('notif3', 'Tuition Request', 'New tuition request submitted for Grade 10 Physics in Pokhara area.', 'tuition_request', TRUE);
