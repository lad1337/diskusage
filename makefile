image: wheels
	docker build --tag lad1337/diskusage:latest .

wheels: builder
	rm -f wheelhouse/diskusage-*.whl
	docker run -it -v `pwd`:/src diskusagebuilder pip wheel --wheel-dir=/src/wheelhouse .

builder:
	docker build --tag diskusagebuilder --file BuilderDockerfile .
