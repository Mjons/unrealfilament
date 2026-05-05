// Minimal FilamentPair ABI subset.
// Only the functions + events the admin dashboard and public mint-state
// reader need. Full ABI lives at contracts/out/FilamentPair.sol/FilamentPair.json.

window.FilamentAbi = [
  // ─── reads ────────────────────────────────────────────────────────────
  {
    type: "function",
    name: "owner",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "paused",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    type: "function",
    name: "pairsMinted",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint16" }],
  },
  {
    type: "function",
    name: "pricePerPair",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "currentGeneratorCid",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
  },
  {
    type: "function",
    name: "editionManifest",
    stateMutability: "view",
    inputs: [{ name: "", type: "uint16" }],
    outputs: [
      { name: "seed", type: "string" },
      { name: "imageCid", type: "string" },
      { name: "paramsCid", type: "string" },
      { name: "metadataCid", type: "string" },
    ],
  },
  // ─── writes (owner only) ──────────────────────────────────────────────
  {
    type: "function",
    name: "pause",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "unpause",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  // ─── events ───────────────────────────────────────────────────────────
  {
    type: "event",
    name: "EditionEntrySet",
    inputs: [{ name: "pairId", type: "uint16", indexed: true }],
  },
  {
    type: "event",
    name: "PairMinted",
    inputs: [
      { name: "pairId", type: "uint16", indexed: true },
      { name: "editionTokenId", type: "uint256", indexed: false },
      { name: "twinTokenId", type: "uint256", indexed: false },
      { name: "buyer", type: "address", indexed: true },
    ],
  },
];
