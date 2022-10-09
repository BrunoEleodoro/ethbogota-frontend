import { ethers } from 'ethers';
import { Interface } from 'ethers/lib/utils';
import { getEmitHelpers } from 'typescript';
import {
  LensHubProxyAddress,
  MockProfileCreationProxyAddress,
  ProfileFollowModuleAddress,
} from './constants';
import { providerPolygonMumbai } from './providers';
import MockeProfileCreatingProxyABI from '../assets/abis/MockProfileCreationProxy.json';
import LensHubProxy from '../assets/abis/LensHubProxy.json';
import ProfileFollowModule from '../assets/abis/ProfileFollowModule.json';

//MockProfileCreationProxy 0x420f0257D43145bb002E69B14FF2Eb9630Fc4736
//LensHubProxy 0x60Ae865ee4C725cd04353b5AAb364553f56ceF82
export const MockProfileCreationProxyContract = new ethers.Contract(
  MockProfileCreationProxyAddress,
  new Interface(MockeProfileCreatingProxyABI),
  providerPolygonMumbai
);

export const LensHubProxyContract = new ethers.Contract(
  LensHubProxyAddress,
  new Interface(LensHubProxy),
  providerPolygonMumbai
);

export const ProfileFollowModuleContract = new ethers.Contract(
  ProfileFollowModuleAddress,
  new Interface(ProfileFollowModule),
  providerPolygonMumbai
);
