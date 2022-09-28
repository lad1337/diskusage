FROM python:3.9-alpine as builder
MAINTAINER Dennis Lutter

RUN apk --update add --no-cache git build-base libffi-dev openssl-dev

ARG whl=/tmp/wheelhouse
WORKDIR /tmp
COPY . .
RUN pip wheel --wheel-dir=${whl} .

FROM python:3.9-alpine
ARG whl=/tmp/wheelhouse

COPY --from=builder ${whl} ${whl}
RUN pip install --find-links ${whl} ${whl}/diskusage-*.whl
RUN rm -r ${whl}

# this is for click
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8
ENTRYPOINT ["diskusage-server"]
CMD ["--port", "4040", "--unit", "GIGABYTE"]
