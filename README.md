# Pecunia

Pecunia is an app that focuses on making crypto more accessible to everyday users.

## Motivation and Goals

Currently, the adoption of crypto is hindered by the technical barrier-to-entry. Most wallets create a new paradigm, that appeals only to users who have some knowledge about the inner workings of the underlying technology. Pecunia's aim is to have a simple user experience, that's also as similar to existing mobile banking applications as possible.

In the future, Pecunia hopes to take this goal further by allowing users to perform contactless payments.

## Architecture & Design

Pecunia connects to your existing wallets using [WalletConnect](https://walletconnect.org), and enables you to carry out actions using the connected wallets. We do not store any of your private keys, and require explicit permission from your wallet application to carry out any transaction. As this code is also open source, you can verify these claims.

By design, all transactions on Pecunia take place on the [Optimism](https://optimism.io) L2, and potentially other L2s in the future (before The Merge). This is to ensure that fees remain low, as Pecunia is a utility wallet.

## Contributing

Positive contributions are welcome. Be sure to check out the [contribution guidelines](.github/CONTRIBUTING.md) before contributing. You can also share your ideas for the project in the [discussions](https://github.com/overthq/Pecunia/discussions) section.

## License

GNU AGPLv3 License

## Author

Oluwakorede Fashokun for [Overt](https://overt.dev).
