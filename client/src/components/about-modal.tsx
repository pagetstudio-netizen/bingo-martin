import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import bingoLogo from "@assets/logo-1_1790106035177.png";

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AboutModal({ open, onClose }: AboutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
              <img src={bingoLogo} alt="Logo Bingo" className="w-10 h-10 object-contain" />
            </div>
            À propos de Bingo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
             Bingo est une marque du groupe turc HAYAT DHC, commercialisée dans plus de 44 pays. En Algérie, ses produits sont fabriqués localement dans l’usine de Bouinan.
          </p>
          <p>
             Bingo fait de la propreté et de la protection des vêtements ses priorités. Ses produits innovants aident à préserver l’éclat et la longévité du linge.
          </p>
          <div className="bg-secondary rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-foreground">Nos avantages :</h4>
            <ul className="space-y-1">
               <li>- Qualité supérieure</li>
               <li>- Protection et éclat des vêtements</li>
               <li>- Fabrication locale à Bouinan</li>
               <li>- Une marque à l’écoute de ses consommateurs</li>
            </ul>
          </div>
          <p className="text-xs">
            Version 1.0.0 - Tous droits réservés
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
