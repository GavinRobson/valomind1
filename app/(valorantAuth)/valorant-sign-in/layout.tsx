const ValorantSignInLayout = ({ children }: { children: React.ReactNode }) => {
  return ( 
    <div className="bg-[url('/images/background-sign-in.jpg')] h-full w-full bg-cover bg-fixed bg-center bg-no-repeat">
      <div className="flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
   );
}
 
export default ValorantSignInLayout;