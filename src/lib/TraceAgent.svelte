<!-- TraceAgent.svelte -->
<div class="trace-agent no-issues">
  <div class="trace-header">
    <span class="icon">🔍</span>
    <strong>TraceAgent</strong>
  </div>
  <p class="trace-message">Found no issues in this receipt.</p>
</div>

<style>
.trace-agent {
  width: 160px;
  flex-shrink: 0;
  padding: 1rem;
  background-color: white;
  border-left: 4px solid #3399ff;
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  border-radius: 0;
  margin-bottom: 1rem;
}

.trace-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}
.trace-message {
  margin: 0;
}
</style>
