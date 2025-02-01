import Menubar from "./components/Menubar";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div className="flex justify-between">
            <Menubar />
            <div className="w-full">
                {children}
            </div>
        </div>

    );
}
