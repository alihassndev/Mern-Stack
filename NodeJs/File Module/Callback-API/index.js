import * as fs from "fs";

await fs.mkdir("d:\\nodejs", (error) => {
  if (error) throw error;

  console.log("Create Directory");
});
