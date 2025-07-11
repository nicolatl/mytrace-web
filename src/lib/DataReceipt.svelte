<script>
  import { ChevronDown, ChevronUp } from 'lucide-svelte';
  import { base } from '$app/paths';

  export let data;
  export let logosrc;
  export let controllersite;
  export let showReportButton = true;


  let expanded = false;

  function toggleExpand() {
    expanded = !expanded;
  }

  $: hasCarPayments = data.context.data.some(item => item.type === "Car Payments");
</script>

<div class="card">
  <div class="card-header">
    <img src={logosrc} alt="Company logo" width="32" height="32" />

    <div class="title">
      <h3>
        {data.context.controller} {data.context.operation}
      </h3>
    </div>

      {#if hasCarPayments}
        <span class="issue-label">1 issue</span>
      {/if}

    <div style="margin-left: auto; display: flex; gap: 0.75rem; align-items: center;">
      <span class="timestamp">{data.timestamp}</span>
      <button on:click={toggleExpand} class="chevron-button" aria-label="Toggle details">
        {#if expanded}
          <ChevronUp class="chevron-icon" />
        {:else}
          <ChevronDown class="chevron-icon" />
        {/if}
      </button>
    </div>
  </div>

  {#if expanded}
  <div class="card-expanded">

    <h4>Data Used</h4>
    <ul class="data-used-list">
      {#each data.context.data as item}
        <li>
          <img src={item.logo} alt={item.provider} class="data-logo" />
          <div class="data-info">
            <div class="data-type">{item.type}
            </div>
            <div class="data-provider">Provided by {item.provider}</div>
          </div>
          {#if item.type === "Car Payments"}
            <span class="issue-label">1 issue</span>
          {/if}
        </li>
      {/each}
    </ul>

    <h4>Used Because</h4>
    <div class="consent-card">
      <div class="consent-header">
        <h5>Your Agreement with {data.context.controller}</h5>
        <span class="consent-timestamp">{data.context.basis.timestamp}</span>
      </div>

      <p class="consent-intro">allows {data.context.controller} to use</p>

      <ul class="consent-terms">
        {#each data.context.basis.terms as [datum, purpose]}
          <li><strong>{datum}</strong> for <em>{purpose}</em>
            {#if hasCarPayments && datum.includes("car payment data") && purpose !== "credit decisioning"}
              <span class="issue-label">⚠ This data was used for credit decisioning</span>
              {#if showReportButton}
                <a href="{base}/newreport" class="report-button">Report This</a>
              {/if}
            {/if}
          </li>
        {/each}
      </ul>

      <p class="consent-expiry">until it expires on {data.context.basis.expiry}</p>
      <div class="card-footer">
        <a href="https://www.{controllersite}" target="_blank" rel="noopener noreferrer">
          Review your agreement on {controllersite}
        </a>  
        <a href="{base}/report" class="report-link">
          Report an issue
        </a>
      </div>
    </div>

  </div>
{/if}


</div>
