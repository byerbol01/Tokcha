import { useEffect, useState } from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const authError = (code) => Object.assign(new Error(code), { code });

const sameEmail = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();

const readUser = () => {
    try {
        return JSON.parse(localStorage.getItem("user"));
    } catch {
        return null;
    }
};


const saveUser = (u) => {
    if (u) localStorage.setItem("user", JSON.stringify(u));
    else localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
};


const getUsers = async() => {
    const { data } = await api.get("/users");
    console.log("Barcha userlar:", data);
    return data;
};

export default function useAuth() {
    const [user, setUser] = useState(readUser);

    useEffect(() => {
        const sync = () => setUser(readUser());
        window.addEventListener("auth-change", sync);
        return () => window.removeEventListener("auth-change", sync);
    }, []);

    const login = async(email, password) => {
        const users = await getUsers();
        const found = users.find((u) => sameEmail(u.email, email));

        if (!found) throw authError("NO_ACCOUNT");
        if (found.password !== password) throw authError("WRONG_PASSWORD");

        console.log("Kirgan user:", found);
        saveUser(found);
    };

    const register = async({ name, email, password }) => {
        const users = await getUsers();
        if (users.some((u) => sameEmail(u.email, email)))
            throw authError("EMAIL_TAKEN");

        const { data } = await api.post("/users/", {
            name,
            email,
            password,
            avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(email)}`,
        });
        toast.success("Ro'yxatdan muvaffaqiyatli o'tdingiz!");
    };

    const logout = () => saveUser(null);

    return { user, login, register, logout };
}