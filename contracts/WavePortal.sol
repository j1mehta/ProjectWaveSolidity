// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    //This is a state variable thats
    //automatically initialized to 0 and 
    //is stored permanently in contract storage
    uint256 totalWaves;

    constructor() {
        console.log("Smart contract constructor");
    }

    //Decalred as public so its available to be run through
    //run.js
    function wave() public {
        totalWaves += 1;
        //msg.sender: wallet address of the person who called the function
        console.log("%s waved at you!", msg.sender);
    }


    //View fn that doesn't change the state of any variable
    function getTotalWaves() public view returns (uint256) {
        console.log("Current total waves: %d !!", totalWaves);
        return totalWaves;
    }
}