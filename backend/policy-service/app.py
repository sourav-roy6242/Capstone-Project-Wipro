from flask import Flask
from flask_cors import CORS
from database import db

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Database config
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///policies.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Initialize db with app
    db.init_app(app)

    # Import and register blueprints
    from routes.policy_routes import policy_bp
    app.register_blueprint(policy_bp, url_prefix="/api")

    # Create tables
    with app.app_context():
        db.create_all()

    return app


if __name__ == "__main__":
    app = create_app()
    # Run on all network interfaces for Docker container
    app.run(host="0.0.0.0", port=5002, debug=True)