📈 Performance Monitoring with Datadog and Load Testing with Locust

Let’s implement performance monitoring for Flask (backend) using Datadog and load testing with Locust.

1. Performance Monitoring with Datadog (Flask Backend)

1. Setup Datadog Account

	•	Go to https://www.datadoghq.com and create a free account.
	•	After logging in, retrieve your API Key from Integrations > API Keys.

2. Install Datadog Agent

On your Flask server (Render):

pip install datadog

3. Add Datadog to Flask

app.py

from datadog import initialize, statsd

# Datadog Configuration
options = {
    'api_key': 'YOUR_DATADOG_API_KEY',
    'app_key': 'YOUR_DATADOG_APP_KEY'
}
initialize(**options)

@app.before_request
def start_timer():
    statsd.increment('flask.request.count')
    statsd.histogram('flask.request.duration', 1)

@app.after_request
def log_response(response):
    statsd.increment('flask.response.count', tags=['status:{}'.format(response.status_code)])
    return response

# Simulate High Load Endpoint (for testing)
@app.route('/heavy')
def heavy_task():
    import time
    time.sleep(3)
    return "Heavy Task Done"

4. Test Performance

	•	Visit https://job-backend.onrender.com/heavy to simulate a heavy load.
	•	Log into Datadog and go to APM (Application Performance Monitoring) to see request metrics.

2. Load Testing with Locust

1. Install Locust

pip install locust

2. Create a Locust Test File

Create locustfile.py in the backend/ directory.

backend/locustfile.py

from locust import HttpUser, task, between

class JobAppUser(HttpUser):
    wait_time = between(1, 2.5)

    @task
    def load_jobs(self):
        self.client.get("/jobs")

    @task
    def apply_job(self):
        self.client.post("/apply", json={"job_id": 1, "user_id": 1})

    @task
    def schedule_interview(self):
        self.client.post("/interview/schedule", json={
            "job_id": 1,
            "user_id": 1,
            "interview_time": "2024-01-01T10:00:00"
        })

    @task
    def heavy_task(self):
        self.client.get("/heavy")

3. Run Locust Test

locust -f locustfile.py

	•	Visit http://localhost:8089 to access the Locust Web UI.
	•	Simulate users and test Flask performance.

3. Monitor React (Frontend) Performance with Google Analytics

1. Add Google Analytics to React

	1.	Go to Google Analytics and create a new property.
	2.	Copy your Measurement ID (e.g., G-XXXXXXX).

2. Install React Google Analytics Library

npm install react-ga4

3. Configure Google Analytics in React

src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import ReactGA from 'react-ga4';

// Initialize Google Analytics
ReactGA.initialize('G-XXXXXXX');
ReactGA.send('pageview');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

4. Track Button Clicks and Events

src/App.js

import ReactGA from 'react-ga4';

function scheduleInterview(job_id) {
    ReactGA.event({
        category: 'User',
        action: 'Scheduled Interview',
        label: `Job ID: ${job_id}`
    });
    // Proceed with interview scheduling
}

📊 View Results

	•	Locust: See load performance in real-time.
	•	Datadog: Monitor Flask requests, response times, and traffic spikes.
	•	Google Analytics: Track user actions and engagement in React.

✅ Next Steps

	•	Automate Load Testing with GitHub Actions.
	•	Stress Test with 1000+ virtual users using Locust.
	•	Expand Monitoring by integrating Sentry and Datadog together.

Would you like to automate load tests or proceed with scaling Flask using Kubernetes?