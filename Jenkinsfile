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
                    
                    
                    sh 'kubectl config current-context || true'
                    
                    
                    sh 'kubectl cluster-info'
                    
                 
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

