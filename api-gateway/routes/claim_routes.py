from flask import Blueprint, request, jsonify
import requests

claim_bp = Blueprint('claim_bp', __name__)

CLAIM_SERVICE_URL = "http://localhost:5000"

@claim_bp.route('/', methods=['GET'])
def get_claims():
    response = requests.get(f"{CLAIM_SERVICE_URL}/claims")
    return jsonify(response.json())

@claim_bp.route('/', methods=['POST'])
def create_claim():
    data = request.json
    response = requests.post(f"{CLAIM_SERVICE_URL}/claims", json=data)
    return jsonify(response.json()), response.status_code
