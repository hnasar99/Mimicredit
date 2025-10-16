# ZonaFranca Mimic Demo (Vite + React)

This project is a Vite React demo integrating Mimic Protocol tasks for three roles: Exportador, Validador, Importador.
It includes a frontend app and skeleton integration with @mimicprotocol/sdk plus Mimic task manifests in the `mimic_tasks/` folder ready to be compiled with the Mimic CLI.

## Setup

1. Install deps
   ```bash
   npm install
   ```

2. Create `.env` file (copy `.env.example`) and fill variables for testnet.

3. Run dev server
   ```bash
   npm run dev
   # open http://localhost:5173
   ```

## Mimic tasks

The folder `mimic_tasks/` contains three tasks (`create_document`, `validate_and_fund`, `settle_transfer`) with `manifest.yaml` and `src/task.ts` ready for `mimic codegen` and `mimic compile`.

Install Mimic CLI (globally):
```bash
yarn global add @mimicprotocol/cli
```

Example compile & deploy (inside task folder):
```bash
mimic codegen
mimic compile
mimic deploy --key <DEPLOY_KEY>
```

Once deployed, update the frontend `.env` with the task CIDs or contract addresses and the app will use the Mimic SDK to create/submit tasks.
