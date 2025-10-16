import attestations1 from '$lib/data/attestations.json';
import attestations2 from '$lib/data/attestations2.json';
const attestations = attestations1.concat(attestations2);

export default async function traceAgent({ id }) {
  
  const receipt = attestations.find(a => a.id == id);

  if (!receipt) {
    return { issues: [], message: `No receipt found for id ${id}` };
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

    // USE CASE 2 START HERE

    const controller = dataUse.party;
    const basis_controller = consentRequest.party;

    if(basis_controller != controller) {
      results.issues.push({
        dataUseId: dataUse.id,
        highlight: ["controller","basis_controller"],
        expected: controller,
        found: basis_controller
      });
      return results
    }


    // USE CASE 1 START HERE
    // --- declaredPurpose resolution ---
    // NOTE: This code is pretty much copied from DataReceipt.svelte 
    const terms = [];
    for(const term of consentRequest.context.terms) { // get all terms in the consent cited as a basis
      terms.push(getById(term));
    }
    let declaredPurpose = null;
    for(const term of terms){
      if(dataUse.context.data === term.context.data && !declaredPurpose){
        declaredPurpose = term.context.purpose;
      } else if(declaredPurpose && term.context.purpose === dataUse.context?.operation){
        declaredPurpose = term.context.purpose;
        //if there are 2 terms for the data, choose the one with the purpose that matches the operation done
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
