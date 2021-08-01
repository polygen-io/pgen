let
 pkgs = import <nixpkgs> {};

 local-test = pkgs.writeShellScriptBin "local-test" ''
 hardhat test --network localhost
 '';

 local-deploy = pkgs.writeShellScriptBin "local-deploy" ''
  hardhat run --network localhost scripts/deploy.ts
 '';

 prettier-check = pkgs.writeShellScriptBin "prettier-check" ''
  prettier --check .
 '';

 prettier-write = pkgs.writeShellScriptBin "prettier-write" ''
  prettier --write .
 '';

 ci-lint = pkgs.writeShellScriptBin "ci-lint" ''
 solhint 'contracts/**/*.sol'
 prettier-check
 '';

 security-check = pkgs.writeShellScriptBin "security-check" ''
 # Workaround a slither bug due to stale compiled artifacts.
 # https://github.com/crytic/slither/issues/860
 rm -rf artifacts
 rm -rf typechain
 rm -rf cache

 # Install slither to a fresh tmp dir to workaround nix-shell immutability.
 export td=$(mktemp -d)
 python3 -m venv ''${td}/venv
 source ''${td}/venv/bin/activate
 pip install slither-analyzer

 # Run slither against all our contracts.
 # Disable npx as nix-shell already handles availability of what we nee.
 # Some contracts are explicitly out of scope for slither:
 # - The balancer configurable-rights-pool git submodule
 # - The test contracts that only exist so the test harness can drive unit tests and will never be deployed
 # - Open Zeppelin contracts
 slither . --npx-disable --filter-paths="contracts/test|openzeppelin" --exclude-dependencies
 '';

 ci-test = pkgs.writeShellScriptBin "ci-test" ''
 hardhat test
 '';
in
pkgs.stdenv.mkDerivation {
 name = "shell";
 buildInputs = [
  pkgs.nodejs-14_x
  pkgs.python3
  local-test
  local-deploy
  prettier-check
  prettier-write
  security-check
  ci-test
  ci-lint
 ];

 shellHook = ''
  export PATH=$( npm bin ):$PATH
  # keep it fresh
  npm install
 '';
}
