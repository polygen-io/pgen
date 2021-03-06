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

## Risk mitigation

### Audits

Audits can be found in the `audits` folder.

### Unit tests

All functionality is unit tested. The tests are in the `test` folder.

If some functionality or potential exploit is missing a test this is a bug and so an issue and/or PR should be raised.
