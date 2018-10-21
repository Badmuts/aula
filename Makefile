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

# Provision dev, staging, qa and prod env
provision:
	@./scripts/provision

# Deploy
deploy:
	@echo "[i] Not implemented yet"
