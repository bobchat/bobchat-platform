build:
	docker build -t bobchat/user:latest .

start:
	docker run --rm -it \
	-e NATS_URL="nats://ruser:T0pS3cr3t@gnatsd:4222" \
	-v $(pwd):/service bobchat/user:latest


run: build start