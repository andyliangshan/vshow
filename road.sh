git pull origin master
nvm use 6.6.0
gulp build
mkdir -p public/dist/js/uk
make build
nvm use 0.12.0
pm2 restart sempc
pm2 logs sempc
