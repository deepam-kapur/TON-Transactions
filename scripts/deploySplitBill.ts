import { toNano } from '@ton/core';
import { SplitBill } from '../wrappers/SplitBill';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const splitBill = provider.open(await SplitBill.fromInit());

    await splitBill.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    console.log('SplitBill Contract Address - ', splitBill.address);

    await provider.waitForDeploy(splitBill.address);
}
