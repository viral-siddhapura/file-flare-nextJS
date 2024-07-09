import { auth, signOut } from "@/auth";

const SettingsPage = async () => {

    const currentSession = await auth();

    return (
        <div>
            {JSON.stringify(currentSession)}
            <form action={async () => {
                "use server"
                await signOut();
            }}>
                <button type="submit">Sign Out</button>
            </form>
        </div>
    );
};

export default SettingsPage;