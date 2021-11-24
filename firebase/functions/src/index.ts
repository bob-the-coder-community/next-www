import * as functions from "firebase-functions";
// import * as puppeteer from 'puppeteer';
import * as htmlPdf from "html-pdf";
import * as fs from "fs";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
// @ts-ignore
export const htmlToPdf = functions.https.onRequest(async (request, response) => {
  try {
    const {html} = request.body;
    const fileName = `/tmp/report-${Math.random()}.pdf`;
    // const browser = await puppeteer.launch({
    //   args: ["--no-sandbox", "--disable-setuid-sandbox"],
    //   ignoreHTTPSErrors: true,
    // });

    // const page = await browser.newPage();
    // await page.setContent(html);

    // await page.pdf({
    //   path: fileName,
    //   format: "a4",
    //   printBackground: true,
    // });

    htmlPdf.create(html, {
      format: "A4",
      type: "pdf",
    }).toFile(fileName, (err) => {
      if (err) {
        functions.logger.error(err);
        response.status(500).send(err);
        return;
      }

      response.status(200).json({
        message: 200,
        string: fs.readFileSync(fileName).toString("base64"),
      });

      return;
    });
  } catch (err) {
    functions.logger.error(err);
    return response.status(500).send(err);
  }
});
