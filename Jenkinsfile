library 'LEAD'

pipeline {
    agent any
    environment {
      VERSION = version()
    }
    stages {
        stage('Skaffold Build') {
            agent {
                label "lead-toolchain-skaffold"
            }
            steps {
                notifyPipelineStart()
                notifyStageStart()
                container('skaffold') {
                    sh "skaffold build"
                }
            }
            post {
                success {
                    notifyStageEnd()
                }
                failure {
                    notifyStageEnd([result: "fail"])
                }
            }
        }
        stage('Skaffold Deploy') {
            agent {
                label "lead-toolchain-skaffold"
            }
            steps {
                notifyStageStart()
                container('skaffold') {
                    sh "skaffold deploy"
                }
            }
            post {
                success {
                    notifyStageEnd([status: "Published new chart: ${VERSION}"])
                }
                failure {
                    notifyStageEnd([result: "fail"])
                }
            }
        }
    }
}
def version() {
    return sh(script: "git describe --tags --dirty", returnStdout: true).trim();
}
