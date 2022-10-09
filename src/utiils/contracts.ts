import { ethers } from 'ethers';
import { Interface } from 'ethers/lib/utils';
import { getEmitHelpers } from 'typescript';
import { MockProfileCreationProxyAddress } from './constants';
import { providerPolygonMumbai } from './providers';
import MockeProfileCreatingProxyABI from '../assets/abis/MockProfileCreationProxy.json';

//MockProfileCreationProxy 0x420f0257D43145bb002E69B14FF2Eb9630Fc4736
export const MockProfileCreationProxyContract = new ethers.Contract(
  MockProfileCreationProxyAddress,
  new Interface(MockeProfileCreatingProxyABI),
  providerPolygonMumbai
);
