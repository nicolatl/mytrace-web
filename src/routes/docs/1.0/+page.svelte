<div>
    <h1>Docs: Traceability Concepts</h1>
    <h3>Terminology for parties:</h3>
    <ul>
        <li>(Data) Subject</li>
        <li>(Data) Provider</li>
        <li>(Data) Recipient</li>
        <li>TraceService</li>
        <li>(Data) Controller includes Providers and Recipients</li>
        <li>Party includes Subjects, Providers, and Recipients</li>
    </ul>
    <h2> introduction [Controller, Subject, TraceService] </h2>
    <p><strong>purpose</strong> to introduce a controller to the subject’s traceability service. Also represents registration for the traceability service when the subject and controller are the same.</p>
    <p><strong>state</strong></p>
    <div style="padding-left: 2em;">
    <p>subject: Introduction → Subject</p>
    <p>controller: Introduction → Controller</p>
    <p>traceService: Introduction → TraceService</p>
    </div>
    <p><strong>actions</strong></p>
    <div style="padding-left: 2em;" id="introduction-introduce">
        introduce(s: Subject, c: Controller, t: TraceService) → i: Introduction
        <div style="padding-left: 2em;">
            creates fresh introduction i such that
            <div style="padding-left: 2em;">
                i.subject = s
                i.controller = c
                i.traceService = t
            </div>
            this represents a request by s for c to use t to trace their data interactions with s
        </div>
    </div>
    <div style="padding-left: 2em;" id="introduction-acknowledge">
        acknowledge(c: Controller, s: Subject, j: introduction) 
        <div style="padding-left: 2em;">
            c agrees to trace their data interactions with s according to j
        </div>
    </div>
    <p><strong>operational principle</strong> after introduce(s,c,t) and acknowledge (c,s,t), c and s must both use t to trace their data interactions.</p>

    <h2>consent [Controller, Subject, Terms]</h2>

    <p><strong>purpose</strong> to form and manage consent agreements governing a controller’s use of a subject’s personal data</p>

    <p><strong>state</strong></p>
    <div style="padding-left: 2em;">
    <p>controller: Consent → Controller</p>
    <p>subject: Consent → Subject</p>
    <p>terms: Consent → set Term</p>
    <p>expiry: Consent → Timestamp</p>
    <p>status: Consent → ConsentStatus (REQUESTED | ACCEPTED | DENIED | REVOKED | EXPIRED)</p>
    </div>

    <p><strong>actions</strong></p>

    <!-- request -->
    <div style="padding-left: 2em;" id="consent-request">
    request(c: Controller, s: Subject, ts: set Term, e: Timestamp) → consent: Consent
    <div style="padding-left: 2em;">
        creates fresh consent such that
        <div style="padding-left: 2em;">
        consent.controller = c<br>
        consent.subject = s<br>
        consent.terms = ts<br>
        consent.expiry = e<br>
        consent.status = REQUESTED
        </div>
    </div>
    </div>

    <!-- accept -->
    <div style="padding-left: 2em;" id="consent-accept">
    accept(s: Subject, c: Consent) → c: Consent
    <div style="padding-left: 2em;">
        requires c.status = REQUESTED<br>
        c.status = ACCEPTED
    </div>
    </div>

    <!-- deny -->
    <div style="padding-left: 2em;" id="consent-deny">
    deny(s: Subject, c: Consent) → c: Consent
    <div style="padding-left: 2em;">
        requires c.status = REQUESTED and c.subject = s<br>
        c.status = DENIED
    </div>
    </div>

    <!-- revoke -->
    <div style="padding-left: 2em;" id="consent-revoke">
    revoke(s: Subject, c: Consent) → c: Consent
    <div style="padding-left: 2em;">
        requires c.status = ACCEPTED and c.subject = s<br>
        c.status = REVOKED
    </div>
    </div>

    <!-- expire -->
    <div style="padding-left: 2em;" id="consent-expire">
    expire(c: Consent)
    <div style="padding-left: 2em;">
        requires c.status = ACCEPTED and c.expiry is before now<br>
        c.status = EXPIRED
    </div>
    </div>

    <!-- permit -->
    <div style="padding-left: 2em;" id="consent-permit">
    permit(c: Controller, s: Subject, t: Term)
    <div style="padding-left: 2em;">
        requires some consent c where c.status = ACCEPTED and t in c.terms
    </div>

    <p><strong>operational principle</strong> After a controller requests consent for use of a subject’s data under some terms, and the subject accepts that consent, then so long as the subject does not revoke the consent and the consent does not expire, the controller is permitted to use the subject’s data on those terms.</p>
        <div style="padding-left: 2em;">
        after
        <div style="padding-left: 2em;">
            x = request(c, s, ts, e)
            accept(s, x)
        </div>           
        then unless
        <div style="padding-left: 2em;">
            expire(x) or revoke(s, x)
        </div>   
        then for any t in ts can do
        <div style="padding-left: 2em;">
            permit(c, s, t)
        </div>
    </div>
    </div>

    <h2 id="term">data [Type, TypeOntology, Provider, Subject, (Start, End)]</h2>

    <p><strong>purpose</strong> to identify a specific dataset.</p>

    <p><strong>state</strong></p>
    <div style="padding-left: 2em;">
        <p>data.dataType → DataType</p>
        <p>data.dataTypeOntology → DataTypeOntology</p>
        <p>data.controller → Controller</p>
        <p>data.subject → Subject</p>
        <p>(optional for timeseries) data.start → Start</p>
        <p>(optional for timeseries) data.end → End</p>
    </div>

    <p><strong>actions</strong></p>
    <div style="padding-left: 2em;" id="data-define">
    define(dt: DataType, dto: DataTypeOntology, c: Controller, s: Subject [st: Start, e: End]) 
    <div style="padding-left: 2em;">
        defines a dataset, with data of type dt as defined by dto, collected by c concerning s
    </div>
    </div>

    <p><strong>operational principle</strong></p>
    <div style="padding-left: 2em;">
    after define(dt, dto, c, s), the defined dataset can be referenced in the future.
    </div>

    <h2 id="term">term [Data, Purpose, PurposeOntology]</h2>

    <p><strong>purpose</strong> to define a clear and specific purpose for which a specific set of data could be used.</p>

    <p><strong>state</strong></p>
    <div style="padding-left: 2em;">
        <p>term.data → Data</p>
        <p>term.purpose → Purpose</p>
        <p>term.purposeOntology → PurposeOntology</p>
    </div>

    <p><strong>actions</strong></p>
    <div style="padding-left: 2em;" id="term-define">
    define(d: Data, p: Purpose, po: PurposeOntology) 
    <div style="padding-left: 2em;">
        defines a dataset, with data of type t as defined by to, collected by p concerning s
    </div>
    </div>

    <p><strong>operational principle</strong></p>
    <div style="padding-left: 2em;">
    after define(d,p,po), the defined term can be referenced in consent-related attestations.
    </div>



    <h2>dataAuthorization [Data, Provider, Recipient, Subject]</h2>

    <p><strong>purpose</strong> to authorize a provider to share data about a subject with a recipient</p>

    <p><strong>state</strong></p>
    <div style="padding-left: 2em;">
    <p>subject: DataAuthorization → Subject</p>
    <p>provider: DataAuthorization → Provider</p>
    <p>recipient: DataAuthorization → Recipient</p>
    <p>data: DataAuthorization → set Data</p>
    <p>expiration: DataAuthorization → Timestamp</p>
    <p>consent: DataAuthorization → Consent</p>
    <p>protocol: DataAuthorization → Protocol</p>
    </div>

    <p><strong>actions</strong></p>

    <!-- authorize -->
    <div style="padding-left: 2em;" id="dataAuthorization-authorize">
    authorize(s: Subject, p: Provider, r: Recipient, d: set Data, e: Expiration, c: Consent, pr: Protocol) → a: Authorization
    <div style="padding-left: 2em;">
        creates fresh dataAuthorization a such that
        <div style="padding-left: 2em;">
        a.subject = s<br>
        a.provider = p<br>
        a.recipient = r<br>
        a.data = d<br>
        a.expiration = e<br>
        a.consent = c<br>
        a.protocol = pr
        </div>
    </div>
    </div>

    <!-- revoke -->
    <div style="padding-left: 2em;" id="dataAuthorization-revoke">
    revoke(s: Subject, a: DataAuthorization) → a: DataAuthorization
    <div style="padding-left: 2em;">
        a.expiration = Timestamp.now()
    </div>
    </div>

    <div style="padding-left: 2em;" id="dataAuthorization-grant">
    grant(a: DataAuthorization) 
    <div style="padding-left: 2em;">
        a.provider provides a.recipient access to d.
    </div>
    </div>

    <div style="padding-left: 2em;" id="dataAuthorization-access">
    access(a: DataAuthorization)
    <div style="padding-left: 2em;">
        a.recipient pulls d from a.provider.
    </div>
    </div>

    <p><strong>operational principle</strong> after authorize(s,p,r,d,e,c,pr) and provide(a), and until revoke(s,a) or Time.now >= e, p must share d with r.</p>

    <h2>dataUse [Controller, Data, Basis, Subject]</h2>

    <p><strong>purpose</strong> to use data about a subject for a specific purpose in association with a [legal] basis</p>

    <p><strong>state</strong></p>
    <div style="padding-left: 2em;">
    <p>controller: DataUse → Controller</p>
    <p>subject: DataUse → Subject</p>
    <p>data: DataUse → Data</p>
    <p>operation: DataUse → Operation</p>
    <p>basis: DataUse → Basis</p>
    </div>

    <p><strong>actions</strong></p>

    <!-- use -->
    <div style="padding-left: 2em;" id="dataUse-use">
    use(c: Controller, s: Subject, d: Data, o: Operation, b: Basis) → u: DataUse
    <div style="padding-left: 2em;">
        creates fresh data use u such that
        <div style="padding-left: 2em;">
        u.controller = c<br>
        u.subject = s<br>
        u.data = d<br>
        u.operation = o<br>
        u.basis = b
        </div>
    </div>
    </div>

    <!-- getBasis -->
    <div style="padding-left: 2em;" id="dataUse-getBasis">
    getBasis(u: DataUse) → u.basis: Basis
    </div>

    <p><strong>operational principle</strong> pair use and basis</p>


    <h2>dataReceipt [Controller, DataUses, Subject]</h2>

    <p><strong>purpose</strong> to proclaim a set of dataUses as a complete action or decision</p>

    <p><strong>state</strong></p>
    <div style="padding-left: 2em;">
    <p>controller: DataReceipt → Subject</p>
    <p>subject: DataReceipt → Subject</p>
    <p>dataUses: DataReceipt → set DataUse</p>
    </div>

    <p><strong>actions</strong></p>

    <!-- create -->
    <div style="padding-left: 2em;" id="dataReceipt-create">
    create(c: Controller, s: Subject, dus: DataUses) → r: DataReceipt
    <div style="padding-left: 2em;">
        creates fresh dataReceipt r such that
        <div style="padding-left: 2em;">
        r.controller = c<br>
        r.subject = s<br>
        r.dataUses = dus
        </div>
    </div>
    </div>

    <p><strong>operational principle</strong> controllers create data receipts for a subject to view through a traceService.</p>

</div>
<script>
  import { onMount } from "svelte";

  function highlightHash() {
    const target = document.querySelector(location.hash);
    if (target) {
      target.classList.add("hash-highlight");
      setTimeout(() => target.classList.remove("hash-highlight"), 1500);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  onMount(() => {
    highlightHash();
    window.addEventListener("hashchange", highlightHash);
    return () => window.removeEventListener("hashchange", highlightHash);
  });
</script>

<style>
  p {
    margin: 0;
    padding: 0;
  }
</style>