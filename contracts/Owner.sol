// SPDX-License-Identifier: MIT
// pragma solidity >=0.7.0 <0.9.0;
pragma solidity >=0.4.22 <0.9.0;

contract CertificationOwner {
    string name = "cert name";
    uint256 level = 3;
    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only creater can update contract");
        _;
    }
}

contract Certificate is CertificationOwner {
    struct Holder {
        string name;
        uint256 level;
    }

    mapping(address => Holder) holders;
    address[] public holderAccts;

    event HolderInfo(string name, uint256 level);

    modifier checkLevel(uint256 _level) {
        require(_level <= 3, "You input a wrong level.");
        _;
    }

    function setHolder(
        address _address,
        string memory _name,
        uint256 _level
    ) public onlyOwner checkLevel(_level) {
        holders[_address].name = _name;
        holders[_address].level = _level;
        holderAccts.push(_address);
        emit HolderInfo(_name, _level);
    }

    function getHolders() public view returns (address[] memory) {
        return holderAccts;
    }

    function getHolder(address _address)
        public
        view
        returns (string memory, uint256)
    {
        return (holders[_address].name, holders[_address].level);
    }

    function coutnHolders() public view returns (uint256) {
        return holderAccts.length;
    }
}
