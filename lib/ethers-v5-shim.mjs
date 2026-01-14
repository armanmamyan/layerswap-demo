/**
 * Compatibility shim for ethers v5 imports
 * Maps ethers/lib/utils exports to ethers v6 equivalents
 */
import { ethers } from 'ethers';

// isAddress is available as a top-level export in ethers v6
export const isAddress = ethers.isAddress;

// defaultAbiCoder is available via AbiCoder in ethers v6
// Create a singleton instance to match ethers v5 API
export const defaultAbiCoder = ethers.AbiCoder.defaultAbiCoder();
