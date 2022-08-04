const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Simple Storage Contract", function () {
  let simpleStorageFactory, simpleStorage;
  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorageFactory.deploy();
  });

  it("Should start with a favorite number of 0 ", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";

    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should update when we call store", async function () {
    const expectedValue = "7";

    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should work correctly wit the people struct and array", async function () {
    const expectedName = "Okan";
    const expectedNumber = "8";
    const transactionResponse = await simpleStorage.addPerson("Okan", "8");
    await transactionResponse.wait(1);

    const { favoriteNumber, name } = await simpleStorage.people(0);
    const expectedMapNumber = await simpleStorage.nameToFavoriteNumber("Okan");

    assert.equal(name, expectedName);
    assert.equal(favoriteNumber, expectedNumber);
    assert.equal(expectedNumber, expectedMapNumber);
  });
});
