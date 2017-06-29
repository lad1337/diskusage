FROM python:3.5-alpine
MAINTAINER Dennis Lutter

ADD wheelhouse /wheelhouse

EXPOSE 4040

RUN ["/bin/sh", "-c", "pip install --find-links /wheelhouse /wheelhouse/diskusage-*.whl"]
RUN ["rm", "-r", "/wheelhouse"]

ENTRYPOINT ["diskusage-server"]
CMD ["--port", "4040", "--unit", "GIGABYTE"]
