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

  import attestationsRaw from '$lib/data/attestations.json';

  let attachMode = false;

  // Sort attestations by id ascending
  let attestations = [...attestationsRaw].sort((a, b) => a.id - b.id);

  // Starting selection: IDs 1-6 and 19+
  let selectedAttestationIds = attestations
    .filter(a => a.id <= 6 || a.id >= 19)
    .map(a => a.id);

  // Working selection for attachMode
  let selectedInAttachMode = new Set(selectedAttestationIds);

  function openAttachMode() {
    attachMode = true;
    selectedInAttachMode = new Set(selectedAttestationIds);
  }

  function saveSelection() {
    selectedAttestationIds = Array.from(selectedInAttachMode);
    attachMode = false;
  }
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
  <div class="attestation-box" style="max-height:200px;">

  <table class="attestation-table" style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr>
        {#if attachMode}
          <th>✔</th>
        {/if}
        <th>Party</th>
        <th>Timestamp</th>
        <th>Type</th>
        <th>Body</th>
      </tr>
    </thead>
    <tbody>
      {#each attestations as attestation (attestation.id)}
        {#if attachMode || selectedAttestationIds.includes(attestation.id)}
          <tr>
            {#if attachMode}
              <td>
                <input
                  type="checkbox"
                  checked={selectedInAttachMode.has(attestation.id)}
                  on:change={(e) => {
                    if (e.target.checked) {
                      selectedInAttachMode.add(attestation.id);
                    } else {
                      selectedInAttachMode.delete(attestation.id);
                    }
                  }}
                />
              </td>
            {/if}
            <td>{attestation.party}</td>
            <td>{attestation.Timestamp}</td>
            <td>{attestation.type}</td>
            <td>{attestation.body}</td>
          </tr>
        {/if}
      {/each}
    </tbody>
  </table>
</div>
<div class="button-row">
  {#if attachMode}
    <button on:click={saveSelection} class="primary-button">
      Save Selection
    </button>
  {:else}
    <button on:click={openAttachMode} class="primary-button">
      <span style="font-size: 1.1em;">＋</span> Attach more
    </button>
  {/if}
</div>
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











  .attestation-box {
    border: 1px solid #ccc;
    padding: 1rem;
    background: #f9f9f9;
    border-radius: 0.5rem;
    margin-top: 1rem;
    overflow: auto;
  }

  .attestation-table {
    width: 100%;
    border-collapse: collapse;
    font-family: monospace;
    font-size: 0.9rem;
  }

  .attestation-table th,
  .attestation-table td {
    border: 1px solid #ddd;
    padding: 0.5rem;
    vertical-align: top;
  }

  .attestation-table th {
    background: #eee;
    text-align: left;
  }

  .attestation-table tr:nth-child(even) {
    background: #fdfdfd;
  }

  .button-row {
    margin-top: 1rem;
  }

  .primary-button {
    background: #0044cc;
    color: #fff;
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .primary-button:hover {
    background: #003399;
  }

</style>
