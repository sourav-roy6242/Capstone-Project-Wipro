from flask import Blueprint, request, jsonify
import requests

auth_bp = Blueprint('auth', __name__)

AUTH_SERVICE_URL = 'http://localhost:5001'

@auth_bp.route('/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy_auth(path):
    url = f"{AUTH_SERVICE_URL}/{path}"
    method = request.method
    headers = {key: value for key, value in request.headers if key != 'Host'}

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

    return jsonify(resp.json()), resp.status_code
