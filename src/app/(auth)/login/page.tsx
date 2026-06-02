import { MapPinCheck, MapPinCheckInside } from "lucide-react";
import LoginForm from "./components/login-form";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <MapPinCheckInside className="size-5" />
            </div>
            EduPin.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="relative hidden lg:block w-full min-h-screen bg-black">
        <Image
          src="/assets/portada.jpg"
          alt="EduPin portada"
          fill
          priority
          unoptimized
          quality={75}
          sizes="50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
