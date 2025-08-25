<script>
  export let data;
  console.log(data);
  data=data.attestation;
</script>

<h1>Data ontology extension: {data.context?.extension}</h1>
Created by {data.party} at {data.timestamp}
<h3>{data.body}</h3>



