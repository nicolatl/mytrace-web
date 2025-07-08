<script> 
    import DataUse from "$lib/DataUse.svelte";
    import { base } from '$app/paths';
</script>
<h1>Data Uses</h1>
<DataUse data={{
  context: {
    controller: "Instagram",
    operation: "showed you 106 ads",
    data: [
    {
      type: "Browsing data",
      provider: "Google",
      logo: `${base}/logos/google.webp`
    },
    {
      type: "Purchase history",
      provider: "Amazon",
      logo: `${base}/logos/amazon.jpg`
    },
    {
      type: "Content interactions",
      provider: "Instagram",
      logo: `${base}/logos/instagram.webp`
    }],
    basis: {
      controller: "Instagram",
      status: "Active",
      expiry: "2025-12-31",
      terms: [
        ["email address", "ad targeting"],
        ["browsing history", "feed recommendations"]
      ]
    }
  },
  timestamp: "2 hours ago"
}} logosrc={`${base}/logos/instagram.webp`}/>
