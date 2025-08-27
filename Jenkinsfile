
pipeline {
    agent any

    environment {
        PROJECT_NAME = "insurence-management"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sourav-roy6242/Insurence-management-system.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Run Containers with Docker Compose') {
            steps {
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
            echo 'Cleaning up dangling images...'
            sh 'docker system prune -f'
        }
    }
}
