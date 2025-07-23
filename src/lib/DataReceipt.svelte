<script>
  import { ChevronDown, ChevronUp } from 'lucide-svelte';
  import { base } from '$app/paths';

  export let data;
  export let logosrc;
  export let controllersite;
  export let showReportButton = true;

  // Track expansion state per data item (by index)
  let cardExpanded = false;
  let basisExpanded = [];

  function toggleCardExpand() {
    cardExpanded = !cardExpanded;
  }

  function toggleBasisExpand(i) {
    basisExpanded[i] = !basisExpanded[i];
  }
</script>

<div class="card">
  <div class="card-header">
    <img src={logosrc} alt="Company logo" width="32" height="32" />

    <div class="title">
      <h3>{data.context.controller} {data.context.operation}</h3>
    </div>

    <div style="margin-left: auto; display: flex; gap: 0.75rem; align-items: center;">
      <span class="timestamp">{data.timestamp}</span>
      <button on:click={toggleCardExpand} class="chevron-button" aria-label="Toggle details">
        {#if cardExpanded}
          <ChevronUp class="chevron-icon" />
        {:else}
          <ChevronDown class="chevron-icon" />
        {/if}
      </button>
    </div>
  </div>

  {#if cardExpanded}
    <div class="card-expanded">

      <div class="data-header-row">
        <h4 style="flex: 1;">Data Used</h4>
        <h4 style="flex: 1; text-align: right;">Used Because</h4>
      </div>

      {#each data.context.data as item, i}
        <div class="data-row">
          <!-- Left: Data item -->
          <div class="data-used">
            <img src={item.logo} alt={item.provider} class="data-logo" />
            <div class="data-info">
              <div class="data-type">{item.type}</div>
              <div class="data-provider">Provided by {item.provider}</div>
            </div>
          </div>

          <!-- Right: Consent summary and expanded details (inside a unified grey bubble) -->
          <div class={`consent-box ${basisExpanded[i] ? 'expanded' : 'collapsed'}`}>
            <button on:click={() => toggleBasisExpand(i)} class="consent-toggle">
              Your agreement with {data.context.controller}
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
                  allows {data.context.controller} to use:
                </p>
                <ul class="consent-terms">
                  {#each item.basis.terms as [datum, purpose]}
                    <li><strong>{datum}</strong> for <em>{purpose}</em></li>
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
        <a href="https://www.{controllersite}" target="_blank" rel="noopener noreferrer">
          Review your agreement on {controllersite}
        </a>
        {#if showReportButton}
          <a href="{base}/report" class="report-link">
            Report an issue
          </a>
        {/if}
      </div>
    </div>
  {/if}
</div>
