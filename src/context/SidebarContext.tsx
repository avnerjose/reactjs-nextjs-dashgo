import { createContext, ReactNode, useContext, useEffect } from "react";
import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface SidebarDrawerContextProviderProps {
  children: ReactNode;
}

interface SidebarDrawerContextProps extends UseDisclosureProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarDrawerContext = createContext<SidebarDrawerContextProps>(
  {} as SidebarDrawerContextProps
);

export function SidebarDrawerProvider({
  children,
}: SidebarDrawerContextProviderProps) {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
