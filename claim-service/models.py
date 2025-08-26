from datetime import datetime
from database import db

class Claim(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(100), nullable=False)
    policy_id = db.Column(db.String(50), nullable=False)
    policy_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(50), default="Pending")  # Pending -> Approved by Agent -> Approved
