"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {

    const currentSession = useCurrentUser();

    const onClick = () => {
        logout();
    };

    return (
        <div className="bg-white p-3 rounded-xl">
            {JSON.stringify(currentSession)}
            <form>
                <button type="submit" onClick={onClick}>Log out</button>
            </form>
        </div>
    );
};

export default SettingsPage;