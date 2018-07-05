const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const Eos = require('eosjs')
function creator() {
    if (process.env.NODE_ENV === 'production') {
        return 'eoshubwallet'
    }
    else {
        return 'eosio'
    }
}

const Config = {
    expireInSeconds: 60,
    broadcast: true,
    verbose: true,
    sign: true
}
if (process.env.NODE_ENV === 'production') {
    Config.chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
    Config.keyProvider = process.env.EOS_KEY_PROVIDER
    Config.httpEndpoint = 'https://rpc.eosys.io'
}
else {
    Config.chainId = '1c6ae7719a2a3b4ecb19584a30ff510ba1b6ded86e1fd8b8fc22f1179c622a32'
    Config.keyProvider = '5K463ynhZoCDDa4RDcr63cUwWLTnKqmdcoTKTHBjqoKfv4u5V7p'
    Config.httpEndpoint = 'http://127.0.0.1:8000'
}

app.get('/', function(req, res) {
    eos = Eos(Config)
    eos.getInfo((error, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.send(error)
        }
    })
})

app.get('/account', function(req, res) {
    eos = Eos(Config)
    eos.getAccount(req.query.name).then(function(result) {
        res.send(result)
    }, function(error) {
        res.send(error)
    })
})

app.post('/account', jsonParser, function(req, res) {
    eos = Eos(Config)
    
    eosAccount = creator()
    accountName = req.body.account_name
    pubkey = req.body.pubkey
    
    eos.transaction(tr => {
        tr.newaccount({
            creator: eosAccount,
            name: accountName,
            owner: pubkey,
            active: pubkey
        }
        )
        
        tr.buyrambytes({
            payer: eosAccount,
            receiver: accountName,
            bytes: 8192
        }
        )
        
        tr.delegatebw({
            from: eosAccount,
            receiver: accountName,
            stake_net_quantity: '100.0000 SYS',
            stake_cpu_quantity: '100.0000 SYS',
            transfer: 0
        }
        )
    }).then(function(result) {
        res.send(result)
    }, function(error) {
        res.send(error)
    })
})

if (!process.env.NODE_ENV) {
    app.listen(5000, () => console.log('App listening on port 5000!'))
}
else {
    app.listen(80, () => console.log('App listening on port 80!'))
}
