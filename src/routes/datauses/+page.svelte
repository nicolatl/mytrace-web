<script> 
    import DataUse from "$lib/DataUse.svelte";
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
      logo: "/logos/google.webp"
    },
    {
      type: "Purchase history",
      provider: "Amazon",
      logo: "/logos/amazon.jpg"
    },
    {
      type: "Content interactions",
      provider: "Instagram",
      logo: "/logos/instagram.webp"
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
}} logosrc="/logos/instagram.webp"/>
