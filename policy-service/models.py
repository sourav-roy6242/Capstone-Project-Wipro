from datetime import datetime
from database import db

class Policy(db.Model):
    __tablename__ = "policies"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    policy_type = db.Column(db.String(100), nullable=False)
    premium = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default="PENDING", nullable=False)
    notes = db.Column(db.Text, nullable=True)

    agent_id = db.Column(db.Integer, nullable=True)
    admin_id = db.Column(db.Integer, nullable=True)

    agent_approved_at = db.Column(db.DateTime, nullable=True)
    admin_approved_at = db.Column(db.DateTime, nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "policy_type": self.policy_type,
            "premium": self.premium,
            "status": self.status,
            "notes": self.notes,
            "agent_id": self.agent_id,
            "admin_id": self.admin_id,
            "agent_approved_at": self.agent_approved_at.isoformat() if self.agent_approved_at else None,
            "admin_approved_at": self.admin_approved_at.isoformat() if self.admin_approved_at else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
    
    # Add to_dict method as an alias for serialize for compatibility
    def to_dict(self):
        return self.serialize()