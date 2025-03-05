const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return ( 
    <div className="bg-[url('/images/background-sign-in.jpg')] bg-cover bg-fixed bg-center bg-no-repeat h-full flex flex-col items-center justify-center">
      <span>Use username "demo" and password "valominddemo" for the demo</span>
      {children}
    </div>
   );
}
 
export default AuthLayout;