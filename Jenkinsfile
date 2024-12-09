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
                stage('Pruebas') {
                    steps {
                        sh "npm run test"
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
    }
}