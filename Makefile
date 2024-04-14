run:
	docker run -p 80:3000 -d --rm --name tseh85-app tseh85-app:dev

dev:
	docker run -d -p 80:3000  -v "/Users/mac/WebstormProjects/tseh85-delivery-app/:/tseh85-app" -v /tseh85-app/node_modules --rm --name tseh85-app tseh85-app:dev

stop:
	docker stop tseh85-app
