import { Mail } from "lucide-react";
import { FiGithub } from "react-icons/fi";

// components/Footer.js
export default function Footer() {
  return (
    <div>
      <footer className="bg-gray-800 text-white p-4 hidden md:flex items-center justify-center">
        <div className="w-1/2 flex justify-between mx-10 items-center h-[100px]">
          <div>
            <p className="text-gray-300">&copy; 2025 Valomind</p>
            <p className="text-gray-300">All Rights Reserved</p>
          </div>
          <div>
            <div className="flex flex-row space-x-2 items-center">
              <Mail size={20}/>
              <p>Contact: <a href="mailto:gavin.t.robson@gmail.com" className="text-blue-400">gavin.t.robson@gmail.com</a></p>
            </div>
            <div className="flex flex-row space-x-2 items-center">
              <FiGithub size={20}/>
              <p>GitHub: <a href="https://github.com/GavinRobson" target="_blank" className="text-blue-400">GavinRobson</a></p>
            </div>
          </div>
        </div>
      </footer>
      <footer className="bg-gray-800 text-white p-4 block md:hidden">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <div>
            <div className="flex flex-row space-x-2 items-center">
              <Mail size={20}/>
              <p>Contact: <a href="mailto:gavin.t.robson@gmail.com" className="text-blue-400">gavin.t.robson@gmail.com</a></p>
            </div>
            <div className="flex flex-row space-x-2 items-center">
              <FiGithub size={20}/>
              <p>GitHub: <a href="https://github.com/GavinRobson" target="_blank" className="text-blue-400">GavinRobson</a></p>
            </div>
            <div className="text-gray-300 pt-2">
              &copy; 2024 Case Club
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
