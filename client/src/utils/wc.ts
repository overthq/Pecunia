import WalletConnect from '@walletconnect/client';

export const connector = new WalletConnect({
  uri: 'wc:8a5e5bdc-a0e4-47...TJRNmhWJmoxdFo6UDk2WlhaOyQ5N0U=',
  clientMeta: {
    description: 'Pecunia mobile app',
    url: 'https://github.com/overthq/Pecunia',
    icons: ['https://walletconnect.org/walletconnect-logo.png'],
    name: 'Pecunia'
  }
});
