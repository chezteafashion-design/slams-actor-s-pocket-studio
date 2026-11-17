import { writeFileSync } from "node:fs";
import { GENERATED_DOCS } from "../src/domain/constitution-docs";

for (const doc of GENERATED_DOCS) {
  writeFileSync(doc.file, doc.render());
  console.log("wrote", doc.file);
}
