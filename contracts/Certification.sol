// SPDX-License-Identifier: MIT
// pragma solidity >=0.7.0 <0.9.0;
pragma solidity >=0.4.22 <0.9.0;

contract Certification {
    string name = "cert name";
    uint256 level = 3;
    address owner;
    string awarder;
    string awardee;
    string desc;
    string remark;

    constructor() {
        owner = msg.sender;
    }

    //release event when a  function is complete
    event Certificate(
        string name,
        uint256 level,
        string desc,
        string awarder,
        string awardee,
        string remark
    );

    modifier checkLevel(uint256 _level) {
        require(_level <= 3, "You input a wrong level.");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only creater can update contract");
        _;
    }

    function setCertificate(
        string memory _name,
        string memory _desc,
        string memory _awardee,
        string memory _awarder,
        string memory _remark,
        uint256 _level
    ) public checkLevel(_level) onlyOwner {
        name = _name;
        level = _level;
        desc = _desc;
        awarder = _awarder;
        awardee = _awardee;
        remark = _remark;
        emit Certificate(_name, _level, _desc, _awarder, _awardee, _remark);
    }

    function getCertificate()
        public
        view
        returns (
            string memory,
            uint256,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        return (name, level, desc, awardee, awarder, remark);
    }
}
