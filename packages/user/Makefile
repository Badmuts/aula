# Name of the image
IMAGE	= badmuts/serverless-user
# Current branch-commit (example: master-ab01c1z)
CURRENT	= $$(git rev-parse --abbrev-ref HEAD | sed 's/\//-/g')-$$(git rev-parse HEAD | cut -c1-7)
TAG		= $(CURRENT)

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

create-es-keypair:
	@openssl ecparam -genkey -name prime256v1 -noout -out ec_private.pem
	@openssl ec -in ec_private.pem -pubout -out ec_public.pem
	base64 ec_private.pem
	base64 ec_public.pem
	rm ec_private.pem ec_public.pem