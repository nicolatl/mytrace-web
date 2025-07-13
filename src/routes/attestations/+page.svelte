<script>
  import attestationsRaw from '$lib/data/attestations.json';
  // Sort by timestamp ascending
  let attestations = [...attestationsRaw].sort(
    (a, b) => new Date(a.Timestamp) - new Date(b.Timestamp)
  );
</script>
<h2>OTrace Attestations</h2>
<div class="attestations-box">
  <table class="attestation-table">
    <thead>
      <tr>
        <th>Party</th>
        <th>Timestamp</th>
        <th>Type</th>
        <th>Body</th>
      </tr>
    </thead>
    <tbody>
      {#each attestations as attestation}
        <tr>
          <td>{attestation.party}</td>
          <td>{attestation.Timestamp}</td>
          <td>{attestation.type}</td>
          <td>{attestation.body}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

