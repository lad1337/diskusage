image: wheels
	docker build --tag diskusage:latest .

wheels: builder
	docker run -it -v `pwd`:/src diskusagebuilder pip wheel --wheel-dir=/src/wheelhouse .
	rm wheelhouse/diskusage-0.0.0-py3-none-any.whl
	mv wheelhouse/diskusage-* wheelhouse/diskusage-0.0.0-py3-none-any.whl

builder:
	docker build --tag diskusagebuilder --file BuilderDockerfile .
