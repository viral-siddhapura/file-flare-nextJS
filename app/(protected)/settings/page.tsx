"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {

    const currentSession = useCurrentUser();

    const onClick = () => {
        console.log("clicked in settings page");
        logout();
    };

    return (
        <div className="bg-white p-3 rounded-xl">
            {JSON.stringify(currentSession)}
            <form>
                <button onClick={onClick} type="submit">Sign Out</button>
            </form>
        </div>
    );
};

export default SettingsPage;