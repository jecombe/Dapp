pragma solidity ^0.4.0;

contract  Message {

    address public owner;
    string public s;
    uint public price = 0;

    constructor (string _s) public {
            owner = msg.sender;
            s = _s;
}

    function set_message (string _mess) public payable {
        require (msg.value > price);
        s = _mess;
        price  = msg.value;
        owner = msg.sender;
}

    function get_message_and_price () public view returns (string, uint) {
        return (s, price);
    }
}
