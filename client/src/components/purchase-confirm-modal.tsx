import type { Product } from "@shared/schema";
import { Loader2 } from "lucide-react";

interface PurchaseConfirmModalProps {
  product: Product;
  currency?: string;
  pending?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

function formatAmount(value: number | string | null | undefined, currency: string) {
  return `${Number(value || 0).toLocaleString("fr-FR")} ${currency}`;
}

export default function PurchaseConfirmModal({
  product,
  currency = "FCFA",
  pending = false,
  onCancel,
  onConfirm,
}: PurchaseConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-5"
      role="presentation"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-[428px] overflow-hidden rounded-[5px] bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="purchase-confirm-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2
          id="purchase-confirm-title"
          className="border-b border-[#ece8e4] px-5 py-5 text-center text-[23px] font-bold leading-tight text-[#1e1e1e]"
        >
          {product.name}
        </h2>

        <div className="px-7 py-7">
          <p className="text-[18px] leading-[1.55] text-[#302d2d]">
            Êtes-vous sûr de vouloir acheter ce produit ?
          </p>
          <ul className="mt-5 space-y-4 text-[18px] leading-none text-[#302d2d]">
            <li className="flex items-center gap-3">
              <span aria-hidden="true" className="text-[22px] leading-none">•</span>
              <span>
                Prix :{" "}
                <strong className="font-bold text-[#ad0b15]">
                  {formatAmount(product.price, currency)}
                </strong>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span aria-hidden="true" className="text-[22px] leading-none">•</span>
              <span>
                Total profit :{" "}
                <strong className="font-bold text-[#ad0b15]">
                  {formatAmount(product.totalReturn, currency)}
                </strong>
              </span>
            </li>
          </ul>
        </div>

        <div className="flex h-[70px] border-t border-[#ece8e4]">
          <button
            type="button"
            className="flex-1 border-r border-[#ece8e4] text-[20px] font-semibold text-[#252525] transition-colors hover:bg-[#faf7f7] active:bg-[#f3eeee]"
            onClick={onCancel}
            data-testid="button-cancel-home-purchase"
          >
            Annuler
          </button>
          <button
            type="button"
            className="flex-1 text-[20px] font-bold text-[#ad0b15] transition-colors hover:bg-[#fff7f7] active:bg-[#fbeaea] disabled:cursor-not-allowed disabled:opacity-60"
            onClick={onConfirm}
            disabled={pending}
            data-testid="button-confirm-home-purchase"
          >
            {pending ? <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : "Confirmer"}
          </button>
        </div>
      </div>
    </div>
  );
}