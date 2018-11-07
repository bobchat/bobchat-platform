# /bin/sh
CHARTS="/Users/samuel/desktop/projects/src/bobchat/server/charts/bobchat"

if [ -z "$1" ]
then
  1=$BOBCHAT_LAST_DEPLOYMENT
else 
  export BOBCHAT_LAST_DEPLOYMENT=$1
fi

helm upgrade --install bobchat-platform $CHARTS --set global.imageTag=$1 --namespace=default --force