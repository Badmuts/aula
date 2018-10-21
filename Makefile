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

provision-teardown:
	@cd operations/provision/terraform; terraform destroy; cd -

# Deploy
deploy:
	@echo "[i] Not implemented yet"
