import { ContextProvider } from "@components/Clients";
import Navbar from "@components/Navbar";
import "@styles/globals.css";



export const metadata = {
  title: "Todo App",
  description: "This is Todo Web Application ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <>
            <Navbar />
            {children}
          </>
        </ContextProvider>
      </body>
    </html>
  );
}