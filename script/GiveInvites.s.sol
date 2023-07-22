// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {Script} from "forge-std/src/Script.sol";
import {WagmiMintExample} from "../src/contracts/WagmiMintExample.sol";
import {OptimistInviter} from "../src/contracts/OptimistInviter.sol";

contract GiveInvites is Script {
    function run() external {
        OptimistInviter optimistInviter = OptimistInviter(0x60c5C9c98bcBd0b0F2fD89B24c16e533BaA8CdA3);
        address[] memory grantees = [0x785120f97aFeeaC6bd90a2C4bc578dfd2AdA3202];

        vm.startBroadcast();
        // Optimism Multisig
        vm.prank(0x60c5C9c98bcBd0b0F2fD89B24c16e533BaA8CdA3);
        optimistInviter.setInviteCounts(grantees, 10);

        vm.stopBroadcast();
    }
}
