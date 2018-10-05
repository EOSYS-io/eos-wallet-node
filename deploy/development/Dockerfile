FROM eosys/eos-dev:v1.2.4

# Install nodejs
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN apt-get install -y nodejs

# Set up supervisor
RUN apt-get install -y supervisor
COPY deploy/development/supervisord.conf /etc/supervisord.conf

ENV NODE_ENV development
ENV APP_DIR /app
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR
COPY . $APP_DIR

RUN npm install

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]