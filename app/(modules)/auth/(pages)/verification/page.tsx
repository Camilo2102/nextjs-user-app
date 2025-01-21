"use client"

import { useAuthContext } from "@/app/context/AuthContext";
import useDidMountEffect from "@/app/hooks/useDidMountEffect";
import { Spinner } from "@nextui-org/react";

export default function VerificationPage() {

    const {handleVerify} = useAuthContext();

    useDidMountEffect(() => {
        handleVerify();
    },[])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh_-_64px_-_108px)]">
      <Spinner />
      <p className="mt-4">Validating...</p>
    </div>
  );
}