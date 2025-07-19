import '@/styles/globals.css';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <main className={`antialiased font-century`}>{children}</main>;
}
