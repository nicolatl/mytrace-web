import attestations from "$lib/data/attestations.json";

export default async function traceAgent({ id }) {
  // if no id provided, default to last one
  const startId = id ?? Math.max(...attestations.map(a => a.id));
  const receipt = attestations.find(a => a.id == startId);

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
    //
    let declaredPurpose = consentRequest.context.terms?.[0]?.purpose?.name;
    if (typeof declaredPurpose === "number") {
      const purposeExtension = getById(declaredPurpose);
      if (purposeExtension) {
        declaredPurpose =
          String(purposeExtension?.context?.name ?? "unknown") +
          "/" +
          String(purposeExtension?.context?.extension ?? "unknown");
      } else {
        declaredPurpose = "unknown";
      }
    } else if (typeof declaredPurpose !== "string") {
      declaredPurpose = String(declaredPurpose ?? "unknown");
    }

    //
    // --- operation resolution ---
    //
    let operation = dataUse.context?.operation;
    if (typeof operation === "number") {
      const opExtension = getById(operation);
      if (opExtension) {
        operation =
          String(opExtension?.context?.name ?? "unknown") +
          "/" +
          String(opExtension?.context?.extension ?? "unknown");
      } else {
        operation = "unknown";
      }
    } else if (typeof operation !== "string") {
      operation = String(operation ?? "unknown");
    }

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
        expected: declaredPurpose,
        found: operation
      });
    }
  }

  return results;
}
