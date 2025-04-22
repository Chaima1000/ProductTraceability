const ProductTraceability = artifacts.require("ProductTraceability");

contract("ProductTraceability", (accounts) => {
    let instance;
    const [owner, actor1, actor2, customer] = accounts;

    beforeEach(async () => {
        instance = await ProductTraceability.new();
        await instance.authorizeActor(actor1, { from: owner });
    });

    it("should create a new product", async () => {
        await instance.addStep(0, "Initial production", "2023-01-01", { from: actor1 });
        const history = await instance.getHistory(1);
        assert.equal(history.length, 1);
    });

    it("should prevent unauthorized actors from adding steps", async () => {
        try {
            await instance.addStep(1, "Unauthorized step", "2023-01-02", { from: actor2 });
            assert.fail("Should have thrown error");
        } catch (error) {
            assert.include(error.message, "Not authorized");
        }
    });

    it("should retrieve complete history", async () => {
        await instance.addStep(0, "Step 1", "2023-01-01", { from: actor1 });
        await instance.addStep(1, "Step 2", "2023-01-02", { from: actor1 });
        const history = await instance.getHistory(1);
        assert.equal(history.length, 2);
    });
});