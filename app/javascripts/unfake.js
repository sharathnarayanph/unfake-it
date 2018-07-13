import * as helper from "./helper.js";
//import newsFeedABI from "../res/newsFeed.js";
//import postFeedABI from "../res/newsFeed.js";
import $ from "jquery";

export function initApp() {
    displayFeed();

    //Setup account number
    if (web3 == undefined || !web3.eth.accounts.length) {
        $("#acctName").val("Please enable Metamask");
    }
    else {
        $("#acctName").val(web3.eth.coinbase);
    }
}

export function postNews() {
    var tag = new Array($("#tagName").value);
    var news = new Array($("#newsContent").value);
    var author = new Array($("#newsAuth").value);
    var id = new Array(helper.hashCode(web3.eth.coinbase + new Date().toLocaleString()));
    var dVotes = new Array("0");
    var uVotes = new Array("0");
    var bloom = new Array("0");

    var instance = createNewsFeedInstance();
    var estimatedGas = 6654755;

    var txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
    }

    instance.addNews.sendTransaction(id, dVotes, uVotes, author, bloom, news,
        tag, 1, txnObject, function (error, result) {
            if (!error) {
                console.warn(result);
            }
            else {
                console.log("Error");
            }
        });

    generateNewsFeed();
}

export function voteUp(el, postId) {
    el.firstElementChild.textContent++;

    var instance = createNewsFeedInstance();
    var estimatedGas = 6654755;

    var txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
    }

    instance.voteUp.sendTransaction(postId, el.firstElementChild.textContent,
         function (error, result) {
            if (!error) {
                console.warn(result);
            }
            else {
                console.log("Error");
            }
        });
}

export function votePostUp(el, address) {
    el.firstElementChild.textContent++;

    var txnObject = {
        from: web3.eth.coinbase,
        to: address,
        value: web3.toWei(0.05,'ether')
    }

    web3.eth.sendTransaction(txnObject, function(error, result) {
        if(!error) {
            console.warn('Thank you for your contribution');
        }
        else {
            console.log('Error');
        }
    });
}

export function voteDown(el, postId) {
    el.firstElementChild.textContent++;

    var instance = createNewsFeedInstance();
    var estimatedGas = 6654755;

    var txnObject = {
        from: web3.eth.coinbase,
        gas: estimatedGas
    }

    instance.voteDown.sendTransaction(postId, el.firstElementChild.textContent,
         function (error, result) {
            if (!error) {
                console.warn(result);
            }
            else {
                console.log("Error");
            }
        });
}

export function generatePost(el, postId) {
    $("#newsFeed").hide();
    $("#addNews").hide();
    $("#postFeed").show();
    
    var instance = createPostFeedInstance();

    instance.getFeed.call(postId, function (error, result) {
        if (!error) {
            renderPostFeed(result);
        }
        else {
            console.log("Error");
        }
    });
}

export function displayFeed() {
    $("#postFeed").hide();
    $("#newsFeed").show();
    $("#addNews").hide();
}

export function displayAddNews() {
    $("#postFeed").hide();
    $("#newsFeed").hide();
    $("#addNews").show();
}

function createNewsFeedInstance() {
    return helper.createContractInstance(JSON.stringify(newsFeedABI.abi), newsFeedABI.address);
}

function createPostFeedInstance() {
    return helper.createContractInstance(JSON.stringify(postFeedABI.abi), postFeedABI.address);
}

function generateNewsFeed(dVotes, posts, authors, upvotes, length) {
    displayFeed();

    var instance = createNewsFeedInstance();

    instance.getFeed.call(function (error, result) {
        if (!error) {
            renderNewsFeed(result);
        }
        else {
            console.log("Error");
        }
    });
}

function renderNewsFeed(result) {
    length = web3.toDecimal(web3.toHex(result[7]));

    var regEx = /[0]+$/;
    var content;

    //Remove extra 0s while converting back from bytes32
    for (var i = 0; i < length; i++) {
        for(var j = 0; j < 7; j++) {
            result[j][i] = web3.toAscii(result[j][i].replace(regEx, ""));
        }
    }

    for (var i =0; i < length; i++) {
        content += "<td class=\"minus\">";
        content += "<a href=\"#\" onclick=\"App.voteDown(this" + i + ")\" class=\"icon fa-minus-square\">";
        content += "<span>" + result[1][i] + "</span>";
        content += "</a></td>";
        content += "<td>" + result[5][i] + "</td>";
        content += "<td><a onclick=\"App.renderPost(this)\">" + result[6][i] + "</a></td>";
        content += "<td>" + result[3][i] + "</td>";
        content += "<td class=\"plus\">";
        content += "<a href=\"#\" onclick=\"App.voteUp(this" + i + ")\" class=\"icon fa-minus-square\">";
        content += "<span>" + result[2][i] + "</span>";
        content += "</a></td>";

        if(i == 0) {
            $('#newsFeedTbl tbody').append(content);
        }
        else {
            $('#newsFeedTbl tr:last').after(content);
        }
    }
}

function renderPostFeed(result) {
    length = web3.toDecimal(web3.toHex(result[7]));

    var regEx = /[0]+$/;
    var content;

    //Remove extra 0s while converting back from bytes32
    for (var i = 0; i < length; i++) {
        for(var j = 0; j < 7; j++) {
            result[j][i] = web3.toAscii(result[j][i].replace(regEx, ""));
        }
    }

    for (var i =0; i < length; i++) {
        content += "<td class=\"minus\">";
        content += "<a href=\"#\" onclick=\"App.voteDown(this, " + i + 
            ")\" class=\"icon fa-minus-square\">";
        content += "<span>" + result[2][i] + "</span>";
        content += "</a></td>";
        content += "<td>" + result[6][i] + "</td>";
        content += "<td>" + result[3][i] + "</td>";
        content += "<td class=\"plus\">";
        content += "<a href=\"#\" onclick=\"App.voteUp(this, " + i + "," + 
            result[4][i] + ")\" class=\"icon fa-minus-square\">";
        content += "<span>" + result[1][i] + "</span>";
        content += "</a></td>";

        if(i == 0) {
            $('#postFeedTbl tbody').append(content);
        }
        else {
            $('#postFeedTbl tr:last').after(content);
        }
    }
}