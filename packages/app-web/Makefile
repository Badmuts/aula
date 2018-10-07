# Name of the image
IMAGE	= badmuts/serverless-app-web
# Current branch-commit (example: master-ab01c1z)
CURRENT	= $$(git rev-parse --abbrev-ref HEAD | sed 's/\//-/g')-$$(git rev-parse HEAD | cut -c1-7)
TAG		= $(CURRENT)

# Public commands
release: build-release push-release

# Build release image
build-release:
	@echo "building release..."
	@echo "[i] tag: $(TAG)"
	@docker build -t $(IMAGE):$(TAG) -f ./Dockerfile ../../

# Push release image
push-release:
	@echo "pushing release..."
	@echo "[i] tag: $(TAG)"
	@docker push $(IMAGE):$(TAG)
