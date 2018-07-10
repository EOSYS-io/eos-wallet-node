const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const Eos = require('eosjs')
function creator() {
    if (process.env.EOS_ACCOUNT) {
        return process.env.EOS_ACCOUNT
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
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'alpha') {
    Config.chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
    Config.keyProvider = process.env.EOS_PRIVATE_KEY
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
            res.status(error.status)
            res.send(error)
        }
    })
})

app.get('/account', function(req, res) {
    eos = Eos(Config)
    eos.getAccount(req.query.name).then(function(result) {
        res.send(result)
    }, function(error) {
        res.status(error.status)
        res.send(error)
    })
})

app.post('/account', jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400)
    
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
        })
        
        tr.buyrambytes({
            payer: eosAccount,
            receiver: accountName,
            bytes: 8192
        })
        
        tr.delegatebw({
            from: eosAccount,
            receiver: accountName,
            stake_net_quantity: '0.1000 EOS',
            stake_cpu_quantity: '0.1000 EOS',
            transfer: 0
        })
    }).then(function(result) {
        res.send(result)
    }, function(error) {
        try {
            error_obj = JSON.parse(error)
            res.status(error_obj.code)
        }
        catch(err) {
            res.status(500)
        }
        res.send(error)
    })
})

if (!process.env.NODE_ENV) {
    app.listen(5000, () => console.log('App listening on port 5000!'))
}
else {
    app.listen(80, () => console.log('App listening on port 80!'))
}
