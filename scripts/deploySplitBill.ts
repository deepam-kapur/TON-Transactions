import { toNano } from '@ton/core';
import { SplitBill } from '../wrappers/SplitBill';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const splitBill = provider.open(SplitBill.createFromConfig({}, await compile('SplitBill')));

    await splitBill.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(splitBill.address);

    // run methods on `splitBill`
}
