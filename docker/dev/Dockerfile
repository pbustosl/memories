from debian:10.11

RUN apt-get update && apt-get install -y \
  curl \
  git \
  procps \
  vim

# https://github.com/nodesource/distributions/blob/master/README.md
RUN curl -fsSL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs

RUN rm -rf /var/lib/apt/lists/*

RUN npm install -g @angular/cli

ENTRYPOINT ["tail", "-f", "/dev/null"]
