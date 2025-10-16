# Mimicredit - Mimic Hackaton Trade Finance Automation Solution

This project is Demo integrating Mimic Protocol tasks for three roles: Exportador, Validador, Importador. It simulate credit lending to exporters with an NFT.
It includes a frontend app and skeleton integration with @mimicprotocol/sdk plus Mimic task manifests in the `mimic_tasks/` folder ready to be compiled with the Mimic CLI.

Explore Here other posible integrations to our team's main solution:


## 🌐 Other Possible Operations used by our solution & powered by Mimic



### 🔹 1. Prefunding & International Payments

**Scenario:**
An exporter issues a tokenized invoice. The buyer sends stablecoins from another blockchain or country.

How Mimic Works:

* Detects confirmed delivery (RFID + event).
* Checks FX rate (USD/USDC) and KYC/AML compliance.
* **Creates Intent:** `transfer USDC(50,000) from buyerVault → exporterVault`.
* **Executes** best route (bridge or DEX) and settles on-chain.

🧠 **Value:**
Transforms complex cross-border payments into deterministic, auditable blockchain transactions.

---

### 🔹 2. Automatic Loan & Factoring Settlement

**Scenario:**
A tokenized invoice is used as collateral for a DeFi loan.

**How Mimic Works:**

* **Monitors** price or buyer defaults.
* **Creates Intent:** `liquidate loanId`.
* **Finds** best DeFi pool (Aave, Compound, etc.) for recovery.
* **Executes** liquidation and returns funds.

🧠 **Value:**
Instant, objective, and decentralized response to financial events.

---

### 🔹 3. Automatic Currency Conversion

**Scenario:**
A company receives USDT (Tron) and must convert to USDC (Ethereum).

**How Mimic Works:**

* **Detects** USDT deposit.
* **Queries** FX rate and bridge fee.
* **Creates Intent:** `swap USDT → USDC on Ethereum`.
* **Executes** best cross-chain bridge or DEX route.

🧠 **Value:**
Optimized, automated liquidity routing across blockchains.

---

### 🔹 4. On-Chain Letters of Credit (LC)

**Scenario:**
A company issues a tokenized LC with delivery conditions.

**How Mimic Works:**

* **Detects** LC approval and verifies documents via oracle.
* **Creates Intent:** `lock USDC in LCvault`.
* **Chooses** funding source (L2 or yield pool).
* **Executes:** locks funds, mints LC NFT, and activates conditional contract.

🧠 **Value:**
Turns the traditional LC process into programmable on-chain intents.

---

### 🔹 5. Secure Allowance Rotation

**Scenario:**
A user grants temporary spending permission for a trade or payment.

**How Mimic Works:**

* **Detects** pending transaction (e.g. `bridgeAndPrefund`).
* **Creates Intent:** `approve USDC(5000)` for vault.
* **Executes** optimal `approve` and then auto-revokes after completion.

🧠 **Value:**
Automated allowance security — no more forgotten approvals.

---

### 🔹 6. Liquidity Rebalancing Across Vaults

**Scenario:**
Vaults on ETH, Polygon, and Arbitrum must stay proportionally funded.

**How Mimic Works:**

* **Monitors** vault balances.
* **Creates Intent:** `rebalance from Polygon → Ethereum`.
* **Executes** bridge transfer and updates records.

🧠 **Value:**
Smart capital optimization across the multichain ecosystem.

---

### 🚨 Compliance Automation (Pre-Intent)

Before any Intent is issued, Mimic can:

* Run KYC, sanction list, and invoice validations via *ZonaFranca Compliance API*.
* Enforce jurisdiction and user limits.
* Proceed only when all checks are OK.

✅ The Planning Layer also becomes a **Compliance Layer**.

---

### 🧭 Summary

| **Category**           | **Example Task**              | **Trigger Event**             |
| ---------------------- | ----------------------------- | ----------------------------- |
| International Payments | settleOnDelivery              | RFID or delivery event        |
| Loans & Factoring      | liquidateLoan, openCreditLine | Financial or collateral ratio |
| Cross-chain FX         | swapStablecoin                | Token receipt event           |
| On-chain LC            | lockForLC, releaseLC          | Document confirmation         |
| Security               | rotateAllowance               | Timer or transaction trigger  |
| Liquidity Management   | rebalanceVaults               | Balance threshold             |

---




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
