
pipeline {
    agent any

    environment {
        PROJECT_NAME = "Insurance-Management"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sourav-roy6242/Capstone-Project-Wipro.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo "Building Docker images for frontend, gateway, and microservices..."
                // Use docker-compose with updated paths
                sh 'docker-compose build'
            }
        }

        stage('Run Containers with Docker Compose') {
            steps {
                echo "Starting containers locally..."
                sh 'docker-compose up -d'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    echo "Deploying to Kubernetes..."

                    // Optional: check current context
                    sh 'kubectl config current-context || true'

                    // Get cluster info
                    sh 'kubectl cluster-info'

                    // Apply all Kubernetes manifests
                    sh 'kubectl apply -f k8s/'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up dangling Docker images...'
            sh 'docker system prune -f'
        }
    }
}

