#!/bin/bash
RED='\033[0;31m'
BRed='\033[1;31m'
BGreen='\033[1;32m'
BPurple='\033[1;35m'
BCyan='\033[1;36m'
BBlue='\033[1;34m'
BYellow='\033[1;33m'
BWhite='\033[1;37m'
echo -e "${BGreen}WELCOME TO ${BRed} SIVA'S ${BGreen} AUTOMATIC DEPLOYMENT."
echo -e "${BPurple}Open the following ${BRed}port ${BPurple}if you want to use default ports"
echo -e "${BCyan}Postgres : ${BRed}PORT 5432"
echo -e "${BCyan}MongoDB : ${BRed}PORT 27017"
echo -e "${BCyan}Redis : ${BRed}PORT 6379"
echo -e "${BCyan}Frontend Microservices : ${BRed}PORT 4000-4032"
echo -e "${BPurple}Make sure to bind your IP address to DNS${BWhite}"
sleep 2
sudo apt update
echo -e "${BYellow} Do you want to install Postgress ? ${BRed}(Y)es/(N)o ${BWhite} "
read postgress
low_postgress=$(echo $postgress | tr '[:upper:]' '[:lower:]')
if [[ $low_postgress == 'y' || $low_postgress == 'yes' ]];then
    echo -e "${BGreen}Installing postgresql ! ${BWhite}"
    yes | sudo apt install postgresql postgresql-contrib
    sudo systemctl enable postgresql.service
    sudo chmod 777 -R /etc/postgresql/14/main
    sudo sed -i 's/#listen_addresses/listen_addresses/1' /etc/postgresql/14/main/postgresql.conf
    sudo sed -i 's/localhost/*/1' /etc/postgresql/14/main/postgresql.conf
    echo -e "${BYellow} Change default port 5432 ? ${BRed}(Y)es/(N)o ${BWhite} "
    read port_change
    low_port_change=$(echo $port_change | tr '[:upper:]' '[:lower:]')
    if [[ $low_port_change == 'yes' || $low_port_change == 'y' ]];then
        echo -e "${BYellow} Enter port number."
        read port_postgres
        sudo sed -i 's/5432/'$port_postgres'/g' /etc/postgresql/14/main/postgresql.conf
    fi
    echo -e "host  all  all 0.0.0.0/0 md5" >> /etc/postgresql/14/main/pg_hba.conf 
    sudo systemctl start postgresql.service
    sudo systemctl restart postgresql.service
    echo -e "${BGreen}This is the status of postgresql : "
    sudo systemctl status postgresql.service
    cd ..
    sudo chmod 777 -R ubuntu
    echo -e "${BCyan} Enter the Username${BWhite}"
    read eunimartuser
    echo -e "${BCyan} Enter the Password${BWhite}"
    read -s eunimart_password
    echo -e "${BCyan} Enter the name for the Database${BWhite}"
    read eunimart_database 
    cd /home/ubuntu
    sudo -u postgres psql<<-EOF
    CREATE USER $eunimartuser WITH SUPERUSER PASSWORD '$eunimart_password' ;
    CREATE DATABASE $eunimart_database;
    grant all privileges on database $eunimart_database to $eunimartuser;
EOF
else
    echo -e "${BRed} Aborting this installation"
fi
echo -e "${BYellow} Do you want to install Redis? ${BRed}(Y)es/(N)o ${BWhite} "
read reddis
low_reddis=$(echo $reddis | tr '[:upper:]' '[:lower:]')
if [[ $low_reddis == 'y' || $low_reddis == 'yes' ]]
then
     yes | sudo apt install redis-server
     cd /etc/
     sudo chmod 777 -R redis
     cd /etc/redis
     sed -i 's/supervised no/supervised systemd/g' redis.conf
     sudo systemctl restart redis.service
     sudo systemctl status redis
     cd /home/ubuntu
else
    echo -e "${BRed} Aborting this installation"
fi
echo -e "${BYellow} Do you want to install Mongodb? ${BRed}(Y)es/(N)o ${BWhite} "
read mongo
low_mongo=$(echo $mongo | tr '[:upper:]' '[:lower:]') 
if [[ $low_mongo == 'y' || $low_mongo == 'yes' ]];then
    sudo wget -asc -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
    echo -e "deb http://security.ubuntu.com/ubuntu focal-security main" | sudo tee /etc/apt/sources.list.d/focal-security.list 
    echo -e "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
    sudpkg -i libssl-dev_1.1.1l-1ubuntu1.5_amd64.debdo apt-get update
    sudo apt update
    yes | sudo apt-get install -y mongodb-org
    sudo systemctl enable mongod.service
    sudo systemctl start mongod
    sudo systemctl daemon-reload
    sudo systemctl restart mongod
    sudo systemctl status mongod
else
    echo -e "${BRed} Aborting this installation"
fi

echo -e "${BYellow} Do you want to install golang ? ${BRed}(Y)es/(N)o ${BWhite} "
read golang
low_golang=$(echo $golang | tr '[:upper:]' '[:lower:]') 
if [[ $low_golang == "y" || $low_golang == "yes" ]]
then
    yes | sudo apt install nodejs
    yes | sudo apt install npm
    sudo npm i -g pm2

    echo -e "${BYellow} Enter the backend URL. ${BWhite}"
    read WEBSITE_NAME
    yes | sudo apt install nginx
    wget --no-check-certificate --no-proxy 'https://bash-nginx-configuration.s3.ap-south-1.amazonaws.com/backend_nginx_settings.conf'
    sed -i 's/WEB_NAME/'$WEBSITE_NAME'/g' backend_nginx_settings.conf
    sudo chmod 777 -R /etc/nginx/sites-enabled
    sudo mv ~/backend_nginx_settings.conf /etc/nginx/sites-enabled
    sudo service nginx reload
    yes | sudo apt install golang-go
    echo -e "${BGreen} your golang version is $(go version)${BWhite}"
    echo -e "${BCyan} Cloning code_develop_go_0.0${BWhite}"
    git clone https://github.com/siva3io/fermion-backend.git
    sleep 3
    cd /home/ubuntu/fermion-backend/docs
    sed -i 's/"https"/"http"/g' docs.go
    sed -i 's/eunimart.tech.com/'$WEBSITE_NAME'/g' docs.go
    echo -e "${BYellow} Enter the Postgress host address.${BWhite}"
    read POSTGRESS_HOST
    echo -e "${BYellow} Enter the Postgress user.${BWhite}"
    read POSTGRESS_USER
    echo -e "${BYellow} Enter the Postgress password.${BWhite}"
    read -s POSTGRESS_PASS
    echo -e "${BYellow} Enter the Postgress database name.${BWhite}"
    read POSTGRESS_DBNAME
    sleep 1
    echo -e "${BCyan} Enter the Mongodb host name.${BWhite}"
    read MONGO_DB_HOST
    echo -e "${BCyan} Enter the Mongodb user.${BWhite}"
    read MONGO_DB_USER
    echo -e "${BCyan} Enter the Mongodb password.${BWhite}"
    read -s MONGO_DB_PASS
    echo -e "${BCyan} Enter the Mongodb database name.${BWhite}"
    read MONGO_DB_NAME
    sleep 1
    echo -e "${BBlue} Enter the Redis host address.${BWhite}"
    read REDIS_HOST
    echo -e "${BBlue} Enter the Redis password.${BWhite}"
    read -s REDIS_PASS
    cd /home/ubuntu/fermion-backend
    sudo sed -i 's/DB_HOST=localhost/'DB_HOST=$POSTGRESS_HOST'/g' .env.development
    sudo sed -i 's/DB_USER=fermionuser/'DB_USER=$POSTGRESS_USER'/g' .env.development
    sudo sed -i 's/DB_PASS=fermion/'DB_PASS=$POSTGRESS_PASS'/g' .env.development
    sudo sed -i 's/DB_NAME=siva_platform_fermion/'DB_NAME=$POSTGRESS_DBNAME'/g' .env.development
    sudo sed -i 's/MONGO_DB_HOST=localhost/'MONGO_DB_HOST=$MONGO_DB_HOST'/g' .env.development
    sudo sed -i 's/MONGO_DB_USER=Fermionuser/'MONGO_DB_USER=$MONGO_DB_USER'/g' .env.development
    sudo sed -i 's/MONGO_DB_PASS=Fermion/'MONGO_DB_PASS=$MONGO_DB_PASS'/g' .env.development
    sudo sed -i 's/MONGO_DB_NAME=Siva_platform_fermion_mongo/'MONGO_DB_NAME=$MONGO_DB_NAME'/g' .env.development
    sudo sed -i 's/REDIS_HOST=localhost/'REDIS_HOST=$REDIS_HOST'/g' .env.development
    sudo sed -i 's/REDIS_PASS=root5758/'REDIS_PASS=$REDIS_PASS'/g' .env.development
    go mod tidy
    go run . -clearDB=true -migrateDB=true -seedMD=true -seedTD=true
    go build .
    pm2 start fermion  -i 1 --name fermion

else
    echo -e "${BRed} Aborting this installation"
fi

echo -e "${BYellow} Install and setup SSL for backend server? ${BRed}(Y)es/(N)o ${BWhite}. ${BGreen}(We use certbot for the same.) ${BWhite}"
read SSL
low_SSL=$(echo $SSL | tr '[:upper:]' '[:lower:]') 
if [[ $low_SSL == "y" || $low_SSL == "yes" ]]
then
    echo -e "${BGreen}Enter the URL.${BWhite}"
    read eunimart_WEBSITE_NAME
    yes | sudo apt install letsencrypt
    sleep 1
    netstat -plant
    sudo systemctl status certbot.timer
    sudo pkill -f nginx & wait $!
    sudo certbot certonly --standalone --agree-tos --preferred-challenges http -d $eunimart_WEBSITE_NAME
    yes | sudo apt install python3-certbot-nginx
    sudo certbot --nginx --agree-tos --preferred-challenges http -d $eunimart_WEBSITE_NAME
    sudo pkill -f nginx & wait $!
    sudo service nginx start
    sudo service nginx status
else
    echo -e "${BRed} Aborting this installation"
fi

echo -e "${BCyan} Install frontend ? ${BRed}(Y)es/(N)o ${BWhite} "
read frontend_install
low_frontend_install=$(echo $frontend_install | tr '[:upper:]' '[:lower:]') 
if [[ $low_frontend_install == 'y' || $low_frontend_install == 'yes' ]];then    
    git clone https://github.com/siva3io/fermion-frontend.git
    echo -e "${BYellow} Enter the frontend URL.${BWhite} "
    read WEBSITE_NAME_FRONTEND
    echo -e "${BYellow} Do you want to install node and npm ? ${BRed} (Y)es/(N)o ${BWhite} "
    read nodenpm
    low_nodenpm=$(echo $nodenpm | tr '[:upper:]' '[:lower:]')
    if [[ $low_nodenpm == "y" || $low_nodenpm == "yes" ]]
    then
        yes | sudo apt install nodejs
        echo -e "${BGreen} your node version is ${BCyan} $(node -v)${BWhite} "
        yes | sudo apt install npm
    else
        echo -e "${BRed} Aborting this installation"
    fi
    echo -e "${BYellow} Do you want to install pm2 ? ${BRed} (Y)es/(N)o ${BWhite} "
    read pm
    low_pm=$(echo $pm | tr '[:upper:]' '[:lower:]')
    if [[ $low_pm == "yes" || $low_pm == "y" ]]
    then
        sudo npm i -g pm2
    else
        echo -e "${BRed} Aborting this installation"
    fi
    
    echo -e "${BYellow} Install NGINX ? ${BRed} (Y)es/(N)o ${BWhite} "
    read NGINX
    low_NGINX=$(echo $NGINX | tr '[:upper:]' '[:lower:]')
    if [[ $low_NGINX == "y" || $low_NGINX == "yes" ]]
    then
        yes | sudo apt install nginx
    else
        echo -e "${BRed} Aborting this installation ${BWhite} " 
    fi
    wget --no-check-certificate --no-proxy 'https://bash-nginx-configuration.s3.ap-south-1.amazonaws.com/frontend_nginx_settings.conf'
    sed -i 's/WEB_NAME/'$WEBSITE_NAME_FRONTEND'/g' frontend_nginx_settings.conf
    sudo chmod 777 -R /etc/nginx/sites-enabled
    sudo mv ~/frontend_nginx_settings.conf /etc/nginx/sites-enabled
    sudo service nginx reload

    echo -e "${BYellow} Install and setup SSL for frontend server? ${BRed}(Y)es/(N)o ${BWhite}. ${BGreen}(We use certbot for the same.) ${BWhite}"
    read SSL
    low_SSL=$(echo $SSL | tr '[:upper:]' '[:lower:]') 
    if [[ $low_SSL == "y" || $low_SSL == "yes" ]]
    then
        echo -e "${BGreen}Enter the URL.${BWhite}"
        read eunimart_WEBSITE_NAME
        yes | sudo apt install letsencrypt
        sleep 1
        netstat -plant
        sudo systemctl status certbot.timer
        sudo pkill -f nginx & wait $!
        sudo certbot certonly --standalone --agree-tos --preferred-challenges http -d $eunimart_WEBSITE_NAME
        yes | sudo apt install python3-certbot-nginx
        sudo certbot --nginx --agree-tos --preferred-challenges http -d $eunimart_WEBSITE_NAME
        sudo pkill -f nginx & wait $!
        sudo service nginx start
        sudo service nginx status
    else
        echo -e "${BRed} Aborting this installation ${BWhite}   "
    fi
    echo -e "${BYellow} Install frontend microservices? ${BRed}(Y)es/(N)o ${BWhite}"
    read micro_install
    low_micro_install=$(echo $micro_install | tr '[:upper:]' '[:lower:]')
    if [[ $low_micro_install == 'y' || $low_micro_install == 'yes' ]]
    then    
        service=('eunimart_v2-accounting_eunimart_v2' 'eunimart_v2-access_engine_eunimart' 'eunimart_v2-asn_eunimart' 'eunimart_v2-contacts_eunimart' 'eunimart_v2-core_eunimart' 'eunimart_v2-grn_eunimart' 'eunimart_v2-inventory_eunimart' 'eunimart_v2-invoicing_eunimart' 'eunimart_v2-ist_eunimart' 'eunimart_v2-locations_eunimart' 'eunimart_v2-ndr_rto_wd_v2_eunimart' 'eunimart_v2-po_eunimart' 'eunimart_v2-pricing_eunimart' 'eunimart_v2-products_eunimart' 'eunimart_v2-purchase_return_eunimart' 'eunimart_v2-sale_returns_eunimart' 'eunimart_v2-sales_orders_eunimart' 'eunimart_v2-scrap_orders_eunimart' 'eunimart_v2-settings_eunimart' 'eunimart_v2-shipping_management_eunimart' 'eunimart_v2-uom_eunimart' 'eunimart_v2-user_profile_eunimart')
        n=0
        echo -e "${BBlue} Enter backend url.${BWhite}"
        read BACKEND_API_URL_NAME
        echo -e "${BBlue} Enter frontend url.${BWhite}"
        read REMOTE_URL
        while [ $n == 0 ]
        do
        	echo -e "${BYellow} Which microservice you want to deploy. Enter the serial number against your choice. ${BWhite}"
        	echo -e "${BGreen} 
                               0-eunimart_v2-accounting_eunimart_v2
                               1-eunimart_v2-access_engine_eunimart
                               2-eunimart_v2-asn_eunimart       
                               3-eunimart_v2-contacts_eunimart
                               4-eunimart_v2-core_eunimart
                               5-eunimart_v2-grn_eunimart
                               6-eunimart_v2-inventory_eunimart
                               7-eunimart_v2-invoicing_eunimart
                               8-eunimart_v2-ist_eunimart
                               9-eunimart_v2-locations_eunimart
                               10-eunimart_v2-ndr_rto_wd_v2_eunimart
                               11-eunimart_v2-po_eunimart
                               12-eunimart_v2-pricing_eunimart
                               13-eunimart_v2-products_eunimart
                               14-eunimart_v2-purchase_return_eunimart
                               15-eunimart_v2-sale_returns_eunimart
                               16-eunimart_v2-sales_orders_eunimart
                               17-eunimart_v2-scrap_orders_eunimart
                               18-eunimart_v2-settings_eunimart
                               19-eunimart_v2-shipping_management_eunimart
                               20-eunimart_v2-uom_eunimart
                               21-eunimart_v2-user_profile_eunimart
                               22-${BRed}EXIT THE DEPLOYMENT${BWhite}"
        	read frontend_microservice_name
        	
            if [ -z "$frontend_microservice_name" ]
        	then
        		echo -e " ${BRed} Inputs cannot be blank please try again "
            		continue
        	elif ! [[ "$frontend_microservice_name" =~ ^[+-]?[0-9]+\.?[0-9]*$ ]]
        	then
        		echo -e "${BRed}Inputs must be a numbers" 
            		continue
        	elif (( $frontend_microservice_name >= 0 && $frontend_microservice_name <= 21 ))
        	then
        		echo -e "${BGreen} deploying microservice ${BRed} ${service[$frontend_microservice_name]}"
            	cd /home/ubuntu/fermion-frontend
            	cd ${service[$frontend_microservice_name]}
                cd frontend
                
                sudo sed -i 's/eunimart.tech.com/'$BACKEND_API_URL_NAME'/g' .env.dev
                sudo sed -i 's/frontend_url.com/'$REMOTE_URL'/g' .env.dev
                echo -e "${BBlue}Installing dependencies${BWhite}"
                sudo rm -rf package-lock.json
                sudo npm i --legacy-peer-deps
                pwd
                sudo npm run build
                sudo cp -r dist/ /home/ubuntu/fermion-frontend/${service[$frontend_microservice_name]}/backend
                cd /home/ubuntu/fermion-frontend/${service[$frontend_microservice_name]}/backend
                sudo npm i
                pm2 start Main.js -i 1 --name ${service[$frontend_microservice_name]}
        	elif (( $frontend_microservice_name == 22 ))
        	then
        		(( n-- ))
        		echo -e "${BRed} EXITING THE DEPLOYMENT"
        	else
        		echo -e "${BRed} Invalid input , try again! "
        	fi
        done
    else
        echo -e "${BRed} Aborting this installation"
    fi
else
    echo -e "${BRed}Aborting this installation"
fi
echo -e "${BPurple} Thank you for using ${BRed} siva3.io's ${BPurple} deployment script for setting up your infrastructure ${BGreen} successfully ${BPurple} !!"