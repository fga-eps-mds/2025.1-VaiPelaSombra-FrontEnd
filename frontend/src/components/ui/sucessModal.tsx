import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SuccessModal({ open, onClose }: SuccessModalProps) {
  const navigate = useNavigate();

  const handleOk = () => {
    onClose();
    navigate("/login");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-black">
            Conta criada com sucesso!
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Agora você pode fazer login e aproveitar todos os recursos.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-4">
          <Button className="w-full" onClick={handleOk}>
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
