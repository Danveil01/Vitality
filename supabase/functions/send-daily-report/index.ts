// @ts-ignore: Deno types are handled by Supabase at runtime
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// @ts-ignore: Deno types are handled by Supabase at runtime
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// @ts-ignore: Deno types are handled by Supabase at runtime
import { Resend } from "https://esm.sh/resend@2.0.0";

// Initialize Resend with the Environment Variable
// @ts-ignore: Deno is available in Supabase Edge Functions
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DailyReportRequest {
  daily_record_id: string;
  record_date: string;
  total_bags: number;
  total_sales: number;
  total_fuel: number;
  total_expenses: number;
  net_total: number;
  driver_entries: Array<{
    driver_name: string;
    bags_delivered: number;
    sales_amount: number;
    fuel_cost: number;
    net_sales: number;
  }>;
  expenses: Array<{
    description: string;
    amount: number;
  }>;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Vitality: send-daily-report function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // @ts-ignore: Deno is available in Supabase Edge Functions
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    // @ts-ignore: Deno is available in Supabase Edge Functions
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Identify the sender via Auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) throw new Error("Invalid user session");

    const reportData: DailyReportRequest = await req.json();

    // Fetch super admin emails from the database
    const { data: emailsResult, error: emailsError } = await supabase
      .rpc('get_super_admin_emails');

    if (emailsError) throw new Error("Failed to fetch super admin emails");

    const superAdminEmails: string[] = emailsResult || [];

    if (superAdminEmails.length === 0) {
      return new Response(
        JSON.stringify({ message: "No recipients found." }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const formattedDate = new Date(reportData.record_date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Generate Table Rows for Email
    const driverRows = reportData.driver_entries.map(entry => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${entry.driver_name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${entry.bags_delivered}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">₦${entry.sales_amount.toLocaleString()}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">₦${entry.fuel_cost.toLocaleString()}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #0284c7;">₦${entry.net_sales.toLocaleString()}</td>
      </tr>
    `).join('');

    const expenseRows = reportData.expenses.length > 0 
      ? reportData.expenses.map(exp => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${exp.description}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">₦${exp.amount.toLocaleString()}</td>
        </tr>
      `).join('')
      : '<tr><td colspan="2" style="padding: 8px; text-align: center; color: #6b7280;">No additional expenses recorded.</td></tr>';

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: sans-serif; background-color: #f4f7f6; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="background-color: #0284c7; padding: 25px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 20px;">🌿 Vitality Daily Report</h1>
            <p style="color: #e0f2fe; margin: 5px 0 0 0;">${formattedDate}</p>
          </div>
          
          <div style="padding: 20px;">
            <div style="display: flex; gap: 10px; margin-bottom: 20px; text-align: center;">
              <div style="flex: 1; background: #f0f9ff; padding: 10px; border-radius: 6px;">
                <div style="font-weight: bold; color: #0369a1;">₦${reportData.total_sales.toLocaleString()}</div>
                <div style="font-size: 10px; color: #64748b;">Total Sales</div>
              </div>
              <div style="flex: 1; background: #f0fdf4; padding: 10px; border-radius: 6px;">
                <div style="font-weight: bold; color: #15803d;">₦${reportData.net_total.toLocaleString()}</div>
                <div style="font-size: 10px; color: #64748b;">Net Profit</div>
              </div>
            </div>

            <h3 style="font-size: 16px; border-bottom: 1px solid #edf2f7; padding-bottom: 8px;">Driver Performance</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              ${driverRows}
            </table>

            <h3 style="font-size: 16px; border-bottom: 1px solid #edf2f7; padding-bottom: 8px; margin-top: 20px;">General Expenses</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              ${expenseRows}
            </table>
          </div>

          <div style="background-color: #f8fafc; padding: 15px; text-align: center; font-size: 11px; color: #94a3b8;">
            Vitality Records Management System • Automated Email
          </div>
        </div>
      </body>
      </html>
    `;

    // Dispatch Email via Resend
    await resend.emails.send({
      from: "Vitality Admin <onboarding@resend.dev>",
      to: superAdminEmails,
      subject: `Vitality Daily Report - ${formattedDate}`,
      html: emailHtml,
    });

    // Log to Database
    await supabase.from('notification_log').insert({
      daily_record_id: reportData.daily_record_id,
      notification_type: 'daily_report_email',
      sent_to: superAdminEmails,
      sent_by: user.id
    });

    return new Response(
      JSON.stringify({ success: true, message: "Report dispatched." }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Function error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);