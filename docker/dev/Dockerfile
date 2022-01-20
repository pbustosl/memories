# docker build -t memories-dev .
# GIT_DIR=/Users/pablo/git
# docker run --name memories-dev -d -p 3000:3000 \
#   --mount type=bind,source=$GIT_DIR/memories/app,target=/app/memories \
#   memories-dev
# docker exec -it memories-dev bash
# docker stop memories-dev; docker rm memories-dev

# from raspberry pi /etc/debian_version
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

#####################################
# ng new memories
#   ? Would you like to add Angular routing? No
#   ? Which stylesheet format would you like to use? CSS
# cd memories/
# ng serve --port 3000 --host 0.0.0.0
# ng add @angular/material
#   ? Choose a prebuilt theme: Indigo/Pink
#   ? Set up global Angular Material typography styles? Yes
#   ? Set up browser animations for Angular Material? Yes
# ng generate component grid
# ng generate service memories
# TODO:
# - build and run in a brand new debian: https://angular.io/start/start-deployment
#####################################

#WORKDIR /app

# https://angular.io/start/start-deployment

#CMD ["node", "src/index.js"]
ENTRYPOINT ["tail", "-f", "/dev/null"]
