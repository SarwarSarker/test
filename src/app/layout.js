import StoreProvider from "@/GlobalRedux/StoreProvider";
import "./globals.css";

export const metadata = {
  title: "Quizmuiz",
  description: "quiz app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`font-poppins bg-gradient-to-b from-[#191234] to-[#1A1237]`}
      >
        <div className="max-w-[540px] mx-auto px-4">
          <StoreProvider>{children}</StoreProvider>
        </div>
      </body>
    </html>
  );
}
