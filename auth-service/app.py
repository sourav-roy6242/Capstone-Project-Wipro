# from flask import Flask
# from flask_cors import CORS  # import CORS
# from models import db
# from routes.auth_routes import auth_bp

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///auth.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db.init_app(app)

# # ✅ Enable CORS for all routes
# CORS(app)

# # Register blueprint
# app.register_blueprint(auth_bp, url_prefix='/auth')

# # Default admin creation (optional)
# from models import User
# with app.app_context():
#     if not User.query.filter_by(username='admin').first():
#         admin = User(username='admin', role='admin')
#         admin.set_password('admin123')
#         db.session.add(admin)
#         db.session.commit()
#         print("✅ Default admin created: username=admin, password=admin123")

# if __name__ == "__main__":
#     app.run(port=5001, debug=True)



# auth-service/app.py
from flask import Flask
from flask_cors import CORS
from database import db
from routes.auth_routes import auth_bp
from models import User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///auth.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
CORS(app, origins=["http://localhost:4200"])  # Angular frontend

# Register blueprint
app.register_blueprint(auth_bp, url_prefix="/auth")

# ✅ Create tables and default admin
with app.app_context():
    db.create_all()
    if not User.query.filter_by(username="admin").first():
        admin = User(username="admin", role="admin")
        admin.set_password("admin123")
        db.session.add(admin)
        db.session.commit()
        print("✅ Default admin created (username=admin, password=admin123)")

if __name__ == "__main__":
    app.run(port=5001, debug=True)
