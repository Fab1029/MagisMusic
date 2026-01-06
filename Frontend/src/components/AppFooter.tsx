import React from 'react';
import icons from "@/constants/icons";

interface FooterColumn {
  title: string;
  links: { name: string; href: string }[];
}

const footerData: FooterColumn[] = [
  {
    title: "Compañía",
    links: [{ name: "Acerca de", href: "#" }],
  },
  {
    title: "Comunidades",
    links: [
      { name: "Para artistas", href: "#" },
      { name: "Desarrolladores", href: "#" },
      { name: "Publicidad", href: "#" },
    ],
  },
  {
    title: "Enlaces útiles",
    links: [
      { name: "Ayuda", href: "#" },
      { name: "App móvil gratis", href: "#" },
      { name: "Contenido popular", href: "#" },
    ],
  },
  {
    title: "Planes",
    links: [
        { name: "Versión gratuita", href: "#" },
        { name: "Premium", href: "#" }
    ],
  },
];

const SocialButton: React.FC<{ icon: string; url: string; alt: string }> = ({
  icon,
  url,
  alt,
}) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
  >
    <img
      src={icon}
      alt={alt}
      className="h-5 w-5 object-contain filter brightness-0 invert"
    />
  </a>
);

export const AppFooter: React.FC = () => {
  return (
    <footer className="w-full bg-gray py-5 border-t border-gray text-sm">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Contenedor principal */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-y-6">
          {/* Columnas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-4 w-full md:w-auto">
            {footerData.map((column) => (
              <div key={column.title}>
                <h3 className="text-white font-semibold mb-3">{column.title}</h3>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.name} className="mb-1.5">
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex space-x-3 md:self-start mt-2 md:mt-0">
            <SocialButton
              url="https://instagram.com"
              icon={icons.igIcon}
              alt="instagram"
            />
            <SocialButton
              url="https://twitter.com"
              icon={icons.twitterIcon}
              alt="twitter"
            />
            <SocialButton
              url="https://facebook.com"
              icon={icons.facebookIcon}
              alt="facebook"
            />
          </div>
        </div>
        <div className="border-t border-gray pt-3 text-gray text-xs">
          <p>&copy; {new Date().getFullYear()} Magis Music</p>
        </div>
      </div>
    </footer>
  );
};
