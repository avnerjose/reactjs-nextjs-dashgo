import { Icon, Link as ChakraLink, LinkProps, Text } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends LinkProps {
  name: string;
  href: string;
  icon: IconType;
}

export function NavLink({ name, icon, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontSize="medium">
          {name}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
