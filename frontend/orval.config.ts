import { defineConfig } from "orval";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  gymapp: {
    input: "./api.json", // your generated OpenAPI spec (from FastAPI)
    output: {
      mode: "tags-split",
      namingConvention: "kebab-case",
      baseUrl: "http://localhost:8000", // load from .env
      target: "src/api/endpoints",
      schemas: "src/api/model",
      fileExtension: ".gen.ts",
      client: "react-query", // or "axios" if you prefer
      mock: false, // disable unless you need mocks
      override: {
        mutator: {
          path: "src/api/mutator/custom-instance.ts",
          name: "customInstance",
        },
      },
    },
    hooks: {
      afterAllFilesWrite: "npx prettier --write",
    },
  },
});
