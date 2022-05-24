const Migrations = artifacts.require("Migrations");
const Certification = artifacts.require("Certification");
const CertificationOwner = artifacts.require("CertificationOwner");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Certification);
  deployer.deploy(CertificationOwner);
};
