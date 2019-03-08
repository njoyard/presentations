#!/usr/bin/env node

const { mkdir, readdir, readFile, writeFile } = require("fs-extra");
const Handlebars = require("handlebars");
const { dirname, resolve } = require("path");

const src = resolve(dirname(__dirname), "presentations");
const tmpl = resolve(dirname(__dirname), "templates");
const output = resolve(dirname(__dirname), "build");

Handlebars.registerHelper("isMarkdown", function(slide) {
  return slide.type === "markdown";
});

(async function() {
  let presTemplate = Handlebars.compile(
    (await readFile(resolve(tmpl, `presentation.hbs`))).toString()
  );

  for (let presentation of await readdir(src)) {
    let presPath = resolve(src, presentation);
    let outputPath = resolve(output, presentation);

    let slides = await Promise.all(
      (await readdir(presPath)).sort().map(async slide => {
        return {
          slide,
          type: slide.endsWith(".md") ? "markdown" : "raw",
          content: (await readFile(resolve(presPath, slide))).toString()
        };
      })
    );

    try {
      await mkdir(outputPath, { recursive: true });
    } catch (e) {
      if (e.code !== "EEXIST") {
        throw e;
      }
    }

    for (let slide of slides.filter(s => s.type === "markdown")) {
      await writeFile(resolve(outputPath, slide.slide), slide.content);
    }

    await writeFile(
      resolve(outputPath, "index.html"),
      presTemplate({ slides })
    );
  }
})();
