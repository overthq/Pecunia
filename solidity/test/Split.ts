import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('Split', () => {
  beforeEach(() => {
    // do something
  });

  it('should initialize contract', async () => {
    const Split = await ethers.getContractFactory('Split');
    const [owner, acc1, acc2, acc3] = await ethers.getSigners();

    const deployedSplit = await Split.deploy(
      [owner.address, acc1.address, acc2.address],
      [100, 100, 100],
      '0x0000000000000000000000000000000000000000',
      300,
      acc3.address
    );

    expect(await deployedSplit.splitBalance()).to.eql(ethers.BigNumber.from(0));
    expect(await deployedSplit.splitTarget()).to.eql(
      ethers.BigNumber.from(300)
    );
  });

  it('should refund splits', async () => {
    // do something.
  });
});
