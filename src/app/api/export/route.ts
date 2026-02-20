import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // PDF生成用のHTMLテンプレートを構築（面付けロジックを含む）
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          @page { size: A4 landscape; margin: 0; }
          body { margin: 0; padding: 0; font-family: sans-serif; }
          .sheet { width: 297mm; height: 210mm; display: flex; position: relative; overflow: hidden; page-break-after: always; }
          .page { width: 148.5mm; height: 210mm; border: 0.1mm solid #eee; box-sizing: border-box; padding: 20mm; }
          .title { font-size: 24pt; font-weight: bold; text-align: center; margin-top: 50mm; }
        </style>
      </head>
      <body>
        <div class="sheet">
          <div class="page">裏表紙 (P4)</div>
          <div class="page text-center">
            <div class="title">${data.title || '東京・箱根の旅'}</div>
            <p style="text-align:center">旅のしおり</p>
          </div>
        </div>
        <div class="sheet">
          <div class="page">P2 (行程表)</div>
          <div class="page">P3 (持ち物)</div>
        </div>
      </body>
      </html>
    `;

    const executablePath = await chromium.executablePath();
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: (chromium as { defaultViewport?: { width: number, height: number } }).defaultViewport || { width: 1280, height: 720 },
      executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdf = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
    });

    await browser.close();

    // NextResponseに渡すためにBufferに変換（TypeScriptの型エラー回避）
    const response = new NextResponse(Buffer.from(pdf));
    response.headers.set("Content-Type", "application/pdf");
    response.headers.set("Content-Disposition", `attachment; filename="travel-guide.pdf"`);

    return response;
  } catch (error: unknown) {
    console.error("PDFエクスポートエラー:", error);
    return NextResponse.json({ error: "PDF生成に失敗しました" }, { status: 500 });
  }
}
