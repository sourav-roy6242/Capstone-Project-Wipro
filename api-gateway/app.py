# from flask import Flask
# from flask_cors import CORS

# # Import routes from package
# from routes.claim_routes import claim_bp
# from routes.policy_routes import policy_bp
# from routes.auth_routes import auth_bp

# app = Flask(__name__)
# CORS(app)

# # Register blueprints
# app.register_blueprint(auth_bp, url_prefix='/api/auth')
# app.register_blueprint(claim_bp, url_prefix='/api/claims')
# app.register_blueprint(policy_bp, url_prefix='/api/policies')

# @app.route('/')
# def index():
#     return 'API Gateway running!'

# if __name__ == '__main__':
#     app.run(port=3000, debug=True)





from flask import Flask
from flask_cors import CORS

# Import routes from package
from routes.claim_routes import claim_bp
from routes.policy_routes import policy_bp
from routes.auth_routes import auth_bp

app = Flask(__name__)
CORS(app, origins=["http://localhost:4200"])  # Allow your Angular frontend

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(claim_bp, url_prefix='/api/claims')
app.register_blueprint(policy_bp, url_prefix='/api/policies')

@app.route('/')
def index():
    return 'API Gateway running on port 3000!'

if __name__ == '__main__':
    # Bind to all interfaces if you want to access from other devices
    app.run(host='0.0.0.0', port=3000, debug=True)
