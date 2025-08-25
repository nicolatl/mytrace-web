<script>
  import { page } from "$app/stores";
  import { base } from "$app/paths";

  let pages = [
    { url: `${base}/`, title: "Data Receipts" },
    { url: `${base}/warnings`, title: "Warnings" },
    { url: `${base}/reports`, title: "Reports" }
  ];
</script>

<nav>
  <!-- Logo -->
  <div class="nav-item logo">MyTrace</div>

  <!-- Tabs -->
  {#each pages as p}
    <a
      href={p.url}
      class="nav-item"
      class:selected={$page.url.pathname === p.url}
    >
      {p.title}
    </a>
  {/each}

  <!-- Profile -->
  <div class="nav-item profile">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/></svg>
  </div>
</nav>

<slot />

<style>
  nav {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    background: white;
    font-size: 0.95rem;
  }

  .nav-item {
    flex: 1; 
    text-align: center;
    padding: 0.75rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-bottom: 0.5rem;
    text-decoration: none;
    color: #333;
    transition: background 0.2s, color 0.2s;
  }

  .logo {
    font-weight: 600;
    font-size: 1.1rem;
  }

  .nav-item:hover {
    background: #f5f5f5;
  }

  .nav-item.selected {
    background: #f0f0f0;
    font-weight: 500;
    border-radius: 6px;
  }

  .profile {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
