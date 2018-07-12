import $ from "jquery";

export function initApp() {
    $("#postFeed").hide();
}

export function vote(el) {
    el.firstElementChild.textContent++;
}

export function renderPost(el) {
    $("#newsFeed").hide();
    $("#postFeed").show();
    $("#postData").text("Supporting information listed");
    $("#postAuthor").text("jfakesupptr"); 
}

function generateFeed(dVotes, posts, authors, upvotes, length) {
    
}