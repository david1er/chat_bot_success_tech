const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

// Fonction pour convertir un JPG en PDF
async function convertJPGtoPDF(jpgPath, outputPath) {
  const jpgImageBytes = fs.readFileSync(jpgPath);
  const pdfDoc = await PDFDocument.create();
  const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
  const page = pdfDoc.addPage([jpgImage.width, jpgImage.height]);
  page.drawImage(jpgImage, {
    x: 0,
    y: 0,
    width: jpgImage.width,
    height: jpgImage.height,
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
}

// Fonction pour fusionner plusieurs PDF
async function mergePDFs(pdfPaths, outputPath) {
  const mergedPdf = await PDFDocument.create();

  for (const path of pdfPaths) {
    const pdfBytes = fs.readFileSync(path);
    const pdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  fs.writeFileSync(outputPath, mergedPdfBytes);
}

// MAIN
(async () => {
  const jpgPath = 'scan.jpg';
  const jpgAsPdf = 'scan_converti.pdf';
  const finalMergedPdf = 'resultat_final.pdf';

  await convertJPGtoPDF(jpgPath, jpgAsPdf);

  const pdfsToMerge = ['fichier1.pdf', 'fichier2.pdf', 'fichier3.pdf', jpgAsPdf];
  await mergePDFs(pdfsToMerge, finalMergedPdf);

  console.log('Fusion terminée :', finalMergedPdf);
})();
