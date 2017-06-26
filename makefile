image: wheel
	docker build --tag diskusage:latest .

wheel: builder
	docker run -it -v `pwd`:/src diskusagebuilder /bin/sh -c 'cd /src; pip wheel --wheel-dir=/src/wheelhouse .'

builder:
	docker build --tag diskusagebuilder --file DockerfileBuilder .
