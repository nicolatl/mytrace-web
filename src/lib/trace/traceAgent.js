import attestations from "$lib/data/attestations.json";

export default async function traceAgent({ id }) {
  
  const receipt = attestations.find(a => a.id == id);

  if (!receipt) {
    return { issues: [], message: `No receipt found for id ${startId}` };
  }

  const getById = (id) => attestations.find((a) => a.id === id);

  let results = {
    receiptId: receipt.id,
    issues: [],
    checks: []
  };

  for (const dataUseId of receipt.context.dataUses) {
    const dataUse = getById(dataUseId);
    if (!dataUse) continue;

    const consentAccept = getById(dataUse.context.basis);
    if (!consentAccept) continue;

    const consentRequest = getById(consentAccept.context.consent);
    if (!consentRequest) continue;

    //
    // --- declaredPurpose resolution ---
    // NOTE: This code is pretty much copied from DataReceipt.svelte 
    const terms = [];
    for(const term of consentRequest.context.terms) { // get all terms in the consent cited as a basis
      terms.push(getById(term));
    }
    let declaredPurpose = null;
    for(const term of terms){
      if(dataUse.context.data === term.context.data){ // match the relevant term to the data that was used (NOTE: only works for 1:1 data:purpose consent structure)
        declaredPurpose = term.context.purpose;
      }
    }

    //
    // --- operation resolution ---
    //
    let operation = dataUse.context?.operation;

    //
    // --- comparison ---
    //
    const matches = operation
      .toLowerCase()
      .includes(declaredPurpose.toLowerCase());

    results.checks.push({
      dataUseId: dataUse.id,
      operation,
      declaredPurpose,
      matches
    });

    if (!matches) {
      results.issues.push({
        dataUseId: dataUse.id,
        highlight: ["operation","purpose"],
        expected: declaredPurpose,
        found: operation
      });
    }
  }

  return results;
}
