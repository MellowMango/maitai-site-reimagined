# Third-Party Integrations Setup Guide

This document outlines the necessary third-party services and credentials required for the Maitai Marketing Site (v2).

## Required Integrations (Based on Tech Stack & Blueprint)

1.  **Google reCAPTCHA v3**
    *   **Purpose:** Anti-spam protection for the Demo Request form.
    *   **Credentials Needed:** `Site Key` and `Secret Key`.
    *   **Environment Variables:** `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`
    *   **Setup Link:** [https://www.google.com/recaptcha/admin/create](https://www.google.com/recaptcha/admin/create)

2.  **SendGrid**
    *   **Purpose:** Sending email notifications upon Demo Request form submission.
    *   **Credentials Needed:** `API Key`. Also requires a verified sender email address.
    *   **Environment Variables:** `SENDGRID_API_KEY`, `SENDGRID_FROM`
    *   **Setup Link:** [https://app.sendgrid.com/settings/api_keys](https://app.sendgrid.com/settings/api_keys)

3.  **Sentry**
    *   **Purpose:** Real-time error tracking and monitoring for the frontend application.
    *   **Credentials Needed:** `DSN (Data Source Name)`.
    *   **Environment Variables:** `SENTRY_DSN`
    *   **Setup Link:** Create a new project at [https://sentry.io/](https://sentry.io/) -> Project Settings -> Client Keys (DSN).

4.  **GitHub**
    *   **Purpose:** Source code hosting and triggering CI/CD workflows via GitHub Actions.
    *   **Credentials Needed:** Access to the repository. Configuration is done via `.github/workflows/ci.yml`.
    *   **Setup Link:** N/A (Repository already exists).

5.  **Vercel**
    *   **Purpose:** Hosting, CI/CD (deployment), Analytics.
    *   **Credentials Needed:** Vercel account connected to the GitHub repository. Environment variables need to be set in the Vercel project settings.
    *   **Setup Link:** [https://vercel.com/](https://vercel.com/) (Connect GitHub repo, configure project settings).

6.  **Google Analytics (via Vercel Analytics)**
    *   **Purpose:** Website traffic analysis. Vercel Analytics provides this, often integrating with GA or offering its own dashboard. The `@vercel/analytics` package is already installed.
    *   **Credentials Needed:** Enabled via Vercel project settings. May require linking a Google Analytics account (GA4 Property ID) depending on Vercel's configuration options.
    *   **Environment Variables:** Potentially `NEXT_PUBLIC_GA_ID` if direct GA integration is chosen over Vercel's default.
    *   **Setup Link:** Vercel Dashboard -> Project -> Analytics Tab. Check Vercel documentation for GA4 integration steps if needed.

7.  **Intercom**
    *   **Purpose:** Live chat widget for user support and engagement.
    *   **Credentials Needed:** `App ID`.
    *   **Environment Variables:** `NEXT_PUBLIC_INTERCOM_APP_ID`
    *   **Setup Link:** [https://app.intercom.com/](https://app.intercom.com/) -> Settings (bottom-left) -> Installation -> Web -> Get App ID.

## Potential / Future Integrations

1.  **CRM Integration (e.g., HubSpot, Salesforce)**
    *   **Purpose:** Automatically sending Demo Request leads/contacts into the company's CRM system.
    *   **Credentials Needed:** API Key, Endpoint URLs, specific field mappings. This depends heavily on the chosen CRM.
    *   **Environment Variables:** Will vary (e.g., `HUBSPOT_API_KEY`, `SALESFORCE_CLIENT_ID`, etc.)
    *   **Setup Link:** Specific to the CRM vendor (e.g., [https://developers.hubspot.com/](https://developers.hubspot.com/), [https://developer.salesforce.com/](https://developer.salesforce.com/)).
    *   **Action:** Identify which CRM Maitai uses (if any) and determine the integration requirements.

2.  **Marketing Automation (e.g., Mailchimp, Customer.io)**
    *   **Purpose:** Adding demo requesters to specific email lists or marketing campaigns.
    *   **Credentials Needed:** API Key, List IDs.
    *   **Environment Variables:** Will vary.
    *   **Setup Link:** Specific to the vendor.
    *   **Action:** Determine if integration with a marketing automation platform is required.

3.  **Content Management System (CMS) (e.g., Sanity, Contentful, Notion)**
    *   **Purpose:** Managing website content (like blog posts, potentially landing page copy) outside the codebase. Mentioned in "Future Enhancements".
    *   **Credentials Needed:** API Keys, Project IDs, potentially CDN URLs.
    *   **Environment Variables:** Will vary (e.g., `NEXT_PUBLIC_SANITY_PROJECT_ID`, `CONTENTFUL_SPACE_ID`).
    *   **Setup Link:** Specific to the CMS vendor.
    *   **Action:** Consider if/when a CMS is needed for content flexibility.

---
*This list should be reviewed and updated as project requirements evolve.* 