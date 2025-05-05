import { SignUp } from "@clerk/nextjs";

export default function CustomSignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
            card: "shadow-xl border border-gray-200 rounded-2xl",
            headerTitle: "text-3xl font-bold text-center",
            headerSubtitle: "text-sm text-gray-500 text-center",
          },
          variables: {
            colorPrimary: "#169976", // Tailwind blue-800
          },
        }}
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
      />
    </div>
  );
}
