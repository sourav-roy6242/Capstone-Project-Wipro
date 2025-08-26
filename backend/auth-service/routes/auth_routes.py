# from flask import Blueprint, request, jsonify
# from models import db, User

# auth_bp = Blueprint("auth", __name__)

# # ✅ Register (User or Agent only)
# @auth_bp.route("/register", methods=["POST"])
# def register():
#     data = request.get_json()
#     username = data.get("username")
#     password = data.get("password")
#     role = data.get("role")   # "user" or "agent"

#     if not username or not password or role not in ["user", "agent"]:
#         return jsonify({"message": "Invalid input"}), 400

#     if User.query.filter_by(username=username).first():
#         return jsonify({"message": "Username already exists"}), 400

#     new_user = User(username=username, role=role)
#     new_user.set_password(password)
#     db.session.add(new_user)
#     db.session.commit()

#     return jsonify({"message": f"{role.capitalize()} registered successfully!"}), 201


# # ✅ Login (User / Agent / Admin)
# @auth_bp.route("/login", methods=["POST"])
# def login():
#     data = request.get_json()
#     username = data.get("username")
#     password = data.get("password")

#     if not username or not password:
#         return jsonify({"message": "Username and password required"}), 400

#     user = User.query.filter_by(username=username).first()
#     if not user or not user.check_password(password):
#         return jsonify({"message": "Invalid username or password"}), 401

#     return jsonify({
#         "message": "Login successful",
#         "role": user.role,
#         "redirect": (
#             "/user-page" if user.role == "user" else
#             "/agent-page" if user.role == "agent" else
#             "/admin-dashboard"
#         )
#     }), 200


# # ✅ Show all users (for testing / debugging)
# @auth_bp.route("/users", methods=["GET"])
# def get_users():
#     users = User.query.all()
#     result = [
#         {"id": u.id, "username": u.username, "role": u.role}
#         for u in users
#     ]
#     return jsonify(result), 200



# auth-service/routes/auth_routes.py
from flask import Blueprint, request, jsonify
from models import db, User

auth_bp = Blueprint("auth", __name__)

# ✅ Register (User or Agent)
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    role = data.get("role")   # "user" or "agent"

    if not username or not password or role not in ["user", "agent"]:
        return jsonify({"message": "Invalid input"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists"}), 400

    new_user = User(username=username, role=role)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": f"{role.capitalize()} registered successfully!"}), 201


# ✅ Login (User / Agent / Admin)
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Username and password required"}), 400

    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({"message": "Invalid username or password"}), 401

    return jsonify({
        "message": "Login successful",
        "user_id": user.id,
        "username": user.username,
        "role": user.role,
        "redirect": (
            "/user-page" if user.role == "user" else
            "/agent-page" if user.role == "agent" else
            "/admin-dashboard"
        )
    }), 200


# ✅ Show all users (for testing/debugging)
@auth_bp.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    result = [
        {"id": u.id, "username": u.username, "role": u.role}
        for u in users
    ]
    return jsonify(result), 200
