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
      expiry: "December 31, 2025",
      terms: [
        ["Third-party browsing data", "marketing and content recommendation"],
        ["Third-party purchase history", "marketing"],
        ["Content interactions on Instagram", "marketing, content recommendation, user research, and feature improvement"]
      ],
      timestamp: "1 year ago"
    }
  },
  timestamp: "2 hours ago"
}} logosrc={`${base}/logos/instagram.webp`}/>
