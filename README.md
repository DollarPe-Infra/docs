# Mintlify Starter Kit

Welcome to the Mintlify Starter Kit. This template provides a comprehensive setup for creating and managing your documentation, including:

- Guide pages
- Navigation
- Customizations
- API Reference pages
- Integration of popular components

## Development Setup

To preview documentation changes locally, install the [Mintlify CLI](https://www.npmjs.com/package/mintlify). Use the following command to install it globally:

```bash
npm i -g mintlify
```

Navigate to the root of your documentation (where `docs.json` is located) and run:

```bash
mintlify dev
```

## Adding an Endpoint to Mintlify Documentation

To integrate a new API endpoint into your documentation, follow these detailed steps:

1. **Verify or Create Endpoint Section:**
   - Check if the endpoint section folder (e.g., "payout", "kyc") exists.
   - If absent, create a new directory for the API section.
   - Within this directory, create a new `apiEndpoints.json` file and define the new endpoint's schema.
   - Ensure the schema includes an `"x-title"` key. This key is crucial for generating MDX files with the specified name, ensuring consistency in the documentation.
   - Update the `allEndpointServices` array in the `api-reference/automateOpenApiFileGeneration.js` cron script to facilitate MDX file creation for this API section.

2. **Define Endpoint URL:**
   - Add the endpoint URL under the `servers` key in the API schema.

3. **Generate MDX Files:**
   - Execute the `api-reference/automateOpenApiFileGeneration.js` cron script. This will generate new MDX files and update the `api-reference/openApi.json` file with the new schema.

4. **Preview and Validate:**
   - Run the `mintlify dev` command to launch a preview. Verify that all changes are correctly reflected and functioning as expected.

## Publishing Changes

To automate deployment, install our GitHub App. This app will automatically propagate changes from your repository to your deployment. Changes are deployed to production upon pushing to the default branch. You can find the installation link on your dashboard.

### Troubleshooting

- **Mintlify dev isn't running:** Execute `mintlify install` to reinstall dependencies.
- **Page loads as a 404:** Ensure you are operating within a directory containing `docs.json`.

---