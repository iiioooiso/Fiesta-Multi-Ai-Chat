import ResetPassword from "./ResetPassword";

interface PageProps {
    searchParams?: { code?: string };
}

export const dynamic = "force-dynamic";

export default function Page({ searchParams }: PageProps) {
    const code = searchParams?.code ?? null;
    return <ResetPassword code={code} />;
}
