export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`font-poppins bg-gradient-to-b from-[#191234] to-[#1A1237]`}
      >
        <div className="max-w-[540px] mx-auto">{children}</div>
      </body>
    </html>
  );
}
