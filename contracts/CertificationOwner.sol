// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract CertificationOwner {
        string name = "cert name";
        uint  level = 3;
        address owner;
        string awardee;
        string awarder;
        string desc;
        string remark;
        constructor()  {
            owner = msg.sender;
        }
        modifier onlyOwner(){
            require(msg.sender == owner,"Only creater can update contract");
            _;
        }
}
contract Cert is CertificationOwner {

    struct Holder{
        string name;
        uint level;
        string awarder;
        string awardee;
        string desc;
        string remark;
        address owner;
    }

    struct Owner {
        string[] ids;
    }

    mapping (string => Holder) holders;
    mapping (address => Owner) owners;


    address[] public holderAccts;

      event HolderInfo(
            string name,
            uint level,
            string desc,
            string awardee,
            string awarder,
            string remark,
            address owner
        );

    modifier checkLevel(uint _level){  
            require( _level <=3,"You input a wrong level.");
            _;
        }


    modifier checkId (string memory _id){
        require(holders[_id].level == 0  );
        _;
    }

            function setHolder(string memory _id,address _owner, string memory _name, uint _level,  string memory _desc, string memory _awardee, string memory _awarder, string memory _remark) checkLevel(_level) checkId(_id) public{
            holders[_id].name = _name;
            holders[_id].level = _level;
            holders[_id].desc = _desc;
            holders[_id].awardee = _awardee;
            holders[_id].awarder = _awarder;
            holders[_id].remark = _remark;
            holders[_id].owner = _owner;
            holderAccts.push(_owner);
            owners[_owner].ids.push(_id);
            emit HolderInfo(_name,_level,_desc, _awarder, _awardee, _remark,_owner);
        }

        function getHolders()view public returns(address[] memory){
            return holderAccts;
        }
        function getCertificate (string memory _id) view public returns(string memory, uint256,string memory,string memory,string memory,string memory){
        return (
            holders[_id].name,  
            holders[_id].level,
            holders[_id].desc,
            holders[_id].awardee,
            holders[_id].awarder,
            holders[_id].remark
        );
        }

        function coutnHolders()view public returns(uint)
        {
            return holderAccts.length;
        }
        function getUserCerts (address _address) view public returns(string[] memory){
                return owners[_address].ids;
        }

}