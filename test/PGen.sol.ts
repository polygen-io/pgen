import chai from "chai";
import { solidity } from "ethereum-waffle";
import type { PGen } from "../typechain/PGen";
import { ethers } from "hardhat";

chai.use(solidity);
const { expect, assert } = chai;

describe("PGen", async function () {
  it("should have 18 decimals", async () => {
    const signers = await ethers.getSigners();

    const alice = signers[0]

    const pgenFactory = await ethers.getContractFactory("PGen");
    const pgen = (await pgenFactory.deploy(alice.address)) as PGen;
    await pgen.deployed();

    const decimals = await pgen.decimals();
    const expected = 18;
    assert(
      decimals === expected,
      `wrong decimals ${decimals} expected ${expected}`
    );
  });

  it("should have correct name and symbol", async function () {
    const signers = await ethers.getSigners();

    const alice = signers[0]

    const pgenFactory = await ethers.getContractFactory("PGen");
    const pgen = (await pgenFactory.deploy(alice.address)) as PGen;
    await pgen.deployed();

    const name = await pgen.name();
    const expectedName = "Polygen";
    assert(
      name === expectedName,
      `wrong name ${name} expected ${expectedName}`
    );

    const symbol = await pgen.symbol();
    const expectedSymbol = "PGEN";
    assert(
      symbol === expectedSymbol,
      `wrong symbol ${symbol} expected ${expectedSymbol}`
    );
  });

  it("should have 1 billion supply", async function () {
    const signers = await ethers.getSigners();

    const alice = signers[0]
    const bob = signers[1]
    const carol = signers[2]

    const pgenFactory = await ethers.getContractFactory("PGen");
    const pgen = (await pgenFactory.deploy(bob.address)) as PGen;
    await pgen.deployed();

    const supply = await pgen.totalSupply();
    const expectedSupply = ethers.BigNumber.from(
      "1000000000000000000000000000"
    );
    assert(
      supply.eq(expectedSupply),
      `wrong supply ${supply} expected ${expectedSupply}`
    );

    const ownedByDeployer = await pgen.balanceOf(alice.address);
    const ownedByDistributor = await pgen.balanceOf(bob.address)
    const ownedByAnon = await pgen.balanceOf(carol.address);
    assert(
      ownedByDeployer.eq(0),
      `wrong ownedByDeployer ${ownedByDeployer} expected 0`
    );
    assert(
      ownedByDistributor.eq(expectedSupply),
      `wrong ownedByDistributor ${ownedByDistributor} expected ${expectedSupply}`
    )
    assert(ownedByAnon.eq(0), `wrong ownedByAnon ${ownedByAnon} expected 0`);
  });
});
