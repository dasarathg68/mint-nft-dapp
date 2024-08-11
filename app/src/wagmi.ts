import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { mainnet, sepolia, base, opBNB, optimism } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia, base, opBNB, optimism],
    connectors: [
      injected(),
      coinbaseWallet(),
      walletConnect({ projectId: "98ff8584ade069a1bb2f462dcc557865" }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [base.id]: http(),
      [opBNB.id]: http(),
      [optimism.id]: http(),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
