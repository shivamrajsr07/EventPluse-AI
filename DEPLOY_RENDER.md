# Deploy EventPulseAI on Render

## Option 1: Blueprint deploy

1. Push this project to GitHub.
2. Open Render and choose **New +** -> **Blueprint**.
3. Select the GitHub repo.
4. Render will read `render.yaml` and create:
   - `eventpulseai-backend`
   - `eventpulseai-frontend`
5. After the backend URL is created, check the frontend environment variable:
   - `VITE_API_URL=https://eventpulseai-backend.onrender.com`
6. Redeploy the frontend if you change `VITE_API_URL`.

## Option 2: Manual deploy

### Backend

- Type: Web Service
- Root directory: `backend`
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app:app --host 0.0.0.0 --port $PORT`
- Health check path: `/`

### Frontend

- Type: Static Site
- Root directory: `frontend`
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Environment variable:
  - `VITE_API_URL=https://YOUR-BACKEND-NAME.onrender.com`
- Rewrite rule:
  - Source: `/*`
  - Destination: `/index.html`

## Notes

The backend CORS setup allows local development and Render `.onrender.com` URLs.
