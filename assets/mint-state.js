// Filament public-site mint-state reader.
//
// Reads contract.paused() + contract.pairsMinted() and sets
// document.body.dataset.mintState to one of:
//   'pre-launch'  — paused, or contract not yet deployed (default)
//   'live'        — unpaused, pairsMinted < 250
//   'sold-out'    — pairsMinted >= 250
//
// CSS in site.css (rules under [data-mint-state="..."]) handles the
// visual swap. Updates the optional [data-minted-count] attr too so
// pages can show "X / 250 minted" if they want.
//
// Cached in sessionStorage for 60s so a click-through inside one
// session doesn't fire 4 RPC calls.

(async function mintStateBootstrap() {
  const CACHE_KEY = "filament-mint-state-v1";
  const CACHE_TTL_MS = 60 * 1000;

  function setState(state, mintedCount) {
    document.body.dataset.mintState = state;
    if (typeof mintedCount === "number") {
      document.body.dataset.mintedCount = String(mintedCount);
      // Populate any DOM nodes flagged data-mint-counter with "X / 250".
      document.querySelectorAll("[data-mint-counter]").forEach((el) => {
        el.textContent = `${mintedCount} / ${window.FilamentTotalPairs}`;
      });
    }
  }

  // Default: pre-launch. Always set immediately so initial paint is correct.
  setState("pre-launch");

  // Post-pivot the Edition half is a free mint on OpenSea, and this reads
  // the retired 0.038 ETH pair-mint contract — its paused()/pairsMinted()
  // no longer describe anything the site should show. Left on, it flipped
  // the page to 'live' and advertised the single pair we minted ourselves.
  // Stay at pre-launch until the OpenSea drop opens. Re-enable by pointing
  // filament-config at the Twin claim contract and flipping this flag.
  const CHAIN_STATE_ENABLED = false;
  if (!CHAIN_STATE_ENABLED) return;

  // Try cache first.
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (raw) {
      const cached = JSON.parse(raw);
      if (cached && Date.now() - cached.t < CACHE_TTL_MS) {
        setState(cached.state, cached.mintedCount);
        return;
      }
    }
  } catch {
    // sessionStorage may be unavailable (private mode, etc.) — proceed.
  }

  // Bail if contract address not yet set (mainnet not deployed).
  const cfg = window.FilamentActiveCfg?.();
  if (!cfg) return;
  const ZERO = "0x0000000000000000000000000000000000000000";
  if (!cfg.contractAddress || cfg.contractAddress.toLowerCase() === ZERO) {
    return;
  }

  // Fetch state via vanilla eth_call — no viem on the public site, keeps
  // the homepage bundle tiny. Selectors are precomputed; if the contract
  // ABI shifts these will desync, but the read functions involved are
  // OZ-standard (paused) or auto-generated getters (pairsMinted) on
  // immutable storage names.
  // Selectors lifted from contracts/out/FilamentPair.sol/FilamentPair.json
  // methodIdentifiers. If contract storage names change these will desync;
  // re-extract on any breaking ABI change.
  const SELECTORS = {
    paused: "0x5c975abb",
    pairsMinted: "0x46a27643",
  };

  async function ethCall(selector) {
    const res = await fetch(cfg.rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_call",
        params: [{ to: cfg.contractAddress, data: selector }, "latest"],
        id: 1,
      }),
    });
    const json = await res.json();
    if (json.error) throw new Error(json.error.message || "eth_call failed");
    return json.result;
  }

  try {
    const [pausedHex, pairsMintedHex] = await Promise.all([
      ethCall(SELECTORS.paused),
      ethCall(SELECTORS.pairsMinted),
    ]);
    // paused: bool, ABI-encoded as 32-byte hex; LSB is 0/1.
    const paused = pausedHex && parseInt(pausedHex.slice(-2), 16) === 1;
    // pairsMinted: uint16 in a 32-byte slot; safe to parseInt the whole thing.
    const minted = pairsMintedHex ? parseInt(pairsMintedHex, 16) : 0;

    let state;
    if (minted >= window.FilamentTotalPairs) state = "sold-out";
    else if (paused) state = "pre-launch";
    else state = "live";

    setState(state, minted);

    try {
      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ state, mintedCount: minted, t: Date.now() }),
      );
    } catch {
      // Ignore storage failures.
    }
  } catch (err) {
    // Stay in pre-launch on any failure — better to under-promote than
    // accidentally show "live" if RPC flakes.
    console.warn("[filament] mint-state fetch failed:", err);
  }
})();
