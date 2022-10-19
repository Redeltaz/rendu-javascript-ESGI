compose = docker compose

up:
	$(compose) kill
	$(compose) build
	$(compose) up -d

stop:
	$(compose) kill

ssh:
	$(compose) exec app sh