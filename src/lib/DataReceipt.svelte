<script>
  import { ChevronDown, ChevronUp } from 'lucide-svelte';
  import { base } from '$app/paths';
  import attestations from '$lib/data/attestations.json';
  import TraceAgent from './TraceAgent.svelte';
  import { logos } from '$lib/data/logos.js';
  import TaxonomyLink from "$lib/TaxonomyLink.svelte";

  export let receiptId;         // pass in an attestation id
  export let showReportButton = true;

  // find attestation by id
  const getById = (id) => attestations.find(a => a.id === id);

  // the receipt attestation itself
  const receipt = getById(receiptId);

  // resolve controller name (party field)
  const controller = receipt?.party ?? "Unknown";

  // resolve all dataUse attestations linked to this receipt
  let rows = [];
  if (receipt?.context?.dataUses) {
    rows = receipt.context.dataUses.map(useId => {
      const use = getById(useId);
      if (!use) return null;

      const basisAccept = getById(use.context.basis);
      const consentReq = basisAccept ? getById(basisAccept.context.consent) : null;
      const dataAuth = getById(use.context.data);
      const provider = getById(dataAuth.context.provider);

      // resolve declared purpose
      let purpose = consentReq?.context?.terms?.[0]?.purpose?.name;
      if (typeof purpose === "number") {
        const purposeExt = getById(purpose);
        purpose = `${purposeExt?.context?.name}/${purposeExt?.context?.extension}`;
      }

      // resolve declared operation
      let operation = use.context?.operation;
      if (typeof operation === "number") {
        const operationExt = getById(operation);
        operation = `${operationExt?.context?.name}/${operationExt?.context?.extension}`;
      }

      return {
        id: use.id,
        type: consentReq.context.terms[0].data.type ?? "Unknown",
        provider: provider?.party ?? "Unknown",
        logo: logos[(provider?.party ?? "unknown").toLowerCase().replace(/\s/g, "")],
        usage: operation ?? "Unknown",
        basis: {
          timestamp: basisAccept?.timestamp ?? "unknown",
          terms: [
            [consentReq.context.terms[0].data.type ?? "Unknown", purpose ?? "unknown"]
          ],
          expiry: consentReq?.context?.expiry ?? "unknown"
        }
      };
    }).filter(Boolean);
  }

  // expand/collapse
  let cardExpanded = false;
  let basisExpanded = [];
  function toggleCardExpand() {
    cardExpanded = !cardExpanded;
  }
  function toggleBasisExpand(i) {
    basisExpanded[i] = !basisExpanded[i];
  }
</script>

{#if cardExpanded}
  <div class="card-wrapper">
    <div class="card">
      <div class="card-header">
        <img src={logos[(controller ?? "unknown").toLowerCase().replace(/\s/g, "")]} alt="Company logo" width="32" height="32" />
        <div class="title">
          <h3>{controller} used your data</h3>
        </div>
        <div style="margin-left: auto; display: flex; gap: 0.75rem; align-items: center;">
          <span class="timestamp">{receipt.timestamp}</span>
          <button on:click={toggleCardExpand} class="chevron-button" aria-label="Toggle details">
            <ChevronUp class="chevron-icon" />
          </button>
        </div>
      </div>
      <div class="card-expanded">

        <div class="data-header-row">
          <h4 style="flex: 1;">Data Used</h4>
          <h4 style="flex: 1; text-align: right;">Used Because</h4>
        </div>

        {#each rows as item, i}
          <div class="data-row" data-id={item.id}>
            <!-- Left: Data item -->
            <div class="data-used">
              <img src={item.logo} alt={item.provider} class="data-logo" />
              <div class="data-info">
                <div class="data-type">
                  <TaxonomyLink term={item.type} />
                </div>
                <div class="data-provider">
                  Used for <TaxonomyLink term={item.usage} />
                </div>
              </div>
            </div>

            <!-- Right: Consent summary -->
            <div class={`consent-box ${basisExpanded[i] ? 'expanded' : 'collapsed'}`}>
              <button on:click={() => toggleBasisExpand(i)} class="consent-toggle">
                Your agreement with {controller}
                {#if basisExpanded[i]}
                  <ChevronUp size="16" style="margin-left: 0.5rem;" />
                {:else}
                  <ChevronDown size="16" style="margin-left: 0.5rem;" />
                {/if}
              </button>

              {#if basisExpanded[i]}
                <div class="consent-details">
                  <p class="consent-timestamp">{item.basis.timestamp}</p>
                  <p class="consent-intro">
                    allows {controller} to use:
                  </p>
                  <ul class="consent-terms">
                    {#each item.basis.terms as [datum, purpose]}
                      <li><strong><TaxonomyLink term={datum}/></strong> for <em><TaxonomyLink term={purpose}/>
                      </em></li>
                    {/each}
                  </ul>
                  <p class="consent-expiry">
                    until it expires on {item.basis.expiry}
                  </p>
                </div>
              {/if}
            </div>
          </div>
        {/each}

        <div class="card-footer">
          <a href="https://www.{controller.toLowerCase()}.com" target="_blank" rel="noopener noreferrer">
            Review your agreement on {controller}.com
          </a>
          {#if showReportButton}
            <a href="{base}/report" class="report-link">
              Report an issue
            </a>
          {/if}
        </div>
      </div>
    </div>
    <TraceAgent receiptId={receiptId} />
  </div>
{:else}
  <div class="card">
    <div class="card-header">
      <img src={logos[(controller ?? "unknown").toLowerCase().replace(/\s/g, "")]} alt="Company logo" width="32" height="32" />
      <div class="title">
        <h3>{controller} used your data</h3>
      </div>
      <div style="margin-left: auto; display: flex; gap: 0.75rem; align-items: center;">
        <span class="timestamp">{receipt.timestamp}</span>
        <button on:click={toggleCardExpand} class="chevron-button" aria-label="Toggle details">
          <ChevronDown class="chevron-icon" />
        </button>
      </div>
    </div>
  </div>
{/if}
