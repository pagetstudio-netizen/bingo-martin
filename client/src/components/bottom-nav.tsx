import { useLocation } from "wouter";
import homeIcon from "@assets/home_1790113467854.svg";
import shareIcon from "@assets/2e_1790113467898.svg";
import accountIcon from "@assets/téléchargement_(71)_1790113580097.png";
import teamIcon from "@assets/téléchargement_(60)_1790113580113.png";

const navItems = [
  { path: "/",            label: "Accueil",   icon: homeIcon },
  { path: "/team",        label: "Équipe",    icon: teamIcon },
  { path: "/share",       label: "Partager",  icon: shareIcon },
  { path: "/account",     label: "Mon compte", icon: accountIcon },
];

export default function BottomNav() {
  const [location, navigate] = useLocation();

  return (
    <nav
      className="bottom-nav fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-[0_-1px_2px_rgba(0,0,0,.05)]"
      style={{ borderColor: "rgba(173, 11, 21, 0.16)" }}
    >
      <div className="mx-auto flex h-[59px] max-w-[500px] items-center justify-around pb-1">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const iconColor = isActive ? "#ad0b15" : "#777b80";

          return (
            <button
              key={item.path}
              onClick={() => {
                if (item.path === "/share") {
                  navigate("/share");
                } else {
                  navigate(item.path);
                }
                if (item.path === "/" ) {
                  window.dispatchEvent(new Event("home-tab-clicked"));
                }
              }}
              className="flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-[3px]"
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              <span
                aria-hidden="true"
                className="bottom-nav-icon h-[27px] w-[27px]"
                style={{
                  backgroundColor: iconColor,
                  WebkitMaskImage: `url("${item.icon}")`,
                  maskImage: `url("${item.icon}")`,
                }}
              />
              <span
                className="max-w-full truncate px-0.5 text-[10px] font-medium leading-none"
                style={{ color: iconColor }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
