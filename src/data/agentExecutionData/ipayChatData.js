export const ipayChatConfig = {
  title: "iPay - Payables Agent",
  runId: "RUN-IPAY-20250622-0041",
  startedAt: "2025-06-22 00:41:18 UTC",
  priority: "P2 - High",
  trigger: "User Query: Invoice not generated - Error E4502",
  relatedIncidents: ["INC384521"],
  tools: [
    "iPay Payables Agent",
    "Finance Agent",
    "Invoice Interface Correction Agent",
    "ServiceNow Agent"
  ],
};

export const ipayChatSteps = [
  {
    title: "Step 1: Incident Creation & Tracking",
    description: "iPay Agent receives user query about missing invoice and creates a ServiceNow tracking incident for audit trail.",
    details: [
      { icon: "fas fa-headset", text: "User query received: Why is my invoice not generated?" },
      { icon: "fas fa-ticket-alt", text: "ServiceNow Incident INC384521 created automatically" },
      { icon: "fas fa-robot", text: "iPay Agent acknowledged query and initiated investigation workflow" },
      { icon: "fas fa-exchange-alt", text: "Delegating to Finance Agent for invoice database lookup" }
    ]
  },
  {
    title: "Step 2: Finance Agent - Invoice Lookup",
    description: "Finance Agent connects to invoice database and attempts to locate the requested invoice record.",
    details: [
      { icon: "fas fa-database", text: "Finance Agent: Connecting to invoice database" },
      { icon: "fas fa-search", text: "Querying invoice records for matching transaction" },
      { icon: "fas fa-times-circle", text: "Invoice not found in system - record absent" },
      { icon: "fas fa-exclamation-triangle", text: "Error condition detected - escalating to interface check" }
    ]
  },
  {
    title: "Step 3: Error Code Detection",
    description: "Finance Agent identifies Error Code E4502 indicating an invoice interface configuration mismatch between SAP and ERP systems.",
    details: [
      { icon: "fas fa-bug", text: "Error Code E4502 detected in interface layer" },
      { icon: "fas fa-file-code", text: "Root cause: Invoice interface configuration mismatch" },
      { icon: "fas fa-network-wired", text: "SAP-ERP interface mapping failure identified" },
      { icon: "fas fa-arrow-right", text: "Invoking Invoice Interface Correction Agent for remediation" }
    ]
  },
  {
    title: "Step 4: Interface Remediation",
    description: "Invoice Interface Correction Agent applies automated fix to SAP-ERP interface mapping and corrects data field alignment.",
    details: [
      { icon: "fas fa-wrench", text: "Updating SAP-ERP interface mapping configuration" },
      { icon: "fas fa-align-left", text: "Correcting data field alignment between systems" },
      { icon: "fas fa-cogs", text: "Validating updated configuration parameters" },
      { icon: "fas fa-flask", text: "Testing invoice generation with corrected interface" }
    ]
  },
  {
    title: "Step 5: Invoice Retry & Generation",
    description: "Finance Agent retries invoice generation with corrected interface. Invoice is successfully created and queued for payment.",
    details: [
      { icon: "fas fa-redo", text: "Finance Agent: Retrying invoice generation" },
      { icon: "fas fa-check-circle", text: "Invoice generated successfully: INV-2024-67832" },
      { icon: "fas fa-dollar-sign", text: "Amount: $12,450.00 | Supplier: ABC Corporation" },
      { icon: "fas fa-clipboard-check", text: "Status: Approved & Queued for Payment" },
      { icon: "fas fa-calendar-alt", text: "Estimated Payment Date: December 27, 2025" }
    ]
  },
  {
    title: "Step 6: Resolution Summary",
    description: "Complete resolution summary compiled with all actions taken, error details, and outcome confirmation.",
    details: [
      { icon: "fas fa-check-double", text: "Error Code E4502 identified and corrected" },
      { icon: "fas fa-sync-alt", text: "Interface configuration updated successfully" },
      { icon: "fas fa-file-invoice-dollar", text: "Invoice INV-2024-67832 generated and processed" },
      { icon: "fas fa-money-bill-wave", text: "Payment workflow initiated for $12,450.00" }
    ]
  },
  {
    title: "Step 7: ServiceNow Incident Closure",
    description: "ServiceNow Agent updates incident INC384521 with full resolution details and marks it as Resolved.",
    details: [
      { icon: "fas fa-edit", text: "ServiceNow Agent: Updating incident INC384521 with resolution details" },
      { icon: "fas fa-check-square", text: "Incident INC384521 marked as Resolved" },
      { icon: "fas fa-clipboard-list", text: "Resolution notes: E4502 interface mismatch corrected, invoice generated" },
      { icon: "fas fa-flag-checkered", text: "iPay Agent workflow complete - awaiting further user queries" }
    ]
  }
];
