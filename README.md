# unfake-it
A blockchain based solution for controlling fake news

The primary focus of this tool is to control fake news by providing the users the right to vote on each news post. People all over the world having coinbase accounts in ethereum blockchain can cast a single vote on each post just by giving a single click. The user can either upvote or downvote a post by clicking the corresponding button. Users can provide sources / evidences for a post and can earn ethers (.05 ether donation from each user who likes the evidence)

There are two main screens,

1. News Feed - A consolidated list of all the news from all over the world. This is the primary screen and users can either upvote or downvote a post.

2. Post Feed - A list of evidences/sources submitted by users of blockchain to substantiate a news post. Each news post can have a list of evidences submitted by various users and the voting concept applies to these posts too.
               Incentives are given to users who submit such evidences, by clikcing the upvote button. Users who like the evidence submitted can give an upvote and transfer .05 ether to the user who created the evidence. This makes sure a lot of participation occurs in the community.
                Bloom filters are implemented to efficiently calculate whether a user with a particual ethereum account has already cast a vote. 
               
Color Code: A red highlight indicates that the news is probably fake and a green highlight indicates that the news is probable true. The color code is decided based on the number of upvotes and downvotes for each news post and the number of upvotes and downvotes for each evidence provided
   
   ![screenshot from 2018-07-14 10-28-15](https://user-images.githubusercontent.com/16179366/42721272-a9866fc6-8755-11e8-9072-67aff969a437.png)
   
Smart Contracts:

1. NewsFeed - This smart contract holds all the information(upvotes, downvotes, authors, bloom filters etc.) pertaining to the news post
2. PostFeed - This smart contract holds all the information pertaining to the evidence posts for each news post

Please follow the manual below to setup and deploy the contracts required for carrying out the necessary operations. This app can also be used with the test networks like Ropsten / Rinkerby for development purposes. Please configure the truffle.js file for setting up the app to work with your own private block chain network.

Tools & Frameworks:

    Truffle - For building smart contracts
    Ganache - For running local ethereum blockchain
    Metamask - For connecting to ethereum apps from browser
    
Setup:

    1.Clone the repository to your local folder
    2. Run npm install
    3. Install Ganache (http://truffleframework.com/ganache/)
    4. In terminal, type truffle develop
    5. Run compile-all (To compile smart contracts)
    6. Run migrate --reset --network development (For deploying smart contracts)
    7. Open http://localhost:8080/ to start using the app (Wallet coinbase acct used as user address)

