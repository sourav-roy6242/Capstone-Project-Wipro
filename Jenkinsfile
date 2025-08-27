// pipeline {
//     agent any

//     environment {
//         PROJECT_NAME = "insurence-management"
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/sourav-roy6242/Insurence-management-system.git'
//             }
//         }

//         stage('Build Images') {
//             steps {
//                 sh 'docker-compose build'
//             }
//         }

//         stage('Run Containers') {
//             steps {
//                 sh 'docker-compose up -d'
//             }
//         }
//     }

//     post {
//         always {
//             echo 'Cleaning up dangling images...'
//             sh 'docker system prune -f'
//         }
//     }
// }



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

        stage('Run Containers (Optional for local)') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    echo "Deploying to Kubernetes..."
                    
                    // Check if kubeconfig is working
                    sh 'kubectl config current-context || true'
                    
                    // Show cluster info
                    sh 'kubectl cluster-info'
                    
                    // Apply all manifests (assuming they are in k8s/ folder)
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
