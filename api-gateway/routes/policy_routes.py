from flask import Blueprint, request, jsonify
import requests

policy_bp = Blueprint('policies', __name__)

POLICY_SERVICE_URL = 'http://localhost:5002'

@policy_bp.route('/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy_policy(path):
    url = f"{POLICY_SERVICE_URL}/{path}"
    method = request.method
    headers = {key: value for key, value in request.headers if key != 'Host'}

    try:
        if method == 'GET':
            resp = requests.get(url, headers=headers, params=request.args)
        elif method == 'POST':
            resp = requests.post(url, headers=headers, json=request.get_json())
        elif method == 'PUT':
            resp = requests.put(url, headers=headers, json=request.get_json())
        elif method == 'DELETE':
            resp = requests.delete(url, headers=headers)
        else:
            return jsonify({"error": "Method not allowed"}), 405

        # Forward response from policy service
        return jsonify(resp.json()), resp.status_code

    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500
