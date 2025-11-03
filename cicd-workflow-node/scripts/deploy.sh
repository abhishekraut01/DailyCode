cd Deploy_node_app_CiCd
git pull https://github.com/abhishekraut01/Deploy_node_app_CiCd
npm run build
pm2 stop "node-ts-app"
pm2 start npm --name "node-ts-app" -- start