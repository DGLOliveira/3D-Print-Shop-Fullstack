import { useState } from 'react'
import { Eye, EyeOff, User, Loader2, Mail, Lock } from 'lucide-react'
import { useAuthStore } from '../../stores/useAuth.store.tsx'

const Login = () => {

    const { signup, isSigningUp, login, isLoggingIn } = useAuthStore()

    const [showSignupPassword, setShowSignupPassword] = useState(false)
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const handleSignup = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        signup(signupData)
    }


    const [showLoginPassword, setShowLoginPassword] = useState(false)
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const handleLogin = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        login(loginData)
    }



    return (
        <div className="min-h-screen flex flex-row gap-6 flex-wrap justify-around  p-6 sm:p-12">


            <form onSubmit={handleLogin} className="space-y-4 p-4 grow border rounded">
                <h1 className="text-2xl font-bold mt-2 text-center p-4">Login</h1>
                <div className="form-control">
                    <label className="label py-1">
                        <span className="label-text font-medium">Email</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1">
                            <Mail className="size-5 text-base-content/40" />
                        </div>
                        <input
                            type="email"
                            className={`input input-bordered w-full pl-10`}
                            placeholder="you@example.com"
                            value={loginData.email}
                            disabled={isLoggingIn}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label py-1">
                        <span className="label-text font-medium">Password</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1">
                            <Lock className="size-5 text-base-content/40" />
                        </div>
                        <input
                            type={showLoginPassword ? "text" : "password"}
                            className={`input input-bordered w-full pl-10`}
                            placeholder="••••••••"
                            value={loginData.password}
                            disabled={isLoggingIn}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowLoginPassword(!showLoginPassword)}
                        >
                            {showLoginPassword ? (
                                <EyeOff className="size-5 text-base-content/40" />
                            ) : (
                                <Eye className="size-5 text-base-content/40" />
                            )}
                        </button>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-full" /*disabled={isLoggingIn}*/>
                    {isLoggingIn ? (
                        <>
                            <Loader2 className="size-5 animate-spin" />
                            Loading...
                        </>
                    ) : (
                        "Login"
                    )}
                </button>
                <button className="btn btn-info w-full" /*disabled={isLoggingIn}*/>
                    {/*isLoggingIn ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Loading...
            </>
          ) : (
            "Login"
          )*/}Continue With Google
                </button>
            </form>



            <form onSubmit={handleSignup} className="space-y-4 p-4 grow border">
                <h1 className="text-2xl font-bold mt-2 text-center p-4">Register</h1>
                <div className="form-control">
                    <label className="label py-1">
                        <span className="label-text font-medium">Full Name</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1">
                            <User className="size-5 text-base-content/40" />
                        </div>
                        <input
                            type="text"
                            className={`input input-bordered w-full pl-10`}
                            placeholder="John Doe"
                            value={signupData.name}
                            onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label py-1">
                        <span className="label-text font-medium">Email</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1">
                            <Mail className="size-5 text-base-content/40" />
                        </div>
                        <input
                            type="email"
                            className={`input input-bordered w-full pl-10`}
                            placeholder="you@example.com"
                            value={signupData.email}
                            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label py-1">
                        <span className="label-text font-medium">Password</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1">
                            <Lock className="size-5 text-base-content/40" />
                        </div>
                        <input
                            type={showSignupPassword ? "text" : "password"}
                            className={`input input-bordered w-full pl-10`}
                            placeholder="••••••••"
                            value={signupData.password}
                            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowSignupPassword(!showSignupPassword)}
                        >
                            {showSignupPassword ? (
                                <EyeOff className="size-5 text-base-content/40" />
                            ) : (
                                <Eye className="size-5 text-base-content/40" />
                            )}
                        </button>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-full" /*disabled={isSigningUp}*/>
                    {isSigningUp ? (
                        <>
                            <Loader2 className="size-5 animate-spin" />
                            Loading...
                        </>
                    ) : (
                        "Create Account"
                    )}
                </button>
            </form>
        </div>
    )
}

export default Login