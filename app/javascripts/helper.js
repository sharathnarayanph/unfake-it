export function createContractInstance(abiFactory, addr) {
    var abi = JSON.parse(abiFactory);

    var contract = web3.eth.contract(abi);

    var instance = contract.at(addr);

    return instance;
}

export function deployContract(abiDefinition, byteCode, gas) {
    var abi = JSON.parse(abiDefinition);

    var contract = web3.eth.contract(abi);

    var params = {
        from: web3.eth.coinbase,
        data: byteCode,
        gas: gas
    }

    contract.new(params, function (error, result) {
        if (error) {
            console.log("Contract deployment error");
        }
        else {
            if (result.address) {
                console.log("Contract deployed: " + result.address);
            }
        }
    });
}

export function hashCode(id) {
    var hash = 0, i, chr;
    if (id.length === 0) return hash;
    for (i = 0; i < id.length; i++) {
        chr = id.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; 
    }
    return hash;
}