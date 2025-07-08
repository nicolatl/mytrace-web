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
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
    },
    {
      type: "Purchase history",
      provider: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
    },
    {
      type: "Content interactions",
      provider: "Instagram",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
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
}} logosrc="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"/>
