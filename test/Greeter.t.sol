// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import { Greeter } from "src/Greeter.sol";

contract GreeterTest is Test {
	Greeter public greeter;

	function setUp() public {
		greeter = new Greeter("hi");
	}

	function testGreet() public {
		assertEq(greeter.greet(), "hi");
	}
}
