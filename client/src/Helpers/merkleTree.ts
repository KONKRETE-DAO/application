<<<<<<< HEAD
import { ethers } from "ethers";
import { whitelist } from "./whitelist";
import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs";
=======
import { ethers } from 'ethers';

import { MerkleTree } from 'merkletreejs';

import { whitelist } from './whitelist';
import keccak256 from 'keccak256';
>>>>>>> origin/web3-marico

export function getProofs(address: string) {
  const leaves = whitelist.map(keccak256);
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  return tree.getHexProof(ethers.utils.keccak256(address.toString()));
}

export function getRoot() {
  const leaves = whitelist.map(keccak256);
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

  return tree.getRoot();
}
