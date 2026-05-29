# InkDropPH - Project Overview

## About InkDropPH
InkDropPH is a fictional premier printing and personalized merchandise service provider based in the Philippines. This project serves as a digital storefront and automation hub designed to streamline the custom printing business—from order placement to delivery and customer relationship management.

## Our Services
We specialize in high-quality, customized products including:
- **Paper Printing:** Business cards, flyers, brochures, and personalized stationery.
- **Apparel:** Custom-printed shirts, hoodies, and tote bags.
- **Promotional Items:** Branded mugs, notebooks, and pens.
- **Tech Accessories:** Personalized phone cases and laptop skins.
- **Souvenirs:** Custom gifts for weddings, birthdays, and corporate events.

## Technical Architecture
The platform is built on a modern, scalable stack designed for performance and seamless automation:

### 1. Frontend & Web Framework
- **Next.js 16 (App Router):** The core framework providing a fast, SEO-friendly, and responsive user experience.
- **React 19:** Leveraging the latest React features for efficient UI rendering.
- **Tailwind CSS 4:** Modern styling for a clean and professional aesthetic.
- **TypeScript:** Ensuring type safety and code reliability.

### 2. Backend & Data Management
- **Airtable (CRM):** Acts as the central database and Customer Relationship Management tool to track orders, inventory, and customer interactions.
- **Notion:** Used for internal wikis, project documentation, and client-facing knowledge bases.

### 3. Automation & Orchestration
- **n8n:** The engine that connects the entire ecosystem. It handles:
    - Order synchronization between the website and Airtable.
    - Automated email notifications and status updates.
    - Data bridging between Airtable and Notion.
    - Handling API webhooks for third-party integrations.

## How It Works
1. **Discovery & Order:** Customers browse services on the Next.js storefront.
2. **Data Capture:** Order details are captured and sent via n8n to **Airtable**.
3. **Workflow Trigger:** n8n triggers internal notifications (Email/Slack) and updates **Notion** documentations for the production team.
4. **CRM Management:** The business manages the customer lifecycle within Airtable, with automated updates synced back to the user via n8n.

## Project Goals
- Provide a seamless digital experience for custom print ordering.
- Automate repetitive administrative tasks to focus on quality production.
- Maintain a centralized source of truth for all business operations.
