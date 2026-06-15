CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    expense_value BIGINT NOT NULL,
    transaction_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    user_id INT NOT NULL,
    transaction_type ENUM('debit', 'credit') NOT NULL DEFAULT 'debit',

    CONSTRAINT fk_expenses_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_expenses_user_id
ON expenses(user_id);