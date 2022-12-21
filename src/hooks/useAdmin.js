import { useEffect, useState } from "react";

export const useAdmin = (email) => {
  const [isadmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(` https://doctors-portal-server-ivory.vercel.app/users/admin/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsAdmin(data);
          setIsAdminLoading(false);
        });
    }
  }, [email]);
  return [isadmin, isAdminLoading];
};
