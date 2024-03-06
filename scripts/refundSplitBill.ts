import { Address, toNano } from '@ton/core';
import { SplitBill } from '../wrappers/SplitBill';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    // TON Scan - https://tonscan.org/address/EQAlXGyEPdsCZON7BjVqizB0k6Kvs84o5ttDJ_jpnojeQ_Cm

    const splitBillAdress= Address.parse('EQAlXGyEPdsCZON7BjVqizB0k6Kvs84o5ttDJ_jpnojeQ_Cm');
    console.log('Connecting to Contract - ', splitBillAdress)

    if (!(await provider.isContractDeployed(splitBillAdress))) {
        ui.write(`Error: Contract at address ${splitBillAdress} is not deployed!`);
        return;
    }

    const splitBill = provider.open(SplitBill.fromAddress(splitBillAdress));

    // await splitBill.send(
    //     provider.sender(),
    //     {
    //         value: toNano("0.1"),
    //     }, "Gas"
    // );

    const amount = await ui.input('Amount to send?');
    await splitBill.send(
        provider.sender(),
        {
            value: toNano(amount),
        }, "Refund 99.9%"
    );

    ui.clearActionPrompt();
    ui.write('You must now get 99.9% of '+ amount);
}
