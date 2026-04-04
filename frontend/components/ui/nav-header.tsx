"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
}

function NavHeader({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full border border-[#528DCB]/20 bg-white/60 backdrop-blur-sm p-1"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {items.map((item) => (
        <Tab
          key={item.href}
          setPosition={setPosition}
          href={item.href}
          isActive={pathname === item.href}
        >
          {item.label}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
  href,
  isActive,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<{ left: number; width: number; opacity: number }>>;
  href: string;
  isActive: boolean;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer"
    >
      <Link
        href={href}
        className={`block px-3 py-1.5 text-xs uppercase md:px-4 md:py-2.5 md:text-sm font-medium transition-colors duration-200 ${
          isActive ? 'text-[#1a1a2e]' : 'text-[#6A7F92] hover:text-[#1a1a2e]'
        }`}
        style={{ mixBlendMode: 'difference' }}
      >
        {children}
      </Link>
    </li>
  );
};

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
  return (
    <motion.li
      animate={position}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="absolute z-0 h-7 rounded-full bg-gradient-to-r from-[#528DCB] to-[#4B78A0] md:h-10"
      style={{ top: '50%', transform: 'translateY(-50%)' }}
    />
  );
};

export default NavHeader;
