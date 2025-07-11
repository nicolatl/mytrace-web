<script>
  import DataReceipt from '$lib/DataReceipt.svelte';
  import { Plus } from 'lucide-svelte';
  import { base } from '$app/paths';

  let receipts = [
    {
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
          }
        ],
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
    }
  ];
</script>

<h2>New Report</h2>

<section>
  <h3>Relevant Data Receipts</h3>
  {#each receipts as receipt}
    <DataReceipt data={receipt} logosrc={`${base}/logos/lendingclub.png`} controllersite="lendingclub.com" showReportButton={false}/>
  {/each}

  <button class="attach-button">
    <Plus size="16" />
    Attach more
  </button>
</section>

<section>
  <h3>Relevant Attestations</h3>
  <pre class="attestations-box">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec lorem ut leo vestibulum vehicula.
Curabitur at erat in massa tempor vehicula at in purus. Vivamus aliquam sapien vel orci pulvinar fermentum.

Suspendisse malesuada mauris id gravida rutrum. Vestibulum viverra, metus a vehicula sagittis, purus metus sagittis orci, at fermentum purus metus at sem.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec lorem ut leo vestibulum vehicula.
Curabitur at erat in massa tempor vehicula at in purus. Vivamus aliquam sapien vel orci pulvinar fermentum.

Suspendisse malesuada mauris id gravida rutrum. Vestibulum viverra, metus a vehicula sagittis, purus metus sagittis orci, at fermentum purus metus at sem.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec lorem ut leo vestibulum vehicula.
Curabitur at erat in massa tempor vehicula at in purus. Vivamus aliquam sapien vel orci pulvinar fermentum.

Suspendisse malesuada mauris id gravida rutrum. Vestibulum viverra, metus a vehicula sagittis, purus metus sagittis orci, at fermentum purus metus at sem.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec lorem ut leo vestibulum vehicula.
Curabitur at erat in massa tempor vehicula at in purus. Vivamus aliquam sapien vel orci pulvinar fermentum.

Suspendisse malesuada mauris id gravida rutrum. Vestibulum viverra, metus a vehicula sagittis, purus metus sagittis orci, at fermentum purus metus at sem.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec lorem ut leo vestibulum vehicula.
Curabitur at erat in massa tempor vehicula at in purus. Vivamus aliquam sapien vel orci pulvinar fermentum.

Suspendisse malesuada mauris id gravida rutrum. Vestibulum viverra, metus a vehicula sagittis, purus metus sagittis orci, at fermentum purus metus at sem.
  </pre>
</section>

<section>
  <h3>Issue Description</h3>
  <textarea class="issue-textarea" placeholder="Describe what happened, what data was involved, and any outcomes or concerns."></textarea>
</section>

<button class="submit-button">Submit report to MyTrace</button>

<style>
  h2 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }

  section {
    margin-bottom: 2rem;
  }

  .attach-button {
    margin-top: 0.5rem;
    background-color: #e0e7ff;
    color: #1e3a8a;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0.4rem 0.75rem;
    border-radius: 6px;
    border: none;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  .attach-button:hover {
    background-color: #c7d2fe;
  }

  .issue-textarea {
    width: 100%;
    min-height: 120px;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 0.9rem;
    resize: vertical;
    box-sizing: border-box;
  }

  .submit-button {
    background-color: #4f46e5;
    color: #ffffff;
    font-size: 0.95rem;
    font-weight: 600;
    padding: 0.65rem 1.25rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .submit-button:hover {
    background-color: #4338ca;
  }
</style>
