import duckdb

def initialize_db():
    conn = duckdb.connect("jobs.db")

    # Create or Update Jobs Table
    conn.execute("""
    CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY,
        title VARCHAR NOT NULL,
        company VARCHAR NOT NULL,
        location VARCHAR NOT NULL,
        skills VARCHAR  -- Skills required for job
    );
    """)

    # Create User Profile Table
    conn.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name VARCHAR NOT NULL,
        skills VARCHAR NOT NULL  -- User skills
    );
    """)

    # Populate Jobs
    conn.execute("""
    INSERT INTO jobs (id, title, company, location, skills) VALUES
    (1, 'Data Engineer', 'TechCorp', 'San Francisco', 'Python,SQL'),
    (2, 'AI Specialist', 'AI Labs', 'Remote', 'Python,Machine Learning'),
    (3, 'Frontend Developer', 'Webify', 'New York', 'JavaScript,React'),
    (4, 'Project Manager', 'ConstructIt', 'Seattle', 'Management,Agile'),
    (5, 'Backend Developer', 'ServerCore', 'Austin', 'Python,Django')
    ON CONFLICT (id) DO NOTHING;
    """)

    # Sample Users
    conn.execute("""
    INSERT INTO users (id, name, skills) VALUES
    (1, 'Alice', 'Python,SQL,React'),
    (2, 'Bob', 'Management,Agile'),
    (3, 'Charlie', 'JavaScript,Machine Learning')
    ON CONFLICT (id) DO NOTHING;
    """)

    conn.close()

if __name__ == "__main__":
    initialize_db()