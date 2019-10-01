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
                    sh "skaffold deploy --namespace ${stagingNamespace} --images ${SKAFFOLD_DEFAULT_REPO}/ignitelab-csuc-slackbot-lab3:${VERSION}"
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
    sh(script: "git fetch --all --tags && git describe --tags --dirty")
    return sh(script: "git fetch --all --tags && git describe --tags --dirty", returnStdout: true).trim()
}
