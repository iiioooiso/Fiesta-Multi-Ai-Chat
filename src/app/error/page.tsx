'use client'

export default function ErrorPage() {
    return (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <h1 style={{ color: '#d32f2f' }}>Authentication Error</h1>
            <p>Sorry, your credentials didn&apos;t match our records.</p>
            <p>Please double-check your username and password and try again.</p>
        </div>
    );
}