### Run on development environment
```bash
$ docker build -f deploy/development/Dockerfile -t eos-wallet-node .
$ docker run -d -p 5000:80 --name eos-wallet-node eos-wallet-node
```

### APIs
#### Get info
```bash
$ curl localhost:5000 | python -m json.tool
{
    "server_version": "5875549c",
    "chain_id": "1c6ae7719a2a3b4ecb19584a30ff510ba1b6ded86e1fd8b8fc22f1179c622a32",
    "head_block_num": 2932,
    "last_irreversible_block_num": 2931,
    "last_irreversible_block_id": "00000b7332a1cfacb556b9af0a6b08177d048db2f4a6dceea969d486a0d14004",
    "head_block_id": "00000b7405ae8338bf47bd3d61ab837b30c367861ab5233d77b81bfd8900cac7",
    "head_block_time": "2018-09-13T06:18:07.500",
    "head_block_producer": "eosio",
    "virtual_block_cpu_limit": 3745843,
    "virtual_block_net_limit": 19677034,
    "block_cpu_limit": 99900,
    "block_net_limit": 1048576
}
```

#### Account
```bash
$ curl localhost:5000/account?name=eosio | python -m json.tool
{
    "account_name": "eosio",
    "head_block_num": 2853,
    "head_block_time": "2018-09-13T06:17:28.000",
    "privileged": true,
    "last_code_update": "1970-01-01T00:00:00.000",
    "created": "2018-03-02T12:00:00.000",
    "ram_quota": -1,
    "net_weight": -1,
    "cpu_weight": -1,
    "net_limit": {
        "used": -1,
        "available": -1,
        "max": -1
    },
    "cpu_limit": {
        "used": -1,
        "available": -1,
        "max": -1
    },
    "ram_usage": 2964,
    "permissions": [
        {
            "perm_name": "active",
            "parent": "owner",
            "required_auth": {
                "threshold": 1,
                "keys": [
                    {
                        "key": "EOS8Znrtgwt8TfpmbVpTKvA2oB8Nqey625CLN8bCN3TEbgx86Dsvr",
                        "weight": 1
                    }
                ],
                "accounts": [],
                "waits": []
            }
        },
        {
            "perm_name": "owner",
            "parent": "",
            "required_auth": {
                "threshold": 1,
                "keys": [
                    {
                        "key": "EOS8Znrtgwt8TfpmbVpTKvA2oB8Nqey625CLN8bCN3TEbgx86Dsvr",
                        "weight": 1
                    }
                ],
                "accounts": [],
                "waits": []
            }
        }
    ],
    "total_resources": null,
    "self_delegated_bandwidth": null,
    "refund_request": null,
    "voter_info": null
}
```

#### Create account
```bash
$ curl -H "Content-Type: application/json" -d '{ "account_name": "testtestgood", "pubkey": "EOS5x2nWYYncpQ6h3dz9QEjBBisSPymX1fkyguJUv6bGkZfr5Uvx3" }' localhost:5000/account | python -m json.tool
{
    "broadcast": true,
    "transaction": {
        "compression": "none",
        "transaction": {
            "expiration": "2018-09-13T06:23:50",
            "ref_block_num": 3496,
            "ref_block_prefix": 2140688295,
            "net_usage_words": 0,
            "max_cpu_usage_ms": 0,
            "delay_sec": 0,
            "context_free_actions": [],
            "actions": [
                {
                    "account": "eosio",
                    "name": "newaccount",
                    "authorization": [
                        {
                            "actor": "eosio",
                            "permission": "active"
                        }
                    ],
                    "data": "0000000000ea305590286519ab9cb1ca010000000100028bbd0cc3be68562a36d2ff40d112ce6b8bf3ed51a7ec2fb5276292a925bfe3c101000000010000000100028bbd0cc3be68562a36d2ff40d112ce6b8bf3ed51a7ec2fb5276292a925bfe3c101000000"
                },
                {
                    "account": "eosio",
                    "name": "buyrambytes",
                    "authorization": [
                        {
                            "actor": "eosio",
                            "permission": "active"
                        }
                    ],
                    "data": "0000000000ea305590286519ab9cb1ca00200000"
                },
                {
                    "account": "eosio",
                    "name": "delegatebw",
                    "authorization": [
                        {
                            "actor": "eosio",
                            "permission": "active"
                        }
                    ],
                    "data": "0000000000ea305590286519ab9cb1cae80300000000000004454f5300000000e80300000000000004454f530000000000"
                }
            ],
            "transaction_extensions": []
        },
        "signatures": [
            "SIG_K1_KdQeosjUG9VFhfWkuSrQDPP79CGwp7PzJbtMaakBi92jcB873iFeSq5K9Lp6mbtjm2GQDze31Jn3pFZyzuhmyXMmCGGAAq"
        ]
    },
    "transaction_id": "0d590d21fd02cfe3741c65ccd1e5e0d9d211b359c0c64e7926ff51a5bf20c5d2",
    "processed": {
        "id": "0d590d21fd02cfe3741c65ccd1e5e0d9d211b359c0c64e7926ff51a5bf20c5d2",
        "receipt": {
            "status": "executed",
            "cpu_usage_us": 2425,
            "net_usage_words": 42
        },
        "elapsed": 2425,
        "net_usage": 336,
        "scheduled": false,
        "action_traces": [
            {
                "receipt": {
                    "receiver": "eosio",
                    "act_digest": "6a3e95d26ab9bc9bb684cb24da141d6d29ef9f419428b309837c105de4b55604",
                    "global_sequence": 3519,
                    "recv_sequence": 3517,
                    "auth_sequence": [
                        [
                            "eosio",
                            3514
                        ]
                    ],
                    "code_sequence": 0,
                    "abi_sequence": 0
                },
                "act": {
                    "account": "eosio",
                    "name": "newaccount",
                    "authorization": [
                        {
                            "actor": "eosio",
                            "permission": "active"
                        }
                    ],
                    "data": {
                        "creator": "eosio",
                        "name": "testtestgood",
                        "owner": {
                            "threshold": 1,
                            "keys": [
                                {
                                    "key": "EOS5x2nWYYncpQ6h3dz9QEjBBisSPymX1fkyguJUv6bGkZfr5Uvx3",
                                    "weight": 1
                                }
                            ],
                            "accounts": [],
                            "waits": []
                        },
                        "active": {
                            "threshold": 1,
                            "keys": [
                                {
                                    "key": "EOS5x2nWYYncpQ6h3dz9QEjBBisSPymX1fkyguJUv6bGkZfr5Uvx3",
                                    "weight": 1
                                }
                            ],
                            "accounts": [],
                            "waits": []
                        }
                    },
                    "hex_data": "0000000000ea305590286519ab9cb1ca010000000100028bbd0cc3be68562a36d2ff40d112ce6b8bf3ed51a7ec2fb5276292a925bfe3c101000000010000000100028bbd0cc3be68562a36d2ff40d112ce6b8bf3ed51a7ec2fb5276292a925bfe3c101000000"
                },
                "elapsed": 54,
                "cpu_usage": 0,
                "console": "",
                "total_cpu_usage": 0,
                "trx_id": "0d590d21fd02cfe3741c65ccd1e5e0d9d211b359c0c64e7926ff51a5bf20c5d2",
                "inline_traces": []
            },
            {
                "receipt": {
                    "receiver": "eosio",
                    "act_digest": "ad137b58475f363f2788f92210499b8d0c7c77221ae4e3174905ef6490fba290",
                    "global_sequence": 3520,
                    "recv_sequence": 3518,
                    "auth_sequence": [
                        [
                            "eosio",
                            3515
                        ]
                    ],
                    "code_sequence": 0,
                    "abi_sequence": 0
                },
                "act": {
                    "account": "eosio",
                    "name": "buyrambytes",
                    "authorization": [
                        {
                            "actor": "eosio",
                            "permission": "active"
                        }
                    ],
                    "data": "0000000000ea305590286519ab9cb1ca00200000"
                },
                "elapsed": 7,
                "cpu_usage": 0,
                "console": "",
                "total_cpu_usage": 0,
                "trx_id": "0d590d21fd02cfe3741c65ccd1e5e0d9d211b359c0c64e7926ff51a5bf20c5d2",
                "inline_traces": []
            },
            {
                "receipt": {
                    "receiver": "eosio",
                    "act_digest": "e771408f7e7fcac91bbf726da36bf2d881bccd1b87b5cfbcae210d1b4d78b81f",
                    "global_sequence": 3521,
                    "recv_sequence": 3519,
                    "auth_sequence": [
                        [
                            "eosio",
                            3516
                        ]
                    ],
                    "code_sequence": 0,
                    "abi_sequence": 0
                },
                "act": {
                    "account": "eosio",
                    "name": "delegatebw",
                    "authorization": [
                        {
                            "actor": "eosio",
                            "permission": "active"
                        }
                    ],
                    "data": "0000000000ea305590286519ab9cb1cae80300000000000004454f5300000000e80300000000000004454f530000000000"
                },
                "elapsed": 5,
                "cpu_usage": 0,
                "console": "",
                "total_cpu_usage": 0,
                "trx_id": "0d590d21fd02cfe3741c65ccd1e5e0d9d211b359c0c64e7926ff51a5bf20c5d2",
                "inline_traces": []
            }
        ],
        "except": null
    }
}
```
