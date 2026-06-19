# EventPulseAI

EventPulseAI is an event-driven traffic intelligence platform that combines a React command-center frontend with a FastAPI backend for road-closure prediction, traffic impact simulation, analytics, and hotspot visualization.

## Modules

- `frontend/` - React, Vite, Tailwind CSS dashboard
- `backend/` - FastAPI API, prediction services, analytics, and model artifacts
- `render.yaml` - Render blueprint for deploying frontend and backend together
- `DEPLOY_RENDER.md` - Render deployment guide

## Main Features

- Event impact prediction
- Road-closure probability scoring
- VIP movement simulation
- Resource recommendations for police, barricades, and diversions
- Event distribution analytics
- Interactive risk heatmap
- Speak Bot guided UI assistant

## Quick Start

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --host 127.0.0.1 --port 8001
```

Set the frontend API URL if needed:

```bash
VITE_API_URL=http://127.0.0.1:8001
```

## Deployment

Deploy on Render using the included blueprint:

```text
render.yaml
```

Recommended steps:

1. Push this project to GitHub.
2. Go to Render.
3. Choose **New +** -> **Blueprint**.
4. Select your repository.
5. Deploy both services.

See `DEPLOY_RENDER.md` for complete instructions.

## Checks

Frontend:

```bash
cd frontend
npm run lint
npm run build
```

Backend:

```bash
cd backend
python -m py_compile app.py
```
