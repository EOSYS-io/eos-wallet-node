### Run on development environment
```bash
$ docker build -f deploy/development/Dockerfile -t eos-wallet-node .
$ docker run -d -p 5000:80 --name eos-wallet-node eos-wallet-node
$ curl localhost:5000
{"server_version":"5875549c","chain_id":"1c6ae7719a2a3b4ecb19584a30ff510ba1b6ded86e1fd8b8fc22f1179c622a32","head_block_num":873,"last_irreversible_block_num":872,"last_irreversible_block_id":"00000368056ab32445dfe49eb20e402b29e9ff7978dd6a97249b1f278e4be54c","head_block_id":"00000369443df6f00bcd66db4af2d40491f27ce2e98f7445d1613183e4f589d7","head_block_time":"2018-09-13T06:00:58.000","head_block_producer":"eosio","virtual_block_cpu_limit":477848,"virtual_block_net_limit":2508272,"block_cpu_limit":99900,"block_net_limit":1048576}
```
