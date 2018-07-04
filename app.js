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
    Config.chainId = 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
    Config.keyProvider = '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
    Config.httpEndpoint = 'http://127.0.0.1:8888'
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
    
    accountName = req.body.account_name
    pubkey = req.body.pubkey
    
    eos.transaction(tr => {
        tr.newaccount({
            creator: creator(),
            name: accountName,
            owner: pubkey,
            active: pubkey
        })
        
        tr.buyrambytes({
            payer: creator(),
            receiver: accountName,
            bytes: 8192
        })
        
        tr.delegatebw({
            from: creator(),
            receiver: accountName,
            stake_net_quantity: '0.1000 EOS',
            stake_cpu_quantity: '0.1000 EOS',
            transfer: 0
        })
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
