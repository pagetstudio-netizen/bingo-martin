import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { FALLBACK_COUNTRIES, type ApiCountry } from "@/lib/countries";
import { CountrySelector } from "@/components/country-selector";
import { EyeOff, Loader2, LockKeyhole } from "lucide-react";
import { AuthVisualShell } from "@/components/auth-visual-shell";

const loginSchema = z.object({
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  country: z.string().min(2, "Sélectionnez un pays"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      country: "",
      password: "",
    },
  });

  const { data: apiCountries, isLoading: countriesLoading } = useQuery<ApiCountry[]>({
    queryKey: ["/api/countries"],
  });

  const selectedCountry = form.watch("country");

  useEffect(() => {
    // Remove credentials persisted by versions that stored login data locally.
        localStorage.removeItem("doosan_credentials");
    localStorage.removeItem("doosan_login_preferences");
  }, []);

  useEffect(() => {
    if (!apiCountries || apiCountries.length === 0) return;
    const isValid = apiCountries.some(ac => ac.code === selectedCountry && ac.isActive);
    // Keep a remembered/selected country long enough for the server to apply
    // the administrator-only cross-country login rule.
    if (!isValid) {
      const first = apiCountries.find(ac => ac.isActive);
      if (first) form.setValue("country", first.code);
    }
  }, [apiCountries, selectedCountry, form]);

  const countryData = (() => {
    if (apiCountries && apiCountries.length > 0) {
      const c = apiCountries.find(ac => ac.code === selectedCountry && ac.isActive);
      if (c) return { phonePrefix: c.phonePrefix, name: c.name };
      return null;
    }
    const f = FALLBACK_COUNTRIES.find(fc => fc.code === selectedCountry);
    return f ? { phonePrefix: f.phonePrefix, name: f.name } : null;
  })();

  async function onSubmit(data: LoginForm) {
    setIsLoading(true);
    try {
      await login(data.phone, data.country, data.password);
      navigate("/");
    } catch (error: any) {
      toast({ title: "Erreur de connexion", description: error.message || "Vérifiez vos informations", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  const displayedPrefix = countryData?.phonePrefix || (countriesLoading ? "..." : "");

  return (
    <AuthVisualShell
      activeTab="login"
      onLogin={() => navigate("/login")}
      onRegister={() => navigate("/register")}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input type="hidden" {...form.register("country")} />

        <div className="bingo-auth-fields">
          <div className="bingo-auth-field phone">
            <button
              type="button"
              className="bingo-auth-prefix"
              onClick={() => setCountryModalOpen(true)}
              data-testid="button-select-country"
              aria-label="Choose country"
            >
              <span>+{displayedPrefix}</span>
            </button>
            <input
              {...form.register("phone")}
              type="tel"
              autoComplete="username"
              placeholder="Entrez le numéro de téléphone"
              data-testid="input-phone"
            />
          </div>
          {form.formState.errors.phone && (
            <p className="bingo-auth-error">{form.formState.errors.phone.message}</p>
          )}

          <div className="bingo-auth-field">
            <LockKeyhole className="bingo-auth-field-icon" aria-hidden="true" />
            <input
              {...form.register("password")}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Entrez le mot de passe"
              data-testid="input-password"
            />
            <button
              type="button"
              className="bingo-auth-eye"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <EyeOff aria-hidden="true" />
            </button>
          </div>
          {form.formState.errors.password && (
            <p className="bingo-auth-error">{form.formState.errors.password.message}</p>
          )}
        </div>

        <button type="submit" disabled={isLoading} className="bingo-auth-submit" data-testid="button-login">
          {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Se connecter"}
        </button>
        <button
          type="button"
          className="bingo-auth-switch"
          onClick={() => navigate("/register")}
          data-testid="link-register"
        >
          Je n'ai pas encore de compte
        </button>
      </form>

      <CountrySelector
        selectedCountryCode={selectedCountry}
        open={countryModalOpen}
        onClose={() => setCountryModalOpen(false)}
        onSelect={(code) => form.setValue("country", code, { shouldValidate: true })}
      />
    </AuthVisualShell>
  );
}
