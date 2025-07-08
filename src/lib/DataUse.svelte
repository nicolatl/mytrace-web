<script>
  import { ChevronDown, ChevronUp } from 'lucide-svelte';

  export let data;
  export let logosrc;

  let expanded = false;

  function toggleExpand() {
    expanded = !expanded;
  }
</script>

<div class="card">
  <div class="card-header">
    <img src={logosrc} alt="Company logo" width="32" height="32" />

    <div class="title">
      <h3>
        {data.context.controller} {data.context.operation}
      </h3>
    </div>

    <div style="margin-left: auto; display: flex; gap: 0.75rem; align-items: center;">
      <span class="timestamp">{data.timestamp}</span>
      <button on:click={toggleExpand}>
        {#if expanded}
          Hide <ChevronUp width="16" height="16" />
        {:else}
          See why <ChevronDown width="16" height="16" />
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
            <div class="data-type">{item.type}</div>
            <div class="data-provider">Provided by {item.provider}</div>
          </div>
        </li>
      {/each}
    </ul>

    <h4>Used Because</h4>
    <div class="consent-info">
      <p><strong>Status:</strong> {data.context.basis.status}</p>
      <p><strong>Expires:</strong> {data.context.basis.expiry}</p>
      <ul>
        {#each data.context.basis.terms as [datum, purpose]}
          <li><strong>{datum}</strong> for {purpose}</li>
        {/each}
      </ul>
    </div>

  </div>
{/if}


</div>
