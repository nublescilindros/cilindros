import pdf from "html-pdf";

export const pdfCreate = (options: any, documentName: string, html: string) =>
new Promise((resolve, reject) => {
  pdf.create(html, options).toFile(documentName, (err:any, res:any) => {
    if (err) {
      reject(err);
    } else {
      resolve(res.filename);
    }
  });
});
