# Name of the image
IMAGE	= badmuts/serverless-course
# Current branch-commit (example: master-ab01c1z)
CURRENT	= $$(git rev-parse --abbrev-ref HEAD | sed 's/\//-/g')-$$(git rev-parse HEAD | cut -c1-7)
TAG		= $(CURRENT)

prepare:
	@cp .env.example .env
	@docker-compose build

build:
	@docker-compose -f docker-compose.yml build

# Public commands
release: build-release push-release

# Build release image
build-release:
	@echo "building release..."
	@echo "[i] tag: $(TAG)"
	@TAG=$(TAG) docker-compose -f docker-compose.yml build

# Push release image
push-release:
	@echo "pushing release..."
	@echo "[i] tag: $(TAG)"
    @TAG=$(TAG) docker-compose -f docker-compose.yml push
