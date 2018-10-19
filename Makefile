# Current branch-commit (example: master-ab01c1z)
CURRENT	= $$(git rev-parse --abbrev-ref HEAD | sed 's/\//-/g')-$$(git rev-parse HEAD | cut -c1-7)
TAG		= $(CURRENT)

# Setup a development environment
configure:
	@./scripts/create-env

# Build release images
build:
	@TAG=$(TAG) docker-compose -f docker-compose.yml build

# Push release images
push:
	@TAG=$(TAG) docker-compose -f docker-compose.yml push

release: build push

deploy:
	@echo "[i] Not implemented yet"
