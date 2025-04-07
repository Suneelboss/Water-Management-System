import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { manual_login, manual_register } from "../../../api/Api";

import { Eye, EyeOff, AlertCircle } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isLogin, setIsLogin] = useState(true);
  const [modelId, setModelId] = useState("");


  const handleSubmit1 = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (!isLogin && !modelId)) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For demo purposes, always succeed and redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate("/signup")
  }
  const handleLogIn = () => {
    navigate("/home")
  }

  // Prevent back navigation
  useEffect(() => {
    // Clear all local storage items

    // Prevent back navigation
    const handleBackNavigation = (event) => {
      event.preventDefault();
      navigate("/"); // Redirect to home or any other route
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, [navigate]);

  // useEffect(() => {
  //   if (localStorage.getItem("token") !== null && localStorage.getItem("role") !== null) {
  //     navigate(`/${localStorage.getItem("role")}`, { replace: true });
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      if (!email || !password) {
        setError("*Email and password required.");
        return;
      }
      setError("");
      setIsLoading(true);
      try {
        const response = await fetch(manual_login, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          setIsLoading(false);

          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.user.name);
          localStorage.setItem("role", data.user.role);
          if (data.user.role === "user") {
            navigate(`/dashboard`, { replace: true });
          } else {
            navigate('/admin', { replace: true });
          }


        } else {
          setIsLoading(false);
          setError(`*${data.error}` || "Login failed. Please try again.");
        }
      } catch (error) {
        setIsLoading(false);
        setError("An error occurred. Please try again later.");
      }
    } else {
      if (!email || !password || (!isLogin && !phone)) {
        setError("Please fill in all fields");
        console.log("Please fill in all fields")
        return;
      }
      setError("");
      setIsLoading(true);
      try {
        const response = await fetch(manual_register, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, phone, address, name }),
        });
        const data = await response.json();
        if (response.ok) {
          setIsLoading(false);
          
          setIsLogin(true)
        } else {
          setIsLoading(false);
          setError(`*${data.error}` || "Login failed. Please try again.");
        }
      } catch (error) {
        setIsLoading(false);
        setError("An error occurred. Please try again later.");
      }

    }
  }






  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    // <div className=' h-screen  flex items-center justify-evenly'>
    //   {isLoading && (
    //     <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm z-50">
    //       <CircularProgress />
    //     </div>
    //   )}
    //   <img className='hidden  showPicture:block h-[71%] m-10' src="https://media.istockphoto.com/id/1341716354/photo/construction-worker-working-in-construction-site.jpg?s=2048x2048&w=is&k=20&c=ruiGdpgCEo-ehs6TlLqp7L1dwM86QbMVYwPNlIgdKnc=" alt="picture" />
    //   <div className=' w-[55vh] flex flex-col gap-5 '>
    //     <center className='text-3xl font-normal text-[#ffad33]'>Log in</center>
    //     <center className='text-3xl font-normal text-[#ffad33]'>Survey Equipment Rental</center>
    //     {/* <h3>Enter your details below</h3> */}
    //     <div className='flex flex-col gap-10  '>
    //       {error && <div className="w-full text-red-400 text-sm">{error}</div>}
    //       <input
    //         type="email"
    //         placeholder='E-mail or Phone Number'
    //         className='border-b-2 h-10 outline-none'
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)} />
    //       <div className="w-full relative">
    //         <input
    //           type={showPassword ? "text" : "password"}
    //           placeholder="Password"
    //           className='border-b-2 h-10 w-full outline-none'
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         // className="w-full px-4 py-3 bg-gray-100 rounded-md outline-none shadow-sm"
    //         />
    //         <span
    //           onClick={togglePasswordVisibility}
    //           className="absolute w-4 right-4 top-4 cursor-pointer text-xl"
    //         >
    //           {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
    //         </span>
    //       </div>
    //       <button className='text-xl text-white border rounded-md p-2 px-4 bg-[#FFAD33]' onClick={handleLogin}>Log In</button>
    //     </div>
    //     <div className=''>

    //       <button className='text-[#FFAD33] text-base'> Forget Password?</button>
    //     </div>
    //     <button onClick={handleSignUp}> Didn't have an account? <span className=' text-[#FFAD33] underline' >
    //       Sign up

    //     </span>
    //     </button>

    //   </div>
    // </div>
    <div className="min-h-screen flex bg-[#f8fafc] flex-col">
      {/* Top Navbar */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-[#e2e8f0]">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-water-500 text-white flex items-center justify-center">
                <div className="water-wave" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute inset-0 h-5 w-5 m-auto"
                >
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <span className="text-lg font-medium">AquaSentry</span>
            </div>
            <nav className="flex items-center space-x-4">
              <Link
                to="#features"
                className="text-sm text-[#64748b] hover:text-[#020817] transition-colors"
              >
                Features
              </Link>
              <Link
                to="#how-it-works"
                className="text-sm text-[#64748b] hover:text-[#020817] transition-colors"
              >
                How It Works
              </Link>
              <Link
                to="#contact"
                className="text-sm text-[#64748b] hover:text-[#020817] transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 flex">
        {/* Left: Hero Section */}
        <div className="w-0 lg:w-1/2 bg-gradient-to-br from-[#d2ecffe5] to-[#f6fbffdd] relative hidden lg:block">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-30 transform -skew-y-12"></div>
            <div className="absolute bottom-0 right-0 w-3/4 h-1/2 bg-water-200 opacity-20 rounded-full filter blur-3xl"></div>
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-water-300 opacity-20 rounded-full filter blur-xl"></div>
          </div>

          <div className="relative h-full flex items-center justify-center p-12">
            <div className="max-w-md">
              <div className="inline-block mb-6 px-3 py-1 bg-water-100 rounded-full text-water-700 text-xs font-medium">
                IoT-Based Water Management
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Smart Water Level Management & Leakage Detection
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Monitor water levels, detect leaks, and control your water system from anywhere.
                Save water, prevent damage, and gain peace of mind.
              </p>

              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="glass rounded-lg p-4 flex border shadow-blue-500 shadow-lg items-start">
                  <div className="h-10 w-10 rounded-full bg-water-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-water-600">
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium ">Real-time Monitoring</h3>
                    <p className="text-xs text-[#64748b] mt-1">Get instant alerts for water level changes and leaks</p>
                  </div>
                </div>

                <div className="glass rounded-lg p-4 flex items-start">
                  <div className="h-10 w-10 rounded-full bg-water-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-water-600">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Advanced Analytics</h3>
                    <p className="text-xs text-[#64748b] mt-1">Track usage patterns and optimize your water system</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold">{isLogin ? "Sign in to your account" : "Create your account"}</h2>
              <p className="mt-2 text-sm text-[#64748b]">
                {isLogin ? "Enter your credentials to access your dashboard" : "Start monitoring your water system today"}
              </p>
            </div>

            {error && (
              <div className="bg-alert-error/10 border border-alert-error/30 rounded-lg px-4 py-3 flex items-start">
                <AlertCircle className="h-5 w-5 text-alert-error flex-shrink-0 mt-0.5" />
                <span className="ml-3 text-sm text-alert-error">{error}</span>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label htmlFor="modelId" className="block text-sm font-medium mb-1.5">
                    FullName
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required={!isLogin}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-primary"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-primary"
                  placeholder="you@example.com"
                />
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="modelId" className="block text-sm font-medium mb-1.5">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    required={!isLogin}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-primary"
                    placeholder="Enter your phone number"
                  />
                </div>
              )}
              {!isLogin && (
                <div>
                  <label htmlFor="modelId" className="block text-sm font-medium mb-1.5">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required={!isLogin}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input-primary"
                    placeholder="Enter your address"
                  />
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-primary pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-[#64748b]" />
                    ) : (
                      <Eye className="h-4 w-4 text-[#64748b]" />
                    )}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">


                  <div className="text-sm">
                    <Link
                      to="#forgot-password"
                      className="text-water-600 hover:text-water-700 font-medium"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  // className={cn(
                  //   "btn-primary w-full flex justify-center",
                  //   isLoading && "opacity-70 cursor-not-allowed"
                  // )}
                  className="rounded-full bg-blue-500 w-full flex justify-center text-white px-6 py-2 font-medium transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="spinner"></div>
                  ) : isLogin ? (
                    "Sign in"
                  ) : (
                    "Create account"
                  )}
                </button>
              </div>
            </form>

            <div className="text-center text-sm">
              <span className="text-[#64748b]">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </span>{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-water-600 hover:text-water-700 font-medium"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login