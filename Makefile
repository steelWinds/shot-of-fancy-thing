IMAGE_NAME                ?= shot-of-fancy-thing
VERSION                   ?= 1.0.0
HOST_PORT                 ?= 3000
CONTAINER_PORT            ?= 3000

# App vars
NODE_ENV                  ?= production
NUXT_PUBLIC_I18N_BASE_URL ?= https://sft.com
NUXT_APP_CDN_URL          ?= /
NUXT_SITE_ENV             ?= production
NUXT_SITE_URL             ?= https://sft.com
NUXT_SITE_NAME            ?= SFT
NUXT_OG_IMAGE_SECRET            ?= secret

# Full name of image
IMAGE = $(IMAGE_NAME):$(VERSION)

# Load .env file
ifneq (,$(wildcard .env))
    include .env
    export
endif

.PHONY: help build run stop clean

help:
	@echo "Commands:"
	@echo "---------------------------------------"
	@echo "  build   - Build Docker Image"
	@echo "  run     - Run container (stops old one if exists, builds if missing)"
	@echo "  stop    - Stop and remove container"
	@echo "  clean   - Remove built image"
	@echo "---------------------------------------"

build:
	@echo "Building Docker Image $(IMAGE)..."
	docker build \
		--build-arg NODE_ENV=$(NODE_ENV) \
		--build-arg NUXT_PUBLIC_I18N_BASE_URL=$(NUXT_PUBLIC_I18N_BASE_URL) \
		--build-arg NUXT_APP_CDN_URL=$(NUXT_APP_CDN_URL) \
		--build-arg NUXT_SITE_ENV=$(NUXT_SITE_ENV) \
		--build-arg NUXT_SITE_URL=$(NUXT_SITE_URL) \
		--build-arg NUXT_SITE_NAME=$(NUXT_SITE_NAME) \
		--build-arg NUXT_OG_IMAGE_SECRET=$(NUXT_OG_IMAGE_SECRET) \
		-t $(IMAGE) .
	@echo "Image built: $(IMAGE)"

run: build
	@echo "Stopping old container if exists..."
	-docker stop $(IMAGE_NAME)
	-docker rm $(IMAGE_NAME)
	@echo "Starting new container from $(IMAGE) on port $(HOST_PORT):$(CONTAINER_PORT)..."
	docker run --env-file .env -d \
		-p $(HOST_PORT):$(CONTAINER_PORT) \
		--name $(IMAGE_NAME) \
		-e NODE_ENV=$(NODE_ENV) \
		-e NITRO_PORT=$(CONTAINER_PORT) \
		-e NITRO_HOST=0.0.0.0 \
		$(IMAGE)
	@echo "Container '$(IMAGE_NAME)' is running, mapped port $(HOST_PORT) -> $(CONTAINER_PORT)"

stop:
	@echo "Stopping container $(IMAGE_NAME)..."
	-docker stop $(IMAGE_NAME)
	-docker rm $(IMAGE_NAME)
	@echo "Container stopped and removed"

clean:
	@echo "Removing image $(IMAGE)..."
	-docker rmi $(IMAGE)
	@echo "Image removed"
