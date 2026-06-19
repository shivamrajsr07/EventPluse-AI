# 🚦 EventPulse AI

### AI-Powered Event Traffic Intelligence & Congestion Prediction Platform

EventPulse AI is an intelligent traffic management platform that predicts event-driven congestion, estimates road-closure probability, recommends traffic resources, and helps authorities proactively manage traffic during public events, VIP movements, protests, processions, and construction activities.

Built using Machine Learning, FastAPI, React, XGBoost, and Interactive Geospatial Analytics.

---

## 🎯 Problem Statement

Political rallies, festivals, sports events, construction activities, VIP movements, and sudden gatherings create localized traffic breakdowns.

Current systems rely heavily on manual planning, experience-based deployment, and reactive traffic management.

EventPulse AI enables:

* Congestion prediction before an event occurs
* Road closure probability estimation
* Resource planning recommendations
* Event impact simulation
* Historical analytics and hotspot identification
* Interactive traffic intelligence dashboard

---

## ✨ Features

### 🤖 AI Prediction Engine

* XGBoost-powered prediction model
* Road closure probability estimation
* Event impact scoring
* Risk categorization

### 🚔 Resource Recommendation Engine

Automatically recommends:

* Police deployment
* Barricades
* Diversion routes

based on predicted event impact.

### 📊 Analytics Dashboard

* Event distribution analysis
* Zone risk ranking
* Historical traffic insights
* Operational intelligence

### 🗺️ Interactive Heatmap

* Event hotspot visualization
* Location-based congestion insights
* Risk concentration mapping

### 🎤 Speak Bot Assistant

Voice-enabled guide that helps users:

* Navigate the dashboard
* Explain analytics
* Understand predictions

### 🎮 Event Simulation Engine

Simulate scenarios such as:

* VIP Movement
* Public Event
* Procession
* Protest
* Construction Activity

and instantly view:

* Closure Probability
* Impact Score
* Resource Recommendations

---

## 🏗️ System Architecture

User Input
↓
Prediction API
↓
XGBoost Model
↓
Impact Engine
↓
Resource Recommendation
↓
AI Explanation
↓
Analytics Dashboard
↓
Interactive Heatmap

---

## 🧠 Machine Learning Pipeline

### Dataset

Historical event traffic dataset containing:

* Event Type
* Event Cause
* Zone
* Junction
* Latitude
* Longitude
* Event Duration
* Road Closure Status

### Feature Engineering

Generated features:

* Duration Hours
* Hour of Day
* Day of Week
* Month
* Weekend Flag
* Zone Density
* Junction Density

### Models Evaluated

* Random Forest
* XGBoost

### Best Model

XGBoost

Performance:

* Accuracy: 82.22%
* Precision: 85%
* Recall: 52%
* F1 Score: 65%

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* Recharts
* React Leaflet

### Backend

* FastAPI
* Python
* Pandas
* Scikit-learn
* XGBoost
* Joblib

### Deployment

* Render
* GitHub

---

## 📂 Project Structure

EventPulse-AI/

backend/
├── app.py
├── schemas.py
├── services/
├── model/
├── data/

frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.jsx

README.md

---

## 🚀 Local Setup

### Backend

pip install -r requirements.txt

uvicorn app:app --reload

### Frontend

npm install

npm run dev

---

## 📡 API Endpoints

GET /

POST /predict

GET /simulate

GET /analytics

GET /zone-risk

---

## 🎯 Use Cases

* Smart Cities
* Traffic Police
* Urban Mobility Management
* Event Planning Authorities
* Disaster Response Teams
* Public Safety Agencies

---

## 👨‍💻 Team ShivShakti

Built for Event-Driven Congestion Intelligence Hackathon.

Transforming traffic management from reactive to predictive.
