import { Button } from "@/components/ui/button";
import Link from "next/link";

const Error = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
        {/* Títulos centrados */}
        <h2 className="mb-6 text-h0">Whoops!</h2>
        <h3 className="mb-1.5 text-h1 pb-2">Error de autenticación</h3>

        {/* Contenedor de texto alineado a la izquierda */}
        <div className="text-left max-w-md">
          <p className="text-p mb-4">
            Hubo un problema durante el proceso de autenticación. Esto puede deberse a:
          </p>

          <ul className="mb-4 list-disc list-inside text-small">
            <li>El enlace ha expirado o es inválido.</li>
            <li>El usuario está inactivo.</li>
            <li>Intentos previos fallidos de recuperación de contraseña.</li>
          </ul>

          <p className="mb-6 text-p">
            Si el problema persiste, por favor contacta al administrador del sistema.
          </p>
        </div>

        <Button asChild size="lg" className="rounded-lg text-base">
          <Link href="/login">Volver al inicio de sesión</Link>
        </Button>
      </div>

      {/* Imagen decorativa */}
      <div className="relative max-h-screen w-full p-2 max-lg:hidden">
        <div className="h-full w-full rounded-2xl bg-black"></div>
        <img
          src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/error/image-1.png"
          alt="404 illustration"
          className="absolute top-1/2 left-1/2 h-[clamp(260px,25vw,406px)] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
};

export default Error;