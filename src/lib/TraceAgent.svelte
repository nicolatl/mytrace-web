<script>
  
  export let issues = [];
  export let receiptId;
  import { onMount } from "svelte";
  import TaxonomyLink from "$lib/TaxonomyLink.svelte";

  let data = null;

  onMount(async () => {
    const res = await fetch(`/api/trace?id=${receiptId}`);
    data = await res.json();
    issues = data.issues;
  });
</script>
<div class="trace-agent" style="border-left-color: {issues.length > 0 ? 'red' : '#3399ff'}">
  <div class="trace-header">
    <span class="icon">🔍</span>
    <strong>TraceAgent</strong>
  </div>
  {#if issues.length === 0}
    <p class="trace-message">No problems detected</p>
  {:else}
    {#each issues as issue}
      <div>
        <p class="trace-message">
          Used your data for <b><TaxonomyLink term={issue.found} /></b><br />
          when you only allowed use for <b><TaxonomyLink term={issue.expected} /></b>.
        </p>
        <button class="report-button">
          Report This
        </button>
      </div>
    {/each}
  {/if}
</div>

<style>
.trace-agent {
  width: 160px;
  flex-shrink: 0;
  padding: 1rem;
  background-color: white;
  border-left: 4px solid;
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  border-radius: 0;
  margin-bottom: 1rem;
}

.trace-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}
.trace-message {
  margin: 0;
}
</style>
