pipeline {
    agent any

    stages {
        stage('SCM') {
            steps {
                git branch: 'main', changelog: false, poll: false, url: 'https://github.com/dulajsaranga/booking-management-frontend.git'
            }
        }
        stage('Docker build and push') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'dockerhub_id') {
                        bat "docker build -t dulajsaranga/booking-management-frontend:1.0 ."
                        bat "docker push dulajsaranga/booking-management-frontend:1.0"
                    }
                }
            }
        }
    }
}