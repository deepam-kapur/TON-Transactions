import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { SplitBill } from '../wrappers/SplitBill';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('SplitBill', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('SplitBill');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let splitBill: SandboxContract<SplitBill>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        splitBill = blockchain.openContract(SplitBill.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await splitBill.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: splitBill.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and splitBill are ready to use
    });
});
