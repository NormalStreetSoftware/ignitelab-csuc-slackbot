library 'LEAD'

pipeline {
    agent any
    environment {
      VERSION = version()
      START = notifyPipelineStart()
    }
    stages {
        stage('Skaffold Build') {
            agent {
                label "lead-toolchain-skaffold"
            }
            steps {
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
            when {
                branch 'master'
            }
            environment {
                TILLER_NAMESPACE = "${stagingNamespace}"
            }
            steps {
                notifyStageStart()
                container('skaffold') {
                    sh "skaffold deploy --profile staging --namespace ${stagingNamespace} --images ${SKAFFOLD_DEFAULT_REPO}/ignitelab-csuc-slackbot-lab3:${VERSION}"
                }
            }
            post {
                success {
                    notifyStageEnd([status: "Published new chart: ${VERSION}"])
                }
                failure {
                    notifyStageEnd([result: "fail"])
                }
                aborted {
                    notifyStageEnd([result: "skipped"])
                }
            }
        }
    }
}
def version() {
    sh(script: "git fetch --all --tags")
    return sh(script: "git describe --tags --dirty", returnStdout: true).trim()
}
