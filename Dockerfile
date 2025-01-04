FROM ubuntu:latest
LABEL authors="andas"

ENTRYPOINT ["top", "-b"]