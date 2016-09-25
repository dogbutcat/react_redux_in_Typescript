import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
 
declare var Promise: any; // ES6 Promise
 
@suite("mocha typescript")
class Basic {
    
    @only @test("should pass when asserts are fine")
    asserts_pass() {
    }
    
    @only @test("should fail when asserts are broken")
    asserts_fail() {
        // Any self-respecting assertion framework should throw
        var error = new Error("Assert failed");
        (<any>error).expected = "expected";
        (<any>error).actual = "to fail";
        throw error;
    }
    
    @only @test("should pass async tests")
    assert_pass_async(done: Function) {
        setTimeout(() => done(), 1);
    }
    
    @test("should fail async when given error")
    assert_fail_async(done: Function) {
        setTimeout(() => done(new Error("Oops...")), 1);
    }
    
    @test("should fail async when callback not called")
    @timeout(100)
    assert_fail_async_no_callback(done: Function) {
        // Never called... t/o intentional.
    }
    
    @test("should pass when promise resolved")
    promise_pass_resolved() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 1);
        });
    }
    
    @test("should fail when promise rejected")
    promise_fail_rejected() {
        return new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error("Ooopsss...")), 1);
        });
    }
}
 
//   mocha typescript
//     √ should pass when asserts are fine
//     1) should fail when asserts are broken
//     √ should pass async tests
//     2) should fail async when given error
//     3) should fail async when callback not called
//     √ should pass when promise resolved
//     4) should fail when promise rejected
 
@suite class CuteSyntax {
    @test testNamedAsMethod() {
    }
    
    @test "can have non verbose syntax for fancy named tests"() {
    }
    
    @test "and they can be async too"(done) {
        done();
    }
}
 
//   CuteSyntax
//     √ testNamedAsMethod
//     √ can have non verbose syntax for fancy named tests
//     √ and they can be async too
 
@suite class LifeCycle {
    static tokens = 0;
    token: number;
    
    constructor() {
        console.log("     - new LifeCycle");
    }
    
    before() {
        this.token = LifeCycle.tokens++;
        console.log("       - Before each test " + this.token);
    }
    
    after() {
        console.log("       - After each test " + this.token);
    }
 
    static before() {
        console.log("   - Before the suite: " + ++this.tokens);
    }
    
    static after() {
        console.log("   - After the suite" + ++this.tokens);
    }
    
    @test one() {
        console.log("         - Run one: " + this.token);
    }
    @test two() {
        console.log("         - Run two: " + this.token);
    }
}
 
//   LifeCycle
//    - Before the suite: 1
//      - new LifeCycle
//        - Before each test 1
//          - Run one: 1
//     √ one
//        - After each test 1
//      - new LifeCycle
//        - Before each test 2
//          - Run two: 2
//     √ two
//        - After each test 2
//    - After the suite4
 
@suite class PassingAsyncLifeCycle {
 
    constructor() {
    }
 
    before(done) {
        setTimeout(done, 100);
    }
 
    after() {
        return new Promise((resolve, reject) => resolve());
    }
 
    static before() {
        return new Promise((resolve, reject) => resolve());
    }
 
    static after(done) {
        setTimeout(done, 300);
    }
 
    @test one() {
    }
    @test two() {
    }
}
 
//   PassingAsyncLifeCycle
//     √ one
//     √ two
 
@suite class Times {
    @test @slow(10) "when fast is normal"(done) {
        setTimeout(done, 0);
    }
    @test @slow(15) "when average is yellow-ish"(done) {
        setTimeout(done, 10);
    }
    @test @slow(15) "when slow is red-ish"(done) {
        setTimeout(done, 20);
    }
    @test @timeout(10) "when faster than timeout passes"(done) {
        setTimeout(done, 0);
    }
    @test @timeout(10) "when slower than timeout fails"(done) {
        setTimeout(done, 20);
    }
}
 
//   Times
//     √ when fast is normal
//     √ when average is yellow-ish (10ms)
//     √ when slow is red-ish (20ms)
//     √ when faster than timeout passes
//     5) when slower than timeout fails
 
@suite class ExecutionControl {
    @skip @test "this won't run"() {
    }
    
    @only @test "this however will"() {
    }
    
    // @only
    @test "add @only to run just this test"() {
    }
}
 
//   ExecutionControl
//     - this won't run
//     √ this however will
//     √ add @only to run just this test
 
class ServerTests {
    connect() {
        console.log("      connect(" + ServerTests.connection + ")");
    }
    disconnect() {
        console.log("      disconnect(" + ServerTests.connection + ")");
    }
    
    static connection: string;
    static connectionId: number = 0;
 
    static before() {
        ServerTests.connection = "shader connection " + ++ServerTests.connectionId;
        console.log("    boot up server.");
    }
 
    static after() {
        ServerTests.connection = undefined;
        console.log("    tear down server.");
    }
}
 
@suite class MobileClient extends ServerTests {
    @test "client can connect"() { this.connect(); }
    @test "client can disconnect"() { this.disconnect(); }
}
 
@suite class WebClient extends ServerTests {
    @test "web can connect"() { this.connect(); }
    @test "web can disconnect"() { this.disconnect(); }
}
 
//   MobileClient
//   boot up server.
//     connect(shader connection 1)
//     √ client can connect
//     disconnect(shader connection 1)
//     √ client can disconnect
//   tear down server.
 
//   WebClient
//   boot up server.
//     connect(shader connection 2)
//     √ web can connect
//     disconnect(shader connection 2)
//     √ web can disconnect
//   tear down server.
 
// Nested suites
declare var describe, it;
describe("outer suite", () => {
    @suite class TestClass {
        @test method() {
        }
    }
});
 
//   outer suite
//     TestClass
//       ✓ method
 
//   19 passing (219ms)
//   1 pending
//   5 failing