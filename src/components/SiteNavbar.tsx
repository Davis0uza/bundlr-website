"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
    { label: "Serviços", href: "/services" },
    { label: "Contacto", href: "/contact" },
];

export default function SiteNavbar() {
    const pathname = usePathname();

    // Hide on pages that have their own navbar
    if (pathname === "/" || pathname.startsWith("/services") || pathname.startsWith("/contact")) return null;

    return (
        <nav className="sticky top-0 z-[900] w-full border-b border-[#efd1f4]/30 bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/55">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="Bundlr"
                        width={100}
                        height={28}
                        className="h-auto w-20 md:w-24"
                    />
                </Link>

                {/* Links */}
                <div className="flex items-center gap-5">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-[#e27fa3] ${pathname.startsWith(link.href)
                                ? "text-[#e27fa3]"
                                : "text-[#0b1220]"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
