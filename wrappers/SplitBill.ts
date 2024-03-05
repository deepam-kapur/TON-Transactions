import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type SplitBillConfig = {};

export function splitBillConfigToCell(config: SplitBillConfig): Cell {
    return beginCell().endCell();
}

export class SplitBill implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new SplitBill(address);
    }

    static createFromConfig(config: SplitBillConfig, code: Cell, workchain = 0) {
        const data = splitBillConfigToCell(config);
        const init = { code, data };
        return new SplitBill(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
