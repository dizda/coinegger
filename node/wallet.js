'use strict';

var bitcoin = require('bitcoinjs-lib')
  , crypto  = bitcoin.crypto;


function Wallet()
{
    // null byte-o-cul
}

Wallet.prototype.create = function(seed, network)
{
    return new bitcoin.Wallet(crypto.sha256(seed), bitcoin.networks[network]);
};

Wallet.prototype.getMultisigAddress = function(requiredSignatures, pubkeys)
{
    var redeemScript = bitcoin.scripts.multisigOutput(requiredSignatures, pubkeys);
    var scriptPubKey = bitcoin.scripts.scriptHashOutput(redeemScript.getHash());

    //return bitcoin.Address.fromOutputScript(scriptPubKey).toString();
    return {
        address: bitcoin.Address.fromOutputScript(scriptPubKey).toString(),
        redeemScript: redeemScript,
        scriptPubKey: scriptPubKey
    };
};

module.exports = Wallet;
