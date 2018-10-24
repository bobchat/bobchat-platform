build:
	docker build -t bobchat/user:latest .

start:
	docker run --rm -it \
	-v $(pwd):/service bobchat/user:latest


run: build start