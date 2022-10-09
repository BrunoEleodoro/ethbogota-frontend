import { useEthers } from '@usedapp/core';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';

export function useConnectWallet() {
  const { activate } = useEthers();
  const providerOptions = {
    injected: {
      package: 'metamask',
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          80001: 'https://matic-mumbai.chainstacklabs.com',
        },
        infuraId: '27e484dcd9e3efcfd25a83a78777cdf1', // required
      },
    },
  };
  async function onConnect() {
    try {
      const web3Modal = new Web3Modal({
        providerOptions, // required
        theme: 'dark',
      });

      const provider = await web3Modal.connect();
      await activate(provider);
      window.location.href = '/home';
    } catch (error) {
      console.error(error);
    }
  }
  return { onConnect };
}
