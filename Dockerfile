FROM ubuntu:19.10

RUN apt-get update && apt-get install -y \
curl \
wget \
vim \
git \
unzip \
openjdk-8-jdk

EXPOSE 8000
EXPOSE 9000
EXPOSE 5000
EXPOSE 8888
VOLUME ["/home/wkalucki/projekt"]


ARG SBT_VERSION=1.3.8
ARG SCALA_VERSION=2.12.8

RUN wget https://downloads.lightbend.com/scala/$SCALA_VERSION/scala-$SCALA_VERSION.deb && \
        dpkg -i scala-$SCALA_VERSION.deb && \
        rm scala-$SCALA_VERSION.deb

RUN \
  curl -L -o sbt-$SBT_VERSION.deb https://dl.bintray.com/sbt/debian/sbt-$SBT_VERSION.deb && \
  dpkg -i sbt-$SBT_VERSION.deb && \
  rm sbt-$SBT_VERSION.deb && \
  apt-get update && \
  apt-get install sbt && \
  sbt sbtVersion

ARG NPM_VERSION=6.8.0
ARG NODE_VERSION=11.15.0

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
RUN /bin/bash -c "source ~/.nvm/nvm.sh && \
	nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION && \
	npm i -g npm@$NPM_VERSION"

SHELL ["/bin/bash", "-c"]

ENV NODE_PATH ~/.nvm/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH      ~/.nvm/versions/node/v$NODE_VERSION/bin:$PATH

WORKDIR /home/wkalucki/projekt