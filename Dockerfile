# ==============================================================================
# MEDVAULT AI - Multi-Stage Production Dockerfile
# Stage 1: Build React Frontend
# Stage 2: Python Flask Backend + PyMuPDF + Tesseract OCR + Built SPA Assets
# ==============================================================================

# Stage 1: Frontend Build
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# Stage 2: Production Python Runtime
FROM python:3.10-slim AS runner
WORKDIR /app

# Install system dependencies for PyMuPDF and OCR
RUN apt-get update && apt-get install -y --no-install-recommends \
    tesseract-ocr \
    libtesseract-dev \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python requirements
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt gunicorn

# Copy Backend Application
COPY backend/ ./backend/
COPY database/ ./database/

# Copy compiled frontend from Stage 1 into frontend/dist
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Expose Web Port
EXPOSE 5000

ENV PORT=5000
ENV FLASK_ENV=production
ENV PYTHONUNBUFFERED=1

# Run via Python app or Gunicorn
CMD ["python", "backend/app.py"]
