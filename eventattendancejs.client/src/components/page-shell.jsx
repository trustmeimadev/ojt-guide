// layout wrapper


export default function PageShell({
    title,
    children,
}) {
    return (
        <div className="p-8  mb-5">
            <h1 className="mb-6 text-3xl font-bold text-yellow-300">
                {title}
            </h1>

            {children}
        </div>
    );
}
