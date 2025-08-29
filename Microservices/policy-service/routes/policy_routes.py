from flask import Blueprint, request, jsonify
from datetime import datetime
from database import db
from models import Policy

policy_bp = Blueprint("policy_bp", __name__)

# ----------- User requests a new policy -----------
@policy_bp.route("/policies", methods=["POST"])
def request_policy():
    data = request.get_json()
    if not data or "user_id" not in data or "policy_type" not in data or "premium" not in data:
        return jsonify({"error": "Missing required fields"}), 400

    new_policy = Policy(
        user_id=data["user_id"],
        policy_type=data["policy_type"],
        premium=data["premium"],
        status="PENDING"
    )
    db.session.add(new_policy)
    db.session.commit()

    return jsonify({"message": "Policy requested", "policy": new_policy.serialize()}), 201


# ----------- Agent approves policy -----------
@policy_bp.route("/policies/<int:policy_id>/agent-approve", methods=["PUT"])
def agent_approve(policy_id):
    policy = Policy.query.get(policy_id)
    if not policy:
        return jsonify({"error": "Policy not found"}), 404
    if policy.status != "PENDING":
        return jsonify({"error": f"Cannot approve in state {policy.status}"}), 400

    data = request.get_json(silent=True) or {}
    policy.agent_id = data.get("agent_id")
    policy.notes = data.get("notes", policy.notes)
    policy.status = "AGENT_APPROVED"
    policy.agent_approved_at = datetime.utcnow()

    db.session.commit()
    return jsonify({"message": "Approved by agent", "policy": policy.serialize()}), 200


# ----------- Admin approves policy -----------
@policy_bp.route("/policies/<int:policy_id>/admin-approve", methods=["PUT"])
def admin_approve(policy_id):
    policy = Policy.query.get(policy_id)
    if not policy:
        return jsonify({"error": "Policy not found"}), 404
    if policy.status != "AGENT_APPROVED":
        return jsonify({"error": f"Cannot approve in state {policy.status}"}), 400

    data = request.get_json(silent=True) or {}
    policy.admin_id = data.get("admin_id")
    policy.notes = data.get("notes", policy.notes)
    policy.status = "CONFIRMED"
    policy.admin_approved_at = datetime.utcnow()

    db.session.commit()
    return jsonify({"message": "Approved by admin", "policy": policy.serialize()}), 200


#  Reject policy (agent/admin) 
@policy_bp.route("/policies/<int:policy_id>/reject", methods=["PUT"])
def reject_policy(policy_id):
    policy = Policy.query.get(policy_id)
    if not policy:
        return jsonify({"error": "Policy not found"}), 404
    if policy.status in ["CONFIRMED", "REJECTED"]:
        return jsonify({"error": f"Cannot reject in state {policy.status}"}), 400

    data = request.get_json(silent=True) or {}
    policy.notes = data.get("notes", "Rejected without details")
    policy.status = "REJECTED"

    db.session.commit()
    return jsonify({"message": "Policy rejected", "policy": policy.serialize()}), 200


# Get all policies 
@policy_bp.route("/policies", methods=["GET"])
def get_policies():
    policies = Policy.query.all()
    return jsonify([p.serialize() for p in policies]), 200


#  Get single policy 
@policy_bp.route("/policies/<int:policy_id>", methods=["GET"])
def get_policy(policy_id):
    policy = Policy.query.get(policy_id)
    if not policy:
        return jsonify({"error": "Policy not found"}), 404
    return jsonify(policy.serialize()), 200


# Get policies by user 
@policy_bp.route("/policies/user/<int:user_id>", methods=["GET"])
def get_policies_by_user(user_id):
    policies = Policy.query.filter_by(user_id=user_id).all()
    return jsonify([p.serialize() for p in policies]), 200


#  Get policies by status 
@policy_bp.route("/policies/status/<string:status>", methods=["GET"])
def get_policies_by_status(status):
    policies = Policy.query.filter_by(status=status).all()
    return jsonify([p.serialize() for p in policies]), 200