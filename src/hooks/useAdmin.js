import { useEffect, useState } from "react";

export const useAdmin = (email) => {
  const [isadmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/users/admin/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsAdmin(data);
          setIsAdminLoading(false);
        });
    }
  }, [email]);
  return [isadmin, isAdminLoading];
};
