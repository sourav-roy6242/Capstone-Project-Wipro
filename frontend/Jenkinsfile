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

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t ${PROJECT_NAME}-frontend .'
                }
            }
        }

        stage('Build Backend Images') {
            steps {
                dir('backend/auth-service') {
                    sh 'docker build -t ${PROJECT_NAME}-auth-service .'
                }
                dir('backend/policy-service') {
                    sh 'docker build -t ${PROJECT_NAME}-policy-service .'
                }
                dir('backend/claim-service') {
                    sh 'docker build -t ${PROJECT_NAME}-claim-service .'
                }
            }
        }

        stage('Build Gateway Image') {
            steps {
                dir('gateway') {
                    sh 'docker build -t ${PROJECT_NAME}-gateway .'
                }
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker-compose up -d --build'
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

