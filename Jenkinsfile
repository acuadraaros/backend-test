pipeline {
    agent any
    stages {
        stage("instalacion dependencias") {
            agent {
                docker {
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            stages {
                stage('Instalar dependencias') {
                    steps {
                        sh "npm install"
                    }            
                }  
                stage('Build') {
                    steps {
                        sh "npm run build"
                    }            
                }  
            }            
        }
        stage("Quality Assurance - Scanner") {
            agent {
                docker {
                    image 'sonarsource/sonar-scanner-cli'
                    args '--network=devops-infra_default'
                    reuseNode true
                }
            }
            stages {
                stage('Quality Assurance - Sonarqube') {
                    steps{
                        withSonarQubeEnv('sonarqube') {
                            sh 'sonar-scanner'
                        }
                    }
                }
            }
        }        
        stage("Quality Assurance - Quality Gate") {
            agent {
                docker {
                    image 'sonarsource/sonar-scanner-cli'
                    args '--network=devops-infra_default'
                    reuseNode true
                }
            }
            stages {
                stage('Quality Assurance - Sonarqube') {
                    steps{
                        script {
                            timeout(time: 1, unit: 'MINUTES'){
                                def qg = waitForQualityGate()
                                if (qg.status != 'OK'){
                                    error 'Pipeline aborted due quality gate'
                                }
                            }
                        }
                    }
                }
            }
        }
        stage("delivery - subida a nexus") {
            steps {
                script {
                    docker.withRegistry("http://localhost:8082", "registry") {
                        // Construir la imagen Docker
                        sh 'docker build -t backend-test .'
                        
                        // Etiquetar la imagen con "latest"
                        sh 'docker tag backend-test:latest localhost:8082/backend-test:latest'
                        sh 'docker push localhost:8082/backend-test:latest'
                        
                        // Etiquetar la imagen con el número de build
                        sh "docker tag backend-test:latest localhost:8082/backend-test:${env.BUILD_NUMBER}"
                        
                        // Push de la imagen con la etiqueta de número de build
                        sh "docker push localhost:8082/backend-test:${env.BUILD_NUMBER}"
                    }
                }
            }
        }
    }
}