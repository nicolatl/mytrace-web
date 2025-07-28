<script> 
    import DataReceipt from "$lib/DataReceipt.svelte";
    import { base } from '$app/paths';
</script>

<h1>Warnings</h1>
<DataReceipt data={{
  context: {
    controller: "LendingClub",
    operation: "denied your loan application",
    data: [
    {
      type: "Bank Transactions",
      provider: "Citibank",
      logo: `${base}/logos/citibank.jpeg`
    },
    {
      type: "Utility Payments",
      provider: "Eversource",
      logo: `${base}/logos/eversource.png`
    },
    {
      type: "Car Payments",
      provider: "Ally Financial",
      logo: `${base}/logos/allyfinancial.png`
    }],
    basis: {
      controller: "LendingClub",
      status: "Active",
      expiry: "August 8, 2025",
      terms: [
        ["3 months of bank transaction data", "credit decisioning"],
        ["12 months of utility payment data", "credit decisioning"],
        ["12 months of car payment data", "marketing"]
      ],
      timestamp: "1 week ago"
    }
  },
  timestamp: "18 hours ago"
}} logosrc={`${base}/logos/lendingclub.png`} controllersite="lendingclub.com"/>