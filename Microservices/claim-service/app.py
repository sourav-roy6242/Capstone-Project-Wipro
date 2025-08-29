# # This service handles all insurance claims-related operations such as submitting, viewing, approving, or rejecting claims.

# # It acts as a microservice in Insurance Management System.

# from flask import Flask
# from flask_cors import CORS
# from database import db
# from routes.claim_routes import claim_bp

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///claims.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db.init_app(app)
# CORS(app, origins=["http://localhost:4200"])  # allow Angular frontend

# # Register blueprint
# app.register_blueprint(claim_bp, url_prefix='/claims')

# if __name__ == "__main__":
#     with app.app_context():
#         db.create_all()  # create tables if not exist
#     # Run on all network interfaces so Docker container is reachable
#     app.run(host="0.0.0.0", port=5000, debug=True)






# claim_service/app.py

from flask import Flask
from flask_cors import CORS
from database import db
from routes.claim_routes import claim_bp
import os

app = Flask(__name__)

# Use test database if specified
db_path = os.environ.get("DATABASE_URL", "sqlite:///claims.db")
app.config['SQLALCHEMY_DATABASE_URI'] = db_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
CORS(app, origins=["http://localhost:4200"])  # allow Angular frontend

# Register blueprint
app.register_blueprint(claim_bp, url_prefix='/claims')

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # create tables if not exist
    app.run(host="0.0.0.0", port=5000, debug=True)
