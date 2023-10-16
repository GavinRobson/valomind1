const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return ( 
    <div className="bg-[url('/images/background-sign-in.jpg')] bg-cover bg-fixed bg-center bg-no-repeat h-full flex items-center justify-center">
      {children}
    </div>
   );
}
 
export default AuthLayout;