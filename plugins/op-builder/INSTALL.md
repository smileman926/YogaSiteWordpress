OptimizePress
=============

### Prepare

- Install `nginx`/`apache`
- Install `php` (version `5.3` or newer)
- Install `mysql` database
- Download and configure [wordpress](https://wordpress.com)

### Set system

Install `nodejs`:

	curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
	sudo apt-get install -y nodejs

Install `yarn`:

	curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
	echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
	sudo apt-get update
	sudo apt-get install -y yarn

Set `npm` permission:

	mkdir ~/.npm-global
	npm config set prefix '~/.npm-global'
	echo '' >> ~/.profile
	echo '# optimizepress3 development environment' >> ~/.profile
	echo 'export PATH=\"\$HOME/.npm-global/bin:\$PATH\"' >> ~/.profile
	source ~/.profile

Globally install `gulp`:

	yarn global add gulp

### Set development environment

	git clone git@bitbucket.org:optimizepress/optimizepress3.git /var/www/public/wp-content/plugins/optimizepress3
	cd /var/www/public/wp-content/plugins/optimizepress3
	composer install
	yarn install
	gulp dev

### Debug

Error: `Node Sass does not yet support your current environment: OS X 64-bit with Unsupported runtime`
Solution: `npm rebuild node-sass`
