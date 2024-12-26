# tinderjobs

1. Frontend – Basic Setup (React Project Initialization)

If you haven’t already, initialize a React app:

npx create-react-app job-swipe-frontend
cd job-swipe-frontend
npm install axios socket.io-client

3. Backend – Environment Setup

Install the necessary backend dependencies:

pip install flask flask-cors flask-socketio duckdb google-api-python-client google-auth google-auth-oauthlib google-auth-httplib2

4. Google API – Credentials

	•	Ensure you download the credentials.json file from the Google Cloud Console after setting up the Google Calendar API.
	•	Place the file in your backend directory.

5. Project Structure

job-swipe-app/
│
├── backend/
│   ├── app.py
│   ├── credentials.json
│
└── frontend/
    ├── src/
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    │
    └── public/
        └── index.html

How to Run the App:

	1.	Backend:

cd backend
python app.py

	2.	Frontend:

cd frontend
npm start

Google Cloud API Setup (Calendar Integration):

	1.	Enable Google Calendar API:
	•	Go to Google Cloud Console.
	•	Create a project or select an existing one.
	•	Navigate to APIs & Services > Library.
	•	Search for Google Calendar API and enable it.
	2.	Create Service Account Credentials:
	•	Go to APIs & Services > Credentials.
	•	Click on Create Credentials > Service Account.
	•	Download the JSON key (this will be your credentials.json).
	3.	Add Calendar Permissions:
	•	Share your Google Calendar with the service account email (found in the credentials.json file).
	•	Give Editor permissions so the app can schedule events.

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