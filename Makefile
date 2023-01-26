BACKEND_CONTAINER := "wishlify-backend"

up:
	docker-compose up --build

down:
	docker-compose down

dev:
	docker-compose up --build db backend

clean:
	docker rmi $(BACKEND_CONTAINER)

