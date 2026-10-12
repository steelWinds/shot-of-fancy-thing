IMAGE := shotoffancything-playwright
TEST := npm run preview -- --background && exec npm run test:e2e

RUN := docker run --rm --init --ipc=host \
	--env-file "$(CURDIR)/.env" \
	-v "$(CURDIR)/__tests__/playwright:/app/__tests__/playwright" \
	-v "$(CURDIR)/test-results:/app/test-results" \
	-v "$(CURDIR)/playwright-report:/app/playwright-report"

.PHONY: test test-update-snapshots test-ui build

test: build
	$(RUN) $(IMAGE) sh -c '$(TEST)'

test-update-snapshots: build
	$(RUN) $(IMAGE) sh -c '$(TEST) -- --update-snapshots'

test-ui: build
	$(RUN) -p 127.0.0.1:8080:8080 $(IMAGE) sh -c '$(TEST) -- --ui --ui-host=0.0.0.0 --ui-port=8080'

build:
	mkdir -p test-results playwright-report
	docker build \
		--build-arg UID="$(shell id -u)" \
		--build-arg GID="$(shell id -g)" \
		-f docker/playwright.Dockerfile \
		-t $(IMAGE) .
