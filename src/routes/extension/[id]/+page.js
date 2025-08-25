import attestations from "$lib/data/attestations.json";

export function load({ params }) {
  const id = Number(params.id); // arg from the URL
  const attestation = attestations.find(a => a.id === id);

  if (!attestation) {
    return {
      status: 404,
      error: new Error(`No attestation found for id ${id}`)
    };
  }

  return {
    attestation
  };
}
