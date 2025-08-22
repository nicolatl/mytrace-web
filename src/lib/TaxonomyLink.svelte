<script>
  import { taxonomy } from "$lib/data/taxonomy.js";
  export let term; // e.g. item.type, item.purpose, etc.
</script>

{#if taxonomy[term]}
  <a 
    class="taxonomy-link"
    href={taxonomy[term].href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {taxonomy[term].label}
  </a>
{:else}
  {term}
{/if}

<style>
  .taxonomy-link {
    color: inherit;
    text-decoration: none;
  }
  .taxonomy-link:hover {
    text-decoration: underline;
  }
</style>
