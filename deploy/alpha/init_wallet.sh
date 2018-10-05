#!/bin/bash

EOS_NODE_URL=https://rpc.eosys.io
KEOSD_URL=http://127.0.0.1:8900

# Wait until keosd is loaded
loaded=false
regex="2.."
while [ $loaded != true ]; do
    response=$(curl -s -o /dev/null -I -w "%{http_code}" $KEOSD_URL/v1/wallet/list_wallets)
    if [[ $response =~ $regex ]]; then
      loaded=true
      echo "############ keosd loaded ############"
    else
      sleep 5
      echo "waiting keosd loading....."
    fi
done

curl --request POST --url $KEOSD_URL/v1/wallet/create --data '"default"'
curl --request POST --url $KEOSD_URL/v1/wallet/import_key --data "[\"default\",\"$EOS_PRIVATE_KEY\"]"
