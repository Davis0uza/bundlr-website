import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            clientData,
            selectedPackage,
            paymentMode,
            upfrontAmount,
            monthlyCaucao,
            totalMonthlyFee,
            activeMonthlyServices
        } = body;

        const apiKey = process.env.BREVO_API_KEY;
        const senderEmail = process.env.BREVO_SENDER_EMAIL || "pedromzmedical@gmail.com";
        const senderName = process.env.BREVO_SENDER_NAME || "Pedro Costa — Mz Medical";

        if (!apiKey || apiKey.includes("COLE_AQUI")) {
            console.warn("⚠️ BREVO_API_KEY não configurada ou inválida em .env.local.");
            return NextResponse.json({
                success: false,
                error: "API Key do Brevo não configurada em .env.local."
            }, { status: 400 });
        }

        const formatNum = (v: number) =>
            v.toLocaleString("pt-PT", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

        const servicesHtml = activeMonthlyServices?.length > 0
            ? activeMonthlyServices.map((s: { title: string; isFreeOffer: boolean; price: number }) =>
                `<li><strong>${s.title}</strong>: ${s.isFreeOffer ? "0 € (OFERTA 3 Meses)" : `${s.price} €/mês`}</li>`
            ).join("")
            : "<li>Nenhum serviço mensal adicional selecionado</li>";

        const paymentDesc = paymentMode === "half"
            ? "50% na Adjudicação + 50% na Entrega Final"
            : `Pagamento Mensal em ${selectedPackage.monthsCount} mensalidades de ${formatNum(selectedPackage.monthlyPayment)} €/mês`;

        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f0fdf4; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #d1fae5; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
            .header { background: linear-gradient(135deg, #059669, #047857); color: #ffffff; padding: 30px 25px; text-align: center; }
            .header h1 { margin: 0; font-size: 22px; font-weight: 700; }
            .header p { margin: 5px 0 0; opacity: 0.9; font-size: 14px; }
            .content { padding: 30px 25px; }
            .box { background: #f0fdf4; border: 1.5px solid #10b981; border-radius: 12px; padding: 20px; margin: 20px 0; }
            .box h3 { margin-top: 0; color: #064e3b; font-size: 16px; }
            .table-data { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 14px; }
            .table-data td { padding: 8px 0; border-bottom: 1px solid rgba(16, 185, 129, 0.15); }
            .bank-box { background: #f8faf9; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; margin-top: 20px; }
            .bank-box h3 { margin-top: 0; color: #064e3b; font-size: 16px; }
            .footer-note { background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 10px; padding: 15px; margin-top: 24px; font-size: 13px; color: #1e293b; }
            .footer { font-size: 12px; color: #64748b; text-align: center; padding: 20px; background: #f8faf9; border-top: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Proposta Comercial &amp; Otimização B2B</h1>
              <p>mzmedical.com.br</p>
            </div>
            <div class="content">
              <p>Olá <strong>${clientData.nome}</strong>,</p>
              <p>Obrigado pela sua escolha. Confirmamos a receção do seu pedido de contratação para a otimização técnica, SEO e suporte B2B do site <strong>mzmedical.com.br</strong>.</p>
              
              <div class="box">
                <h3>Resumo do Plano Selecionado</h3>
                <table class="table-data">
                  <tr><td><strong>Plano:</strong></td><td>${selectedPackage.tier} — ${selectedPackage.title} (${formatNum(selectedPackage.totalPrice)} €)</td></tr>
                  <tr><td><strong>Modalidade:</strong></td><td>${paymentDesc}</td></tr>
                  <tr><td><strong>Serviços Mensais:</strong></td><td><ul style="margin:0; padding-left:18px;">${servicesHtml}</ul></td></tr>
                  ${monthlyCaucao > 0 ? `<tr><td><strong>Caução 1.º Mês Serv. Mensais:</strong></td><td>${formatNum(monthlyCaucao)} €</td></tr>` : ''}
                  <tr><td><strong>Montante Inicial na Adjudicação:</strong></td><td style="font-size:16px; font-weight:bold; color:#059669;">${formatNum(upfrontAmount)} €</td></tr>
                </table>
              </div>

              <div class="bank-box">
                <h3>Dados para Transferência Bancária</h3>
                <p style="margin:6px 0;"><strong>Titular:</strong> Pedro Duarte Costa</p>
                <p style="margin:6px 0;"><strong>NIF:</strong> 231798423</p>
                <p style="margin:6px 0;"><strong>IBAN:</strong> PT50003502100002261490090</p>
                <p style="margin:6px 0;"><strong>Banco:</strong> Caixa Geral de Depósitos (CGD)</p>
                <p style="margin:10px 0 0; color:#059669; font-weight:bold; font-size:15px;"><strong>Valor Inicial a Transferir:</strong> ${formatNum(upfrontAmount)} €</p>
              </div>

              <div class="footer-note">
                <p style="margin:0 0 8px 0;">📬 <strong>Envio de Comprovativo:</strong> Após efetuar a transferência bancária do montante inicial, por favor envie o comprovativo para <a href="mailto:bundlr.solutions@gmail.com" style="color:#059669; font-weight:bold; text-decoration:none;">bundlr.solutions@gmail.com</a>.</p>
                <p style="margin:0; font-size:12px; color:#64748b;"><em>Nota: Este é um e-mail automático. Por favor, não responda diretamente a esta mensagem.</em></p>
              </div>
            </div>
            <div class="footer">
              <p>Proposta Comercial Mz Medical · Válida por 30 Dias</p>
            </div>
          </div>
        </body>
        </html>
        `;

        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": apiKey.trim(),
            },
            body: JSON.stringify({
                sender: { name: senderName, email: senderEmail },
                to: [{ email: clientData.email, name: clientData.nome }],
                subject: `Proposta Comercial & Adjudicação — ${selectedPackage.title} (${clientData.nome})`,
                htmlContent: htmlContent,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("❌ Erro Brevo API:", data);
            return NextResponse.json({ success: false, error: data }, { status: response.status });
        }

        console.log("✅ Email enviado via Brevo com sucesso! Message ID:", data.messageId);
        return NextResponse.json({ success: true, messageId: data.messageId });
    } catch (error: any) {
        console.error("❌ Erro no envio de e-mail:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
