FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

EXPOSE 5002
ENV PYTHONUNBUFFERED=1

#Ensures Python outputs logs directly to the console without buffering.

CMD ["python", "app.py"]
