#!/usr/bin/env node

const { copy, mkdir, readdir, readFile, writeFile } = require("fs-extra");
const Handlebars = require("handlebars");
const { dirname, resolve } = require("path");

const src = resolve(dirname(__dirname), "presentations");
const tmpl = resolve(dirname(__dirname), "templates");
const output = resolve(dirname(__dirname), "build");

Handlebars.registerHelper("isMarkdown", function(slide) {
  return slide.type === "markdown";
});

function isImage(file) {
  return file.endsWith(".png");
}

(async function() {
  let indexTemplate = Handlebars.compile(
    (await readFile(resolve(tmpl, `index.hbs`))).toString()
  );

  let presTemplate = Handlebars.compile(
    (await readFile(resolve(tmpl, `presentation.hbs`))).toString()
  );

  let presentations = await readdir(src);
  let manifests = [];

  for (let presentation of presentations) {
    let presPath = resolve(src, presentation);
    let outputPath = resolve(output, presentation);

    let presFiles = await readdir(presPath);
    let slides = await Promise.all(
      presFiles
        .filter(file => file !== "manifest.json" && !isImage(file))
        .sort()
        .map(async slide => {
          return {
            slide,
            type: slide.endsWith(".md") ? "markdown" : "raw",
            content: (await readFile(resolve(presPath, slide))).toString()
          };
        })
    );

    try {
      manifests.push(
        Object.assign(
          { presentation },
          JSON.parse(await readFile(resolve(presPath, "manifest.json")))
        )
      );
    } catch (e) {
      manifests.push({ presentation, title: presentation });
    }

    try {
      await mkdir(outputPath, { recursive: true });
    } catch (e) {
      if (e.code !== "EEXIST") {
        throw e;
      }
    }

    for (let image of presFiles.filter(isImage)) {
      await copy(resolve(presPath, image), resolve(outputPath, image));
    }

    for (let slide of slides.filter(s => s.type === "markdown")) {
      await writeFile(resolve(outputPath, slide.slide), slide.content);
    }

    await writeFile(
      resolve(outputPath, "index.html"),
      presTemplate({ slides })
    );
  }

  try {
    await mkdir(output, { recursive: true });
  } catch (e) {
    if (e.code !== "EEXIST") {
      throw e;
    }
  }

  await writeFile(resolve(output, "index.html"), indexTemplate({ manifests }));
})();
