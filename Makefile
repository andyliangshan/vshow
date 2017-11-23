TESTS = test/**/*.js
REPORTER = spec
TIMEOUT = 20000
MOCHA_OPTS =
ISTANBUL = ./node_modules/.bin/istanbul
MOCHA = ./node_modules/.bin/_mocha
WEBPACK= ./node_modules/.bin/webpack

clean:
	@rm -rf build coverage node_modules

install-test:
	@NODE_ENV=test npm install

test:
	@$(MOCHA) test/**/*.js -w --compilers js:babel/register

test-cov:
	@$(ISTANBUL) cover -x *.test.js _mocha -- -R spec test/**/*.js --compilers js:babel/register

prebuild:
	@$(WEBPACK)

test-all: test-cov

build:
	@./node_modules/loader-builder/bin/builder server/views .

fb-watch:
	@./node_modules/.bin/babel-node ./server/bin/watchfile.js

reversion:
	@./node_modules/.bin/babel-node ./server/bin/version.js

contributors:
	@./node_modules/.bin/contributors -f plain -o AUTHORS

autod:
	@./node_modules/.bin/autod -w -e build
	@npm install

prev-build:
	@mkdir -p public/dist/js

.PHONY: clean test
