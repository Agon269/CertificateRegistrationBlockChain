const Migrations = artifacts.require("Migrations");
const CertificationOwner = artifacts.require("CertificationOwner");
const Cert = artifacts.require("Cert");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(CertificationOwner);
  deployer.deploy(Cert);
};
