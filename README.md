# Polygen ERC20 Token

ERC20 contract for Polygen token.

Uses standard Open Zeppelin `ERC20` version `4.x`.

## How it works

1 Billion units are minted for the `distributor` address upon construction.

No other minting or burning is possible.

## Development setup

### Nix Shell

Install the nix shell if you haven't already.

```
curl -L https://nixos.org/nix/install | sh
```

Drop into a nix-shell.

```
cd pgen
nix-shell
```

### Run tests

From _outside_ the nix-shell run:

```
nix-shell --run 'hardhat test'
```

Inside the nix-shell you can just run `hardhat test` as normal.

### Run security check

Inside the nix-shell run `security-check`.

__IMPORTANT: `security-check` applies and removes several patches to pgen to get slither compiling__

If you cancel the security check before it is finished your repository may be left in a dirty state.

## Risk mitigation

### Audits

Audits can be found in the `audits` folder.

### Gas optimisations

Hardhat is configured to leverage the solidity compiler optimizer and report on gas usage for all test runs.

In general, clarity and reuse of existing standard functionality, such as Open Zeppelin RBAC access controls, is preferred over micro-optimisation of gas costs.

For many desirable use-cases, such as small independent artists or rural communities, the gas costs on ethereum mainnet will ALWAYS be unaffordable no matter how much we optimise these contracts.

The intent is to keep a reasonable balance between cost and clarity then deploy the contracts to L2 solutions such as Polygon where the baseline gas cost is several orders of magnitude cheaper.

### Unit tests

All functionality is unit tested. The tests are in the `test` folder.

If some functionality or potential exploit is missing a test this is a bug and so an issue and/or PR should be raised.
