import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const {login, isLoggingIn} = useAuthStore();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Leftside of the forum */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* LOGO */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                                <MessageSquare className="size-6 text-primary" />
                            </div>
                                <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                                <p className="text-base-content/60">Get started with your free account</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-base-content/40"/>
                                </div>
                                <input 
                                    type="email" 
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="email@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-base-content/40"/>
                                </div>
                                <input 
                                    type="password" 
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="********"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
                            {
                                isLoggingIn ? (
                                    <>
                                        <Loader2 className="size-5 animate-spin" /> Loading...
                                    </>
                                ) : (
                                    "Sign Up"
                                )
                            }
                        </button>
                    </form>
                    <div className="text-center">
                        <p className="text-base-content/60">
                            Don&apos;t have an account?{" "}
                            <Link to="/signup" className="link link-primary">
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* right side */}

            <AuthImagePattern
                title="Join our community"
                subtitle="Connect with friends, share moments and stay touch with you"
            />
        </div>
    )
}

export default LoginPage