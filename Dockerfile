FROM python:3.5-alpine
MAINTAINER Dennis Lutter

ADD dist/diskusage* /tmp/diskusage-0.1.0-py3-none-any.whl
ADD wheelhouse /wheelhouse

EXPOSE 4040

RUN ["pip", "install", "--find-links", "/wheelhouse", "/tmp/diskusage-0.1.0-py3-none-any.whl"]
ENTRYPOINT ["diskusage-server"]
CMD ["--port", "4040", "--unit", "GIGABYTE"]
