import { defineConfig } from "vitest/config";
import { config } from "dotenv";

export default defineConfig(({ mode }) => {
  return {
    test: {
      include: ["tests/*.{test,spec}.{js,ts}"],
      env: { ...config({ path: `.env.${mode}` }).parsed },
    },
  };
});
