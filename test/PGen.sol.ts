import chai from "chai";
import { solidity } from "ethereum-waffle";
import type { PGen } from '../typechain/PGen';
import { ethers } from "hardhat";

chai.use(solidity)
const { expect, assert } = chai

describe("PGen", async function () {
    it("should have 18 decimals", async () => {
        const pgenFactory = await ethers.getContractFactory('PGen')
        const pgen = await pgenFactory.deploy() as PGen
        await pgen.deployed()

        const decimals = await pgen.decimals()
        const expected = 18
        assert(
            decimals === expected,
            `wrong decimals ${decimals} expected ${expected}`
        )
    })

    it("should have correct name and symbol", async function () {
        const pgenFactory = await ethers.getContractFactory('PGen')
        const pgen = await pgenFactory.deploy() as PGen
        await pgen.deployed()

        const name = await pgen.name()
        const expectedName = "Polygen"
        assert(
            name === expectedName,
            `wrong name ${name} expected ${expectedName}`
        )

        const symbol = await pgen.symbol()
        const expectedSymbol = "PGEN"
        assert(
            symbol === expectedSymbol,
            `wrong symbol ${symbol} expected ${expectedSymbol}`
        )
    })

    it("should have 1 billion supply", async function () {
        const signers = await ethers.getSigners();
        const pgenFactory = await ethers.getContractFactory('PGen')
        const pgen = await pgenFactory.deploy() as PGen
        await pgen.deployed()

        const supply = await pgen.totalSupply()
        const expectedSupply = ethers.BigNumber.from('1000000000000000000000000000')
        assert(
            supply.eq(expectedSupply),
            `wrong supply ${supply} expected ${expectedSupply}`
        )

        const ownedByDeployer = await pgen.balanceOf(signers[0].address)
        const ownedByAnon = await pgen.balanceOf(signers[1].address)
        assert(
            ownedByDeployer.eq(supply),
            `wrong ownedByDeployer ${ownedByDeployer} expected ${expectedSupply}`,
        )
        assert(
            ownedByAnon.eq(0),
            `wrong ownedByAnon ${ownedByAnon} expected 0`,
        )
    })
})