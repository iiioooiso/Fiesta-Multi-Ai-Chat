// app/reset-password/page.tsx

import ResetPassword from "./ResetPassword";

type PageProps = {
    searchParams: Promise<{ code?: string }>;
};

export default async function Page({ searchParams }: { searchParams: PageProps["searchParams"] }) {
    const { code } = await searchParams;
    return <ResetPassword code={code ?? null} />;
}
