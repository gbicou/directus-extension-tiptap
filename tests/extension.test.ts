import { describe, it, expect } from "vitest";
import { createDirectus, rest, staticToken, readExtensions } from "@directus/sdk";
import { name } from "../package.json";

describe("extension", () => {
  // directus client
  const directus = createDirectus(process.env.PUBLIC_URL as string)
    .with(rest())
    .with(staticToken(process.env.ADMIN_TOKEN as string));

  it("register correctly in directus", async () => {
    const extensions = await directus.request(readExtensions());

    expect(extensions).toBeDefined();
    expect(extensions.map((extension) => extension.schema?.name)).toContain(name);
  });
});
