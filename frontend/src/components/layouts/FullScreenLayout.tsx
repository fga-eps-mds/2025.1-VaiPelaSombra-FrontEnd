interface Props {
    children: React.ReactNode;
    className?: string;
}

export function FullScreenLayout({ children, className }: Props) {
    return (
        <main className={`flex w-screen h-screen ${className}`}>
            {children}
        </main>
    )
}