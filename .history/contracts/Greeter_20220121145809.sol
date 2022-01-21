//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        //public meaning can be viewed outside of smart contract
        //view means that the function can be called without any permissions
        //and that we are not writing anything to the blockchain

        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
        //update the greeting to what is passed in from deploy func (hellow hardhat)
        //will need to pay some gas to do this
    }
}
