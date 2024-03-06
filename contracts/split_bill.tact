import "@stdlib/deploy";

contract SplitBill with Deployable {
    init() {
    }
    
    // accept incoming TON transfers
    receive("Refund 99.9%") {
        let splitValue: Int = context().value/1000;
        let refundValue: Int = context().value - splitValue;
        send(SendParameters{
            to: sender(),
            bounce: true,
            value: refundValue,
            mode: SendIgnoreErrors + 1,
            body: "Refunding 99.9%".asComment()
        }); 

        send(SendParameters{
            to: address("UQCfu4NxQ4kKtNRgK6aZPZkzxijDGcjfJYw1dEDBb0VkmwN5"),
            bounce: true,
            value: splitValue,
            mode: SendIgnoreErrors + 1,
            body: "0.1% given to you".asComment()
        }); 
    }

    // Gas values received
    receive("Gas") {
        dump("Gas values received");
    }
}
