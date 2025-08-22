<script> 
    import DataReceipt from "$lib/DataReceipt.svelte";
    import { base } from '$app/paths';
    import attestationsRaw from '$lib/data/attestations.json';
</script>
<h1>Data Receipts</h1>
<DataReceipt receiptId={40} />
<DataReceipt receiptId={20} />

