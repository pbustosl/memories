# docker build -t memories-dev .
# docker run --name memories-dev -dp 3000:3000 memories-dev
# docker exec -it memories-dev bash
# docker stop memories-dev; docker rm memories-dev

# from raspberry pi /etc/debian_version
from debian:10.11

RUN apt-get update && apt-get install -y \
  curl \
  vim

# https://github.com/nodesource/distributions/blob/master/README.md
RUN curl -fsSL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs

RUN rm -rf /var/lib/apt/lists/*

#####################################
# npm install -g @angular/cli
# ng new photos
#   ? Would you like to add Angular routing? No
#   ? Which stylesheet format would you like to use? CSS
# cd photos/
# ng serve --port 3000 --host 0.0.0.0
# TODO:
# - share dir with mac to start building and push to github
# - build and run in a brand new debian: https://angular.io/start/start-deployment
#####################################


#COPY app/ /app/
#WORKDIR /app

# https://angular.io/start/start-deployment

#CMD ["node", "src/index.js"]
ENTRYPOINT ["tail", "-f", "/dev/null"]
