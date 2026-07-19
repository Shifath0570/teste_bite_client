
// 'use client';

// import { authClient } from '@/app/lib/auth-client';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';

// interface FormErrors {
//   name?: string;
//   email?: string;
//   password?: string;
//   terms?: string;
// }

// export default function TasteBiteSignup() {
//   const router = useRouter();

//   // Form State
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     agreeToTerms: false,
//   });

//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isLoading, setIsLoading] = useState(false);

//   // Form Validation
//   const validateForm = (): boolean => {
//     const tempErrors: FormErrors = {};
//     if (!formData.name.trim()) {
//       tempErrors.name = 'Full name is required';
//     }
//     if (!formData.email) {
//       tempErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       tempErrors.email = 'Please enter a valid email address';
//     }
//     if (!formData.password) {
//       tempErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       tempErrors.password = 'Password must be at least 6 characters';
//     }
//     if (!formData.agreeToTerms) {
//       tempErrors.terms = 'You must accept the terms & conditions';
//     }

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type } = e.target;

//     if (type === 'checkbox') {
//       const checked = e.target.checked;
//       setFormData((prev) => ({ ...prev, [name]: checked }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }

//     // Clear field-specific error as user types
//     const fieldName = name as keyof FormErrors;
//     if (errors[fieldName]) {
//       setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // 1. Run local validation first
//     if (!validateForm()) return;

//     setIsLoading(true);

//     // 2. Safely extract variables from formData state object
//     const { name, email, password } = formData;

//     try {
//       // 3. Fire the request to Better Auth / auth client
//       const { data, error } = await authClient.signUp.email({
//         name,
//         email,
//         password,
//         callbackURL: '/auth/login' // Often supported to direct post-verification flow
//       });

//       console.log(data);

//       if (error) {
//         alert(error.message || "An unexpected registration error occurred.");
//       } else {
//         // Clear inputs on successful sign up
//         setFormData({ name: '', email: '', password: '', agreeToTerms: false });
        
//         router.push("/auth/login");
//         router.refresh();
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong with the authentication server.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-orange-50/40 px-4 py-12 sm:px-6 lg:px-8">
//       <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-orange-100">

//         {/* Brand Header */}
//         <div className="text-center">
//           <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 text-white text-2xl font-bold mb-3 shadow-md shadow-orange-500/20">
//             🍳
//           </div>
//           <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
//             Taste<span className="text-orange-500">Bite</span>
//           </h2>
//           <p className="mt-2 text-sm text-gray-500">
//             Join our culinary community and start sharing delicious recipes.
//           </p>
//         </div>

//         {/* Signup Form */}
//         <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>

//           {/* Full Name */}
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
//               Full Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Chef Gus"
//               className={
//                 errors.name
//                   ? 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all border-red-300 focus:ring-red-100 focus:border-red-500'
//                   : 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all border-gray-200 focus:ring-orange-100 focus:border-orange-500'
//               }
//             />
//             {errors.name && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.name}</p>}
//           </div>

//           {/* Email Address */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
//               Email Address
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="you@example.com"
//               className={
//                 errors.email
//                   ? 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all border-red-300 focus:ring-red-100 focus:border-red-500'
//                   : 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all border-gray-200 focus:ring-orange-100 focus:border-orange-500'
//               }
//             />
//             {errors.email && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>}
//           </div>

//           {/* Password */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="••••••••"
//               className={
//                 errors.password
//                   ? 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all border-red-300 focus:ring-red-100 focus:border-red-500'
//                   : 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all border-gray-200 focus:ring-orange-100 focus:border-orange-500'
//               }
//             />
//             {errors.password && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.password}</p>}
//           </div>

//           {/* Terms and Conditions */}
//           <div>
//             <div className="flex items-start">
//               <input
//                 id="agreeToTerms"
//                 name="agreeToTerms"
//                 type="checkbox"
//                 checked={formData.agreeToTerms}
//                 onChange={handleChange}
//                 className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 mt-1"
//               />
//               <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-600">
//                 I agree to TasteBite s{' '}
//                 <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
//                   Terms of Service
//                 </a>{' '}
//                 and{' '}
//                 <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
//                   Privacy Policy
//                 </a>
//                 .
//               </label>
//             </div>
//             {errors.terms && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.terms}</p>}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center gap-2"
//           >
//             {isLoading ? 'Cooking up your account...' : 'Create Account'}
//           </button>

//           {/* Footer Sign In Redirect */}
//           <p className="text-center text-sm text-gray-500 mt-4">
//             Already have an account?{' '}
//             <a href="/auth/login" className="font-semibold text-orange-600 hover:text-orange-500 transition-colors">
//               Sign in
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

'use client';

import { authClient } from '@/app/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  terms?: string;
}

export default function TasteBiteSignup() {
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Form Validation
  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!formData.name.trim()) {
      tempErrors.name = 'Full name is required';
    }
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.agreeToTerms) {
      tempErrors.terms = 'You must accept the terms & conditions';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = e.target.checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear field-specific error as user types
    const fieldName = name as keyof FormErrors;
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Run client-side validation first
    if (!validateForm()) return;

    setIsLoading(true);

    // 2. Extract strictly required parameters
    const { name, email, password } = formData;

    try {
      // 3. Fire payload to the server
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      console.log(data);

      if (error) {
        alert(error.message || "An unexpected registration error occurred.");
      } else {
        // Clear inputs on successful sign up
        setFormData({ name: '', email: '', password: '', agreeToTerms: false });
        
        // Push user to standard login path
        router.push("/auth/login");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong with the authentication server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50/40 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-orange-100">

        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 text-white text-2xl font-bold mb-3 shadow-md shadow-orange-500/20">
            🍳
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Taste<span className="text-orange-500">Bite</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Join our culinary community and start sharing delicious recipes.
          </p>
        </div>

        {/* Signup Form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>

          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Chef Gus"
              className={
                errors.name
                  ? 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all border-red-300 focus:ring-red-100 focus:border-red-500'
                  : 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all border-gray-200 focus:ring-orange-100 focus:border-orange-500'
              }
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.name}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={
                errors.email
                  ? 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all border-red-300 focus:ring-red-100 focus:border-red-500'
                  : 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all border-gray-200 focus:ring-orange-100 focus:border-orange-500'
              }
            />
            {errors.email && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={
                errors.password
                  ? 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all border-red-300 focus:ring-red-100 focus:border-red-500'
                  : 'w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all border-gray-200 focus:ring-orange-100 focus:border-orange-500'
              }
            />
            {errors.password && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.password}</p>}
          </div>

          {/* Terms and Conditions */}
          <div>
            <div className="flex items-start">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 mt-1"
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-600">
                I agree to TasteBite s{' '}
                <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                  Privacy Policy
                </a>
                .
              </label>
            </div>
            {errors.terms && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.terms}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? 'Cooking up your account...' : 'Create Account'}
          </button>

          {/* Footer Sign In Redirect */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <a href="/auth/login" className="font-semibold text-orange-600 hover:text-orange-500 transition-colors">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}