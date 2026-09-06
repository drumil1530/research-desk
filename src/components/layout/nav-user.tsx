"use client";

import { LogOut, User } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/coss/ui/avatar";
import {
  Menu,
  MenuPopup,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
  MenuLinkItem,
} from "@/coss/ui/menu";
import ThemeToggle from "@/coss/ui/theme-toggle";
import { signOut } from "@/features/auth/actions/sign-out";
import { type authService } from "@/infrastructure/auth";
import ROUTES from "@/shared/routes";

type NavUserProps = {
  user: Awaited<ReturnType<typeof authService.getUserOrRedirect>>;
};

export function NavUser({ user }: NavUserProps) {
  return (
    <Menu>
      <MenuTrigger className="cursor-pointer">
        <Avatar className="size-8">
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>

        <span className="hidden sr-only">{user.name}</span>
      </MenuTrigger>

      <MenuPopup align="end" className="w-56">
        <MenuGroup>
          <MenuGroupLabel className="font-medium">{user.name}</MenuGroupLabel>

          <MenuLinkItem render={<Link href={ROUTES.profile} />}>
            <User /> Profile
          </MenuLinkItem>

          <MenuSeparator />

          <ThemeToggle />
        </MenuGroup>

        <MenuSeparator />

        <MenuGroup>
          <MenuItem onClick={() => signOut()} variant="destructive" className="cursor-pointer">
            <LogOut />
            Sign out
          </MenuItem>
        </MenuGroup>
      </MenuPopup>
    </Menu>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((v) => v[0].toUpperCase())
    .join("");
}
