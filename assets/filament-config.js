// Filament chain + contract config.
//
// V1 ships with hand-edited values — see ADMIN_DASHBOARD_PLAN.md §9 #2.
// Promote to Vercel build-time env-var injection if/when this becomes painful.
//
// Update points:
//  - mainnet.contractAddress   → fill on mainnet deploy day
//  - mainnet.renderServiceUrl  → fill when prod render service is up
//  - mainnet.mintBackendUrl    → fill when prod mint backend is up

window.FilamentConfig = {
  mainnet: {
    chainId: 1,
    chainName: "mainnet",
    rpcUrl: "https://eth.llamarpc.com",
    explorerUrl: "https://etherscan.io",
    contractAddress: "0x0000000000000000000000000000000000000000",
    renderServiceUrl: "https://render.unrealfilament.art",
    mintBackendUrl: "https://mint.unrealfilament.art",
  },
  sepolia: {
    chainId: 11155111,
    chainName: "sepolia",
    // BlastAPI's public Sepolia endpoint blocks browser CORS — use the
    // canonical ethereum.org Sepolia RPC instead, which permits CORS.
    rpcUrl: "https://rpc.sepolia.org",
    explorerUrl: "https://sepolia.etherscan.io",
    contractAddress: "0x7d6376C8bDC19D46084375b66360220f55EdCa1f",
    // Same tunnel URLs as mainnet — the home-hosted backend serves whichever
    // chain it's currently configured for (currently Sepolia per mint-backend/.env).
    // When mainnet contract deploys + mint-backend flips to mainnet config,
    // ?network=sepolia will be useless until/unless we run a second backend.
    renderServiceUrl: "https://render.unrealfilament.art",
    mintBackendUrl: "https://mint.unrealfilament.art",
  },
};

// Resolved at load. Default mainnet on the public site; admin dashboard
// flips to sepolia via `?network=sepolia` for dry-run rehearsal.
window.FilamentNetwork = (() => {
  const params = new URLSearchParams(location.search);
  const fromUrl = params.get("network");
  if (fromUrl === "sepolia" || fromUrl === "mainnet") return fromUrl;
  return "mainnet";
})();

window.FilamentActiveCfg = function () {
  return window.FilamentConfig[window.FilamentNetwork];
};

window.FilamentTotalPairs = 250;
