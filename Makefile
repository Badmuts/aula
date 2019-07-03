.PHONY: release
# Current branch-commit (example: master-ab01c1z)
CURRENT	= $$(git rev-parse --abbrev-ref HEAD | sed 's/\//-/g')-$$(git rev-parse HEAD | cut -c1-7)
TAG		= $(CURRENT)
COMPOSE_RELEASE	= docker-compose -f docker-compose.yml

# Setup a development environment
configure:
	@./scripts/create-env

# Build release images
build:
	@./scripts/build

# Push release images
push:
	@./scripts/push

release: build push

# Build release image
build-ci:
	@echo "building release..."
	@echo "[i] tag: $(TAG)"
	@TAG=$(TAG) $(COMPOSE_RELEASE) build

# Push release image
push-ci:
	@echo "pushing release..."
	@echo "[i] tag: $(TAG)"
	@TAG=$(TAG) $(COMPOSE_RELEASE) push

release-ci: build-ci push-ci

# Provision dev, staging, qa and prod env
provision:
	@./scripts/provision

provision-teardown:
	@cd operations/provision/terraform; terraform destroy; cd -

# Deploy
deploy:
	@echo "[i] Not implemented yet"
