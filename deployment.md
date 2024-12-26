Here’s a step-by-step guide to deploy your frontend (React) on Vercel and the backend (Flask) on Render.

🚀 Deploy Flask Backend on Render

Render is a great choice for deploying Flask apps, and it supports WebSockets natively.

1. Setup Render Account

	•	Go to https://render.com and create an account.
	•	In the dashboard, click New Web Service.

2. Prepare Backend for Deployment

	1.	Create requirements.txt in your backend/ folder.

flask
flask-cors
flask-socketio
duckdb
google-api-python-client
google-auth
google-auth-oauthlib
google-auth-httplib2
eventlet

	2.	Add start.sh to run the Flask app.

#!/bin/bash
python app.py

	3.	Modify app.py for Production
Update the last part of your app.py to handle production settings.

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=10000)

3. Deploy to Render

	1.	In the Render dashboard, select New Web Service.
	2.	Connect your GitHub/GitLab repository (or directly upload your code).
	3.	Choose backend/ as the project root.
	4.	Fill in the service details:
	•	Environment: Python 3.x
	•	Build Command: pip install -r requirements.txt
	•	Start Command: bash start.sh
	•	Port: 10000 (same as Flask app)
	5.	Click Deploy.
	6.	After deployment, copy the Render URL (e.g., https://job-backend.onrender.com).

🚀 Deploy React Frontend on Vercel

Vercel is quick and easy for React deployments.

1. Setup Vercel Account

	•	Go to https://vercel.com and create an account.
	•	Click New Project and import your GitHub project.

2. Prepare Frontend for Deployment

	1.	Add Proxy to Frontend
In frontend/package.json, add a proxy to point to the backend URL (from Render).

"proxy": "https://job-backend.onrender.com"

	2.	Build the Frontend

npm run build

	3.	Create vercel.json
Add this to your frontend/ root.

{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://job-backend.onrender.com/api/$1"
    }
  ]
}

3. Deploy to Vercel

	1.	In the Vercel dashboard, import your project.
	2.	Select the frontend/ folder.
	3.	Click Deploy.
	4.	After deployment, copy the Vercel URL (e.g., https://job-frontend.vercel.app).

🔄 Testing the App

	1.	Visit the Vercel URL (React frontend).
	2.	Test the swiping functionality and apply for jobs.
	3.	Check Google Calendar for interview scheduling events.
	4.	Confirm real-time updates via WebSockets (Render backend).

🌐 Domain Setup (Optional)

	•	You can connect a custom domain to Vercel for the frontend.
	•	For the backend, use Render’s free domain or link a custom domain.

Would you like assistance with configuring WebSockets for secure HTTPS or domain linking for a professional look?