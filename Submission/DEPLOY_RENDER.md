# Deploy EventPulseAI on Render

This project is ready for Render Blueprint deployment. The root `render.yaml` creates two services:

- `eventpulseai-backend` - FastAPI backend
- `eventpulseai-frontend` - React static frontend

## One-Click Deploy

Use this link after the latest files are pushed to GitHub:

```text
https://dashboard.render.com/blueprint/new?repo=https://github.com/shivamrajsr07/EventPluse-AI
```

If the query link does not auto-select the repo, open:

```text
https://dashboard.render.com/blueprint/new
```

Then choose:

```text
https://github.com/shivamrajsr07/EventPluse-AI
```

## Expected URLs

After deployment, Render should create:

```text
Frontend: https://eventpulseai-frontend.onrender.com
Backend:  https://eventpulseai-backend.onrender.com
Docs:     https://eventpulseai-backend.onrender.com/docs
```

## Backend Settings

Render reads these from `render.yaml`:

```text
Root directory: backend
Build command: pip install -r requirements.txt
Start command: uvicorn app:app --host 0.0.0.0 --port $PORT
Health check path: /
```

## Frontend Settings

Render reads these from `render.yaml`:

```text
Root directory: frontend
Build command: npm install && npm run build
Publish directory: dist
```

Frontend environment variable:

```text
VITE_API_URL=https://eventpulseai-backend.onrender.com
```

## Final Checklist

- Push the latest `render.yaml` to GitHub.
- Deploy from Render Blueprint.
- Wait for backend and frontend builds to finish.
- Open the frontend URL.
- Test Predict, Simulator, Analytics, and Heatmap pages.

## Troubleshooting

If the frontend opens but prediction fails, check the frontend environment variable:

```text
VITE_API_URL=https://eventpulseai-backend.onrender.com
```

If the backend fails to start, open backend logs in Render and confirm model/data files were pushed to GitHub.
