from fastapi import FastAPI
import duckdb
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (or specify frontend URL)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],
)

@app.get("/jobs")
def get_jobs():
    conn = duckdb.connect("jobs.db")
    jobs = conn.execute("SELECT * FROM jobs").fetchall()
    conn.close()
    return [{"id": j[0], "title": j[1], "company": j[2], "location": j[3], "skills": j[4]} for j in jobs]

@app.post("/apply/{job_id}")
def apply_job(job_id: int):
    # Simulate job application (log to console or database)
    print(f"User applied to job with ID: {job_id}")
    return {"message": f"Successfully applied to job {job_id}"}

@app.get("/recommendations/{user_id}")
def recommend_jobs(user_id: int):
    conn = duckdb.connect("jobs.db")

    # Get user skills
    user = conn.execute(f"SELECT skills FROM users WHERE id = {user_id}").fetchone()
    if not user:
        return {"error": "User not found"}

    user_skills = user[0].split(',')

    # Find jobs matching user skills
    query = f"""
    SELECT * FROM jobs
    WHERE array_has([skills], '{','.join(user_skills)}')
    """
    recommendations = conn.execute(query).fetchall()
    conn.close()

    return [{"id": j[0], "title": j[1], "company": j[2], "location": j[3], "skills": j[4]} for j in recommendations]