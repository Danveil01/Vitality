import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

/**
 * SendReportButton: Triggers automated daily email reporting.
 */
const SendReportButton = ({ recordDate, variant = 'default', size = 'default' }: any) => {
  const [isSending, setIsSending] = useState(false);
  const { user } = useAuth();

  const handleSendReport = async () => {
    if (!user) return toast.error('Auth required');

    setIsSending(true);
    try {
      const { error } = await supabase.functions.invoke('send-daily-report', {
        body: { record_date: recordDate || new Date().toISOString().split('T')[0], triggered_by: user.id },
      });
      if (error) throw error;
      toast.success('Report Sent');
    } catch (err: any) {
      toast.error('Failed to send');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant} size={size} disabled={isSending} className="report-trigger-btn">
          {isSending ? <Loader2 className="animate-spin mr-2" /> : <Mail className="mr-2" />}
          Send Daily Report
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="report-dialog-container">
        <AlertDialogHeader className="dialog-header">
          <div className="icon-wrapper flex items-center gap-3">
            <Send className="text-primary" />
            <AlertDialogTitle className="dialog-title">Email Dispatch</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="dialog-description">
            This action will generate and email today's summary to all super admins.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="dialog-footer">
          <AlertDialogCancel className="btn-cancel">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSendReport} disabled={isSending} className="btn-confirm">
            {isSending ? 'Sending...' : 'Confirm Dispatch'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SendReportButton;