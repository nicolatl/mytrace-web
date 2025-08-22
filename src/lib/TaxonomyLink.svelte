<script>
  import { taxonomy } from "$lib/data/taxonomy.js";
  export let term;
  export let highlight = false;
</script>

{#if taxonomy[term]}
  <a
    class="taxonomy-link"
    class:highlight={highlight}
    href={taxonomy[term].href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {taxonomy[term].label}
  </a>
{:else}
  <span class:highlight={highlight}>
    {term}
  </span>
{/if}

<style>
.taxonomy-link {
  color: inherit;
  text-decoration: none;
}
.taxonomy-link:hover {
  text-decoration: underline;
}

.highlight {
  background: rgba(255, 0, 0, 0.15);
  border: 2px solid red;
  border-radius: 3px;
  padding: 0 2px;
}
</style>
