import Information from "@/components/home/information";
import Footer from "@/components/navigation/footer";

const ValorantHomePage = () => {
  return ( 
    <>
      <div className="flex flex-col w-screen h-auto items-center justify-start pt-6 pb-6">
        <h1 className="md:text-4xl text-3xl">Welcome to Valomind</h1>
        <div className="md:w-1/2 w-3/4 grid grid-flow-row md:grid-cols-2 sm:grid-cols-1 gap-6 pt-4 h-auto">
          <Information 
            header="How it works"
            content="Create an account on Valomind.com. Then, link your valorant account using the button in the top left. This will automatically fetch some of your matches and stats. Now, use the matches tab to view your recent matches, use the scoreboard to see your stats for the game, and use the 'map overview' button to see the play-by-play recreation of the game."
          />
          <Information 
            header="Project History"
            content="This is one of my first NextJs projects. The development of this project started in the fall of 2023 and it was finished midway through spring 2024. This was my most intelectually challenging project because of the lack of knowledge I had before this. I learned so many things like API routes, front-end development/styling, back-end management, and so much more."
          />
          <Information 
            header="About the developer"
            content="My name is Gavin Robson, and I'm currently a Junior at Towson University studying computer science. I have been playing Valorant since the game was released in a beta version. I found NextJs/React in the summer of 2023, and I have been coming up with projects like this to create in my free time to expand my knowledge about web development."
          />
        </div>
      </div>
      <Footer />
    </>
   );
}
 
export default ValorantHomePage;