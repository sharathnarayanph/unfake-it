pragma solidity ^0.4.2;

contract NewsFeed {
    struct Feed {
        bytes32[] ids;
        bytes32[] dVotes;
        bytes32[] uVotes;
        bytes32[] authors;
        bytes32[] bloomFilters;
        uint count;
    }

    Feed private newsFeed;

    //For saving the news feed. Max limit of 1000 set accd to Solidity constraints
    function saveFeed(bytes32[1000] ids, bytes32[1000] dVotes, 
                      bytes32[1000] uVotes, bytes32[1000] authors,
                      bytes32[1000] blooms, uint count)
    public
    returns (bool) {
        //Save the input in the Feed state
        newsFeed.count = count;

        for(uint i = 0; i < count; i++) {
            newsFeed.ids.push(ids[i]);
            newsFeed.dVotes.push(dVotes[i]);
            newsFeed.uVotes.push(uVotes[i]);
            newsFeed.authors.push(authors[i]);
            newsFeed.bloomFilters.push(blooms[i]);
        }

        return true;
    }

    //For retrieving the news feed. Max limit of 1000 set accd to Solidity constraints
    function getFeed()
    public
    payable
    returns(bytes32[1000] ids, bytes32[1000] dVotes, 
            bytes32[1000] uVotes, bytes32[1000] authors,
            bytes32[1000] blooms, uint count) {
        count = newsFeed.count;

        for(uint i = 0; i < count; i++) {
            ids[i] = newsFeed.ids[i];
            dVotes[i] = newsFeed.dVotes[i];
            uVotes[i] = newsFeed.uVotes[i];
            authors[i] = newsFeed.authors[i];
            blooms[i] = newsFeed.bloomFilters[i];
        }
    }

    //For upvoting the news post
    function voteUp(uint postPos, bytes32 newVal)
    public
    payable
    returns(bytes32) {
        require(newsFeed.count != 0X0);

        newsFeed.uVotes[postPos] = newVal;

        return newVal;
    }

    //For downvoting the news post
    function voteDown(uint postPos, bytes32 newVal)
    public
    payable
    returns(bytes32) {
        require(newsFeed.count != 0X0);

        newsFeed.dVotes[postPos] = newVal;

        return newVal;
    }
}