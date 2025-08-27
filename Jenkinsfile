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
        KUBECONFIG = "/home/jenkins/.kube/config"   // adjust path to your Jenkins user's kubeconfig
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sourav-roy6242/Insurence-management-system.git'
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Run Containers (Local Compose)') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Deploy to Minikube') {
            steps {
                script {
                    echo "Deploying to Kubernetes..."
                    
                    sh '''
                        kubectl config use-context minikube
                        kubectl apply -f k8s/
                    '''
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
