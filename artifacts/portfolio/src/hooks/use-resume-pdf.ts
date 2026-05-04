import { useState } from "react";

export function useResumePdf() {
  const [generating, setGenerating] = useState(false);

  const downloadPdf = async () => {
    setGenerating(true);
    try {
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import("jspdf"),
        import("html2canvas"),
      ]);

      const el = document.getElementById("resume-pdf-target");
      if (!el) return;

      el.style.display = "block";
      await new Promise((r) => setTimeout(r, 100));

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0a0d1a",
        logging: false,
      });

      el.style.display = "none";

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (imgHeight <= pageHeight) {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      } else {
        let y = 0;
        while (y < imgHeight) {
          pdf.addImage(imgData, "PNG", 0, -y, imgWidth, imgHeight);
          y += pageHeight;
          if (y < imgHeight) pdf.addPage();
        }
      }

      pdf.save("Numan_Nadaf_Resume.pdf");
    } finally {
      setGenerating(false);
    }
  };

  return { downloadPdf, generating };
}
