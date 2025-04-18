const fs = require('fs');
const path = require('path');

const allEndpointServices = ["payout", "payin", "customer", "kyc", "bank", "organizations"];
const openApiPath = path.join(__dirname, 'openapi.json');
const baseDir = path.join(__dirname, 'endpoint');

// Function to merge all API endpoint paths into openapi.json
function mergeAllApiEndpointPaths() {
  try {
    // Read the existing openapi.json
    const openApiData = JSON.parse(fs.readFileSync(openApiPath, 'utf8'));

    // Initialize an object to hold all paths
    let allEndpointPaths = {};

    // Merge paths from each service
    for (const service of allEndpointServices) {
      const serviceApiPath = path.join(__dirname, `./endpoint/${service}/apiEndpoints.json`);
      if (fs.existsSync(serviceApiPath)) {
        const serviceApiPaths = JSON.parse(fs.readFileSync(serviceApiPath, 'utf8'));
        allEndpointPaths = {
          ...allEndpointPaths,
          ...serviceApiPaths,
        };
      } else {
        console.warn(`File not found: ${serviceApiPath}`);
      }
    }

    // Update the paths in the openapi.json data
    openApiData.paths = allEndpointPaths;

    // Write the updated openapi.json back to the file
    fs.writeFileSync(openApiPath, JSON.stringify(openApiData, null, 2));
    console.log("Successfully merged all API paths into openapi.json");

  } catch (error) {
    console.error("Error merging API paths:", error);
  }
}

// Function to create MDX files for each API endpoint
function createMdxFiles() {
  try {
    // Read and parse the openapi.json file
    const openApiData = JSON.parse(fs.readFileSync(openApiPath, 'utf8'));

    // Iterate over each path in the openapi.json
    for (const [endpoint, methods] of Object.entries(openApiData.paths)) {
      for (const [method, details] of Object.entries(methods)) {
        // Determine the service directory based on the endpoint
        const service = endpoint.split('/')[1]; // Assumes the service is the first segment after the initial slash
        const serviceDir = path.join(baseDir, service);
        const endpointName = endpoint.split('/').slice(2).join('-'); // Use the rest of the path for the filename

        // Ensure the service directory exists
        if (!fs.existsSync(serviceDir)) {
          fs.mkdirSync(serviceDir, { recursive: true });
        }

        // Create a filename based on the endpoint and method
        const fileName = `${endpointName}.mdx`;
        const filePath = path.join(serviceDir, fileName);

        // Check if the file already exists
        if (fs.existsSync(filePath)) {
          console.log(`File already exists, skipping: ${filePath}`);
          continue; // Skip to the next iteration if the file exists
        }

        // Generate the MDX content with only title and openapi
        const mdxContent = `---
title: '${details['x-title'] || 'API Endpoint'}'
openapi: '${method.toUpperCase()} ${endpoint}'
---
`;

        // Write the MDX content to a file
        fs.writeFileSync(filePath, mdxContent);
        console.log(`Created MDX file: ${filePath}`);
      }
    }
  } catch (error) {
    console.error('Error creating MDX files:', error);
  }
}

// Execute both functions
mergeAllApiEndpointPaths();
createMdxFiles();