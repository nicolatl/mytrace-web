<script>
    import { page } from "$app/stores";
    let pages = [
        { url: "./", title: "Data Receipts" },
        { url: "./warnings", title: "Warnings" },
        { url: "./reports", title: "Reports" },
        { url: "./attestations", title: "OTrace Attestations" },
        { url: "./newreport", title: "New Report" }
    ];

</script>

<html lang="en">
    <nav>
        {#each pages as p}
            <a href={p.url} class:current={"." + $page.route.id === p.url}>
                {p.title}
            </a>
        {/each}
    </nav>
</html>
<style>
    nav {
        --border-color: oklch(50% 10% 200 / 40%);
        display: flex;
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
    }
    nav a {
        flex: 1;
        text-decoration: none;
        color: inherit;
        text-align: center;
        padding: 0.5em;
    }
    nav a.current {
        border-bottom: 0.4em solid var(--border-color);
        padding-bottom: 0.1em;
    }
    nav a:hover {
        border-bottom: 0.4em solid var(--color-accent);
        padding-bottom: 0.1em;
    }
</style>
<slot />