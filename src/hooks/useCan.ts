import { useAuth } from "../context/AuthContext";
import { validadeUserPermissions } from "../utils/validadeUserPermissions";

type UseCanProps = {
  permissions?: string[];
  roles?: string[];
};

export function useCan({ permissions, roles }: UseCanProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return false;
  }

  return validadeUserPermissions({ user, permissions, roles });
}
