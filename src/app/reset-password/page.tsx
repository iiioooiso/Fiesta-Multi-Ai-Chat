export const dynamic = "force-dynamic";

import ResetPassword from "./ResetPassword";

export default function Page({ searchParams }: { searchParams: { code?: string } }) {
    const code = searchParams?.code ?? null;
    return <ResetPassword code={code} />;
}
