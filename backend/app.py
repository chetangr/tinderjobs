from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import duckdb
from datetime import datetime, timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

conn = duckdb.connect('jobs.db')

# Google Calendar Setup
SCOPES = ['https://www.googleapis.com/auth/calendar']
SERVICE_ACCOUNT_FILE = 'credentials.json'
credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES
)
calendar_service = build('calendar', 'v3', credentials=credentials)
calendar_id = 'primary'

# Initialize Tables
conn.execute("""
    CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY,
        title VARCHAR,
        company VARCHAR,
        location VARCHAR,
        salary VARCHAR,
        description VARCHAR
    )
""")

conn.execute("""
    CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY,
        job_id INTEGER,
        user_id INTEGER,
        status VARCHAR DEFAULT 'Pending'
    )
""")

conn.execute("""
    CREATE TABLE IF NOT EXISTS interviews (
        id INTEGER PRIMARY KEY,
        job_id INTEGER,
        user_id INTEGER,
        interview_time VARCHAR
    )
""")

# Fetch jobs
@app.route('/jobs', methods=['GET'])
def get_jobs():
    jobs = conn.execute("SELECT * FROM jobs").fetchall()
    return jsonify(jobs)

# Apply for job
@app.route('/apply', methods=['POST'])
def apply_job():
    data = request.json
    conn.execute("INSERT INTO applications (job_id, user_id) VALUES (?, ?)", 
                 (data['job_id'], data['user_id']))

    socketio.emit('match_notification', {
        'job_id': data['job_id'],
        'status': 'Matched',
        'user_id': data['user_id']
    })
    
    return jsonify({'message': 'Application submitted'})

# Schedule interview with Google Calendar
@app.route('/interview/schedule', methods=['POST'])
def schedule_interview():
    data = request.json
    interview_time = data['interview_time']
    job_id = data['job_id']
    user_id = data['user_id']

    conn.execute("INSERT INTO interviews (job_id, user_id, interview_time) VALUES (?, ?, ?)",
                 (job_id, user_id, interview_time))

    event = {
        'summary': 'Job Interview',
        'description': f'Interview for Job ID {job_id}',
        'start': {'dateTime': interview_time, 'timeZone': 'America/New_York'},
        'end': {'dateTime': (datetime.fromisoformat(interview_time) + timedelta(hours=1)).isoformat(),
                'timeZone': 'America/New_York'},
        'attendees': [{'email': 'candidate@example.com'}],
    }
    created_event = calendar_service.events().insert(calendarId=calendar_id, body=event).execute()

    socketio.emit('interview_scheduled', {
        'job_id': job_id,
        'user_id': user_id,
        'interview_time': interview_time,
        'calendar_link': created_event['htmlLink']
    })

    return jsonify({'message': 'Interview scheduled', 'event_link': created_event['htmlLink']})

# AI Job Recommendations
@app.route('/recommend/ai/<int:user_id>', methods=['GET'])
def ai_recommendations(user_id):
    query = """
        SELECT DISTINCT * FROM jobs 
        WHERE title IN (
            SELECT title FROM jobs 
            JOIN applications ON jobs.id = applications.job_id
            WHERE applications.user_id = ?
        )
        ORDER BY RANDOM() LIMIT 5
    """
    recommended_jobs = conn.execute(query, (user_id,)).fetchall()
    return jsonify(recommended_jobs)

# if __name__ == '__main__':
#     socketio.run(app, debug=True, host='0.0.0.0')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=10000)