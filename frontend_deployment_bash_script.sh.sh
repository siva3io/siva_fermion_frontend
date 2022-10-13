#!/bin/bash
echo "Welcome!!"
echo "LET ME FIRST UPDATE YOUR SYSTEM"
sudo apt update
echo " Is your ssh key added to the git ? 'y' for yes or 'n' for no " 
read ans
echo " Input your domain name ! "
read WEBSITE_NAME
if [ $ans == "y" ]
then
   echo " Should I install NGINX for you ? 'y' for yes or 'n' for no "
   read NGINX
   if [ $NGINX == "y" ]
   then
       sudo apt install nginx
   fi
    wget --no-check-certificate --no-proxy 'https://bash-nginx-configuration.s3.ap-south-1.amazonaws.com/frontend_nginx_settings'
    sed -i 's/WEB_NAME/'$WEBSITE_NAME'/g' frontend_nginx_settings

   sudo mv ~/frontend_nginx_settings /etc/nginx/sites-enabled
   sudo chmod 777 /etc/nginx/sites-enabled

   sudo service nginx reload

   echo " Do you want SSL ? We use certbot for the same !! "
   read SSL
   if [ $SSL == "y" ]
   then

       sudo apt install letsencrypt
       sleep 1
       netstat -plant
       sudo systemctl status certbot.timer
       sudo pkill -f nginx & wait $!
       sudo certbot certonly --standalone --agree-tos --preferred-challenges http -d $WEBSITE_NAME 
       sudo apt install python3-certbot-nginx
       sudo certbot --nginx --agree-tos --preferred-challenges http -d $WEBSITE_NAME 
       sudo pkill -f nginx & wait $!
       sudo service nginx start
       sudo service nginx status
   fi
   echo "Do you want me to install node and npm ? 'y' or 'n'  "
   read nodenpm
   if [ $nodenpm == "y" ]
   then
       sudo apt install nodejs
       echo " your node version is $(node -v)"
       sudo apt install npm
   fi
   echo "Do you want me to install pm2 ? 'y' or 'n' "
   read pm
   if [ $pm == "y" ]
   then
       sudo npm i -g pm2
   fi
   echo "Which microservice you want to deploy?"
   read microservice
   echo "please provide the git ssh cloning url for $microservice "
   read url
   sudo git clone $url
   echo "which branch you want to deploy"
   read branch
   cd $microservice
   sudo git checkout $branch
   cd frontend
   sudo rm -rf package-lock.json
   sudo npm i --legacy-peer-deps
   pwd
   sudo npm run build
   cd $microservice
   cd ..
   cd backend
   pm2 start Main.js -i 1 --name $microservice

   echo "Your JOB is done"

else
   echo "Sorry I can not work without that !!"
fi
