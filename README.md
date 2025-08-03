# SF Benefits Check

**A secure, agentic system to instantly verify eligibility for government benefits using document analysis.**

**[Try the live demo!](https://medicaid-benefits.vercel.app/)**

## The Problem

Applying for government benefits like Medicaid and SNAP is a notoriously difficult process. Millions of low-income Americans who qualify for aid are deterred by confusing documentation requirements, complex forms, and bureaucratic friction. Recent legislation aimed at preventing fraud has inadvertently added more layers of documentation, increasing the administrative burden on both applicants and caseworkers. The result is a slow, frustrating system that leaves vulnerable people without the support they need.

## The Solution

**SF Benefits Check** is a private, secure, and fast web app that helps individuals instantly check their eligibility for benefits. Instead of manually filling out forms, users simply upload their existing documents, and our intelligent system does the rest.

We cut through the administrative red tape by providing a clear, immediate, and actionable eligibility assessment.

## How It Works: An Agentic Approach

SF Benefits Check is NOT a web form; it's an AI agent that mimics the workflow of an expert caseworker.

1.  **📄 Document Processing & Data Extraction:** The user uploads their documents (e.g., ID card, pay stubs, utility bills). Our first agent uses Google's **Gemini 1.5 Pro** model to perform multi-modal analysis, reading text and data from these files—whether they are PDFs, JPGs, or PNGs—and structuring the key information (name, income, address, etc.).

2.  **🧠 Retrieval-Augmented Generation (RAG):** The structured data is then passed to a search agent. This agent queries a specialized knowledge base, powered by a **Pinecone vector database**, which contains the latest federal, state, and local regulations (initially focused on San Francisco). It intelligently retrieves the specific rules and policies relevant to the user's unique situation.

3.  **🤖 Final Analysis & Synthesis:** Finally, our primary reasoning agent, using **Gemini 2.5 Pro**, receives both the user's extracted data and the relevant legal rules from the RAG search. It acts as an expert analyst, cross-referencing the user's data against the regulations to determine eligibility. It performs the necessary calculations (e.g., checking income against the Federal Poverty Level) and synthesizes a comprehensive, easy-to-understand answer.

The entire process is orchestrated using **LangGraph.js**, allowing for this complex, multi-step workflow to run seamlessly.

## Features

-   **Instant Eligibility Check:** Get a clear "Eligible" or "Not Eligible" result in under two minutes.
-   **Clear Explanations:** The system explains *why* a determination was made, citing the specific regulations.
-   **Actionable Next Steps:** Provides users with a clear path forward, including links to official applications.
-   **Missing Document Identification:** Highlights any missing documents required for a successful official application.
-   **Privacy First:** All document processing is done securely, and user data is not stored long-term.

## Getting Started

You can try the live demo at **[medicaid-benefits.vercel.app](https://medicaid-benefits.vercel.app/)** or run the project locally by following these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rsvedant/medicaid-benefits.git
    cd medicaid-benefits
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Set up environment variables:**
    Copy the `.env.example` file to a new file named `.env` and fill in your credentials.
    ```bash
    cp .env.example .env
    ```

4.  **Run the development server:**
    ```bash
    bun dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Next Steps: The Future Roadmap

SF Benefits Check is currently a proof-of-concept focused on San Francisco. The underlying agentic architecture, however, is built to scale. Here is a glimpse into our future roadmap:

*   **Phase 1: The City Dashboard**
    *   An analytics platform for municipal governments. City officials could view anonymized, aggregated data on benefits applications. They could identify where citizens struggle most (e.g., "70% of applicants are missing proof of residency"), pinpoint bottlenecks in the system, and allocate resources more effectively—all without compromising individual privacy.

*   **Phase 2: Decentralized Benefits Passport**
    *   Empower citizens with a self-sovereign "Benefits Passport" using Decentralized Identifiers (DIDs) and Verifiable Credentials (VCs). After a one-time verification with BenefitsCheck, a user could hold a cryptographically secure credential proving their eligibility. They could then grant temporary, revocable access to this credential to any government agency (health, housing, food services), eliminating the need to re-apply and re-submit the same documents over and over. The citizen, not the government, controls the data.

*   **Phase 3: Proactive & Predictive Social Safety Net**
    *   The system evolves from reactive to proactive. By integrating with municipal data streams (with user consent and extreme anonymization), the system could predict which demographics or neighborhoods are at highest risk of needing support. This allows for preemptive outreach and resource allocation *before* a crisis hits. The agent could send a notification: "A new housing subsidy was just passed that you qualify for. Would you like to apply?"

*   **Phase 4: The Autonomous Caseworker**
    *   The final evolution. A fully autonomous agent that, with explicit user permission, not only checks eligibility but also navigates complex government portals, fills out the official applications, tracks their status, and manages the entire lifecycle of a citizen's benefits. This creates a seamless, lifelong social support system, ensuring that bureaucracy never again stands in the way of basic human needs.