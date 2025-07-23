<script> 
    import DataReceipt from "$lib/DataReceipt.svelte";
    import { base } from '$app/paths';
</script>
<h1>Data Receipts</h1>

<DataReceipt data={{ 
  context: {
    controller: "LendingClub",
    operation: "denied your loan application",
    data: [
      {
        type: "Bank Transactions",
        provider: "Citibank",
        logo: `${base}/logos/citibank.jpeg`,
        basis: {
          timestamp: "1 week ago",
          terms: [["3 months of bank transaction data", "credit decisioning"]],
          expiry: "August 8, 2025"
        }
      },
      {
        type: "Utility Payments",
        provider: "Eversource",
        logo: `${base}/logos/eversource.png`,
        basis: {
          timestamp: "1 week ago",
          terms: [["12 months of utility payment data", "credit decisioning"]],
          expiry: "August 8, 2025"
        }
      },
      {
        type: "Car Payments",
        provider: "Ally Financial",
        logo: `${base}/logos/allyfinancial.png`,
        basis: {
          timestamp: "1 week ago",
          terms: [["12 months of car payment data", "marketing"]],
          expiry: "August 8, 2025"
        }
      }
    ]
  },
  timestamp: "18 hours ago"
}} logosrc={`${base}/logos/lendingclub.png`} controllersite="lendingclub.com" />

<DataReceipt data={{
  context: {
    controller: "LendingClub",
    operation: "approved your loan application",
    data: [
      {
        type: "Bank Transactions",
        provider: "Citibank",
        logo: `${base}/logos/citibank.jpeg`,
        basis: {
          timestamp: "2 weeks ago",
          terms: [["3 months of bank transaction data", "credit decisioning"]],
          expiry: "August 1, 2025"
        }
      },
      {
        type: "Utility Payments",
        provider: "Eversource",
        logo: `${base}/logos/eversource.png`,
        basis: {
          timestamp: "2 weeks ago",
          terms: [["12 months of utility payment data", "credit decisioning"]],
          expiry: "August 1, 2025"
        }
      }
    ]
  },
  timestamp: "8 days ago"
}} logosrc={`${base}/logos/lendingclub.png`} controllersite="lendingclub.com" />

<DataReceipt data={{
  context: {
    controller: "Instagram",
    operation: "showed you 1 ad",
    data: [
      {
        type: "Browsing data",
        provider: "Google",
        logo: `${base}/logos/google.webp`,
        basis: {
          timestamp: "1 year ago",
          terms: [["Third-party browsing data", "marketing and content recommendation"]],
          expiry: "December 31, 2025"
        }
      },
      {
        type: "Purchase history",
        provider: "Amazon",
        logo: `${base}/logos/amazon.jpg`,
        basis: {
          timestamp: "1 year ago",
          terms: [["Third-party purchase history", "marketing"]],
          expiry: "December 31, 2025"
        }
      },
      {
        type: "Content interactions",
        provider: "Instagram",
        logo: `${base}/logos/instagram.webp`,
        basis: {
          timestamp: "1 year ago",
          terms: [["Content interactions on Instagram", "marketing, content recommendation, user research, and feature improvement"]],
          expiry: "December 31, 2025"
        }
      }
    ]
  },
  timestamp: "10 days ago"
}} logosrc={`${base}/logos/instagram.webp`} controllersite="instagram.com" />
