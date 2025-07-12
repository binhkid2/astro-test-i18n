### If deploy = cloudflare
```
 vite: {
    resolve: {
      alias: import.meta.env.PROD && {
        "react-dom/server": "react-dom/server.edge",
      },
    },
  },
 adapter: cloudflare(),
       output: "server",

       ```