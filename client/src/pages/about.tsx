import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-full" style={{ background: "#111" }}>

      {/* Header */}
      <header className="flex items-center px-4 py-3" style={{ background: "#111", borderBottom: "1px solid #222" }}>
        <Link href="/account">
          <button className="p-1" data-testid="button-back">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        </Link>
        <h1 className="flex-1 text-center text-base font-semibold text-white pr-6">À propos de nous</h1>
      </header>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5" style={{ color: "#d4d4d4", fontSize: 13.5, lineHeight: "1.75" }}>

        <p>
          Bingo est une marque du groupe turc HAYAT DHC, spécialisée dans les produits d’entretien et commercialisée dans plus de 44 pays. Entrée sur le marché algérien, la marque fabrique ses produits localement dans son usine de Bouinan.
        </p>

        <p>
          La propreté et la protection de vos vêtements sont nos priorités. L’innovation de nos produits va au-delà du simple nettoyage : elle aide à préserver l’éclat et la longévité de votre linge.
        </p>

        <p>
          Bingo est à l’écoute de ses consommateurs. Nous cherchons à mieux comprendre vos besoins et à rester proches de vous au quotidien afin de vous proposer des produits de haute qualité.
        </p>

        <p>
          La qualité supérieure, la protection du linge et la satisfaction de nos consommateurs sont au cœur de l’engagement de Bingo.
        </p>

      </div>
    </div>
  );
}
