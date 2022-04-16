// SPDX-License-Identifier: MIT
// pragma solidity >=0.7.0 <0.9.0;
pragma solidity >=0.4.22 <0.9.0;

contract Certification {
    string name = "cert name";
    uint256 level = 3;
    address owner;

    constructor() {
        owner = msg.sender;
    }

    //release event when a  function is complete
    event Certificate(string name, uint256 level);

    modifier checkLevel(uint256 _level) {
        require(_level <= 3, "You input a wrong level.");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only creater can update contract");
        _;
    }

    function setCertificate(string memory _name, uint256 _level)
        public
        checkLevel(_level)
        onlyOwner
    {
        name = _name;
        level = _level;
        emit Certificate(_name, _level);
    }

    function getCertificate() public view returns (string memory, uint256) {
        return (name, level);
    }
}
