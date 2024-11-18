.PHONY: up
up:
	docker-compose up -d

.PHONY: down
down:
	docker-compose down

.PHONY: rebuild
rebuild:
	docker-compose up --build -d

.PHONY: logs
logs:
	docker-compose logs -f

.PHONY: stop
stop:
	docker-compose stop

.PHONY: restart
restart:
	docker-compose restart
