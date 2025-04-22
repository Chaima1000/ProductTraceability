// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductTraceability {

    address public owner;
    uint public productCount = 0;

    constructor() {
        owner = msg.sender;
    }

    struct Step {
        string description;
        string date;
        address actor;
    }

    mapping(uint => Step[]) private productSteps;
    mapping(address => bool) public authorizedActors;

    event ActorAuthorized(address actor);
    event StepAdded(uint productId, string description, string date, address actor);

    function authorizeActor(address _actor) public {
        require(msg.sender == owner, "Only owner can authorize actors.");
        authorizedActors[_actor] = true;
        emit ActorAuthorized(_actor);
    }

    function addStep(uint _productId, string memory _description, string memory _date) public {
        require(authorizedActors[msg.sender], "You are not authorized to add steps.");
        productSteps[_productId].push(Step(_description, _date, msg.sender));
        emit StepAdded(_productId, _description, _date, msg.sender);
    }

    function getHistory(uint _productId) public view returns (Step[] memory) {
        return productSteps[_productId];
    }
}
