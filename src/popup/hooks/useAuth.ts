import { useOutletContext } from "react-router-dom";

type ContextType = {
  isLogin: boolean;
  user: any;
  updateDisplayName: (displayName: string) => Promise<boolean>;
};
const useAuth = () => {
  return useOutletContext<ContextType>();
};

export default useAuth;
