export default function OauthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full lg:grid lg:grid-cols-2">
      <div className="flex flex-col justify-center gap-y-6 mx-auto w-[350px] min-h-screen py-12">
        {children}
      </div>
      <div className="hidden bg-muted lg:flex flex-col justify-center bg-gradient-to-r from-blue-400 to-blue-800 px-12">
        <h1 className="text-3xl text-right text-white">
          Satu <strong>Login</strong> untuk <br />
          Semua Aplikasi dan Layanan <br />
          Pemerintah Kabupaten Malang
        </h1>
      </div>
    </div>
  );
}
