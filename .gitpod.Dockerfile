FROM gitpod/workspace-full:latest

RUN bash -c ". .nvm/nvm.sh \
    && nvm install v16.18.0 \
    && nvm use v16.18.0 \
    && nvm alias default v16.18.0"

RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix