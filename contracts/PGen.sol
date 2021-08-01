// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PGen is ERC20 {
    constructor() ERC20("Polygen", "PGEN") { _mint(msg.sender, 10 ** (9 + 18)); }
}