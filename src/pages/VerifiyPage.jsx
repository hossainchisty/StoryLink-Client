/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function VerifyPage() {
  const navigate = useNavigate();
  const { token } = useParams();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (token) {
      fetch(`${apiBaseUrl}/api/v1/users/verify?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Email verification successfull");
            // Token verified successfully
            navigate("/login");
          } else {
            toast.error("Token verification failed");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("An error occurred while verifying token");
        });
    } else {
      toast.error("No verification token found in the URL");
    }
  }, [navigate, token]);
}
