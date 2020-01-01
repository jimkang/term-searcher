include config.mk

HOMEDIR = $(shell pwd)
BROWSERIFY = ./node_modules/.bin/browserify
UGLIFY = ./node_modules/uglify-es/bin/uglifyjs

deploy:
	npm version patch && make build && git commit -a -m"Build." && make pushall

pushall: sync
	git push origin master

run:
	wzrd app.js:index.js -- \
		-d

# Some apps needs to run at port 80 because some auth APIs will only redirect
# back to port 80/443.
run-on-80:
	sudo wzrd app.js:index.js --port 80 -- -d

build:
	$(BROWSERIFY) app.js | $(UGLIFY) -c -m -o index.js

prettier:
	prettier --single-quote --write "**/*.js"

sync:
	scp index.html $(USER)@$(SERVER):$(APPDIR)
	scp index.js $(USER)@$(SERVER):$(APPDIR)
	scp app.css $(USER)@$(SERVER):$(APPDIR)
