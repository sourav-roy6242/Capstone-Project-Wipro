from flask import Blueprint, request, jsonify
from models import Claim
from database import db

claim_bp = Blueprint('claim_bp', __name__)

# User submits a claim
@claim_bp.route('/submit', methods=['POST'])
def submit_claim():
    data = request.get_json()
    new_claim = Claim(
        user_name=data['user_name'],
        policy_id=data['policy_id'],
        policy_type=data['policy_type'],
        description=data['description'],
        amount=data['amount'],
        status="Pending"  # ensure default status
    )
    db.session.add(new_claim)
    db.session.commit()
    return jsonify({"message": "Claim submitted successfully!", "claim_id": new_claim.id})


# Agent approves a claim
@claim_bp.route('/agent/approve/<int:claim_id>', methods=['PUT'])
def agent_approve(claim_id):
    claim = Claim.query.get_or_404(claim_id)
    print(f"Agent approving claim {claim.id}, current status: {claim.status}")
    if claim.status == "Approved by Agent":
        return jsonify({"message": f"Claim {claim_id} is already approved by agent."})
    if claim.status != "Pending":
        return jsonify({"message": f"Claim cannot be approved by agent. Current status: {claim.status}"}), 400
    claim.status = "Approved by Agent"
    db.session.commit()
    return jsonify({"message": f"Claim {claim_id} approved by agent."})


# Admin approves a claim
@claim_bp.route('/admin/approve/<int:claim_id>', methods=['PUT'])
def admin_approve(claim_id):
    claim = Claim.query.get_or_404(claim_id)
    print(f"Admin approving claim {claim.id}, current status: {claim.status}")
    if claim.status != "Approved by Agent":
        return jsonify({"message": "Claim must be approved by agent first."}), 400
    claim.status = "Approved"
    db.session.commit()
    return jsonify({"message": f"Claim {claim_id} approved by admin."})


# Get all claims
@claim_bp.route('/list', methods=['GET'])
def list_claims():
    claims = Claim.query.all()
    result = []
    for c in claims:
        result.append({
            "id": c.id,
            "user_name": c.user_name,
            "policy_id": c.policy_id,
            "policy_type": c.policy_type,
            "description": c.description,
            "amount": c.amount,
            "date_created": c.date_created,
            "status": c.status
        })
    return jsonify(result)
