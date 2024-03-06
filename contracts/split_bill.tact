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
    }
}
