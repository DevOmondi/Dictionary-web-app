import { useState, createContext } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import playIcon from "./assets/images/icon-play.svg";
import searchIcon from "./assets/images/icon-search.svg";
import linkIcon from "./assets/images/icon-new-window.svg";
import Header from "./Components/Header";
import MeaningSection from "./Components/MeaningSection";
import axios from "axios";

// Dark theme context
export const darkThemeContext = createContext();

function App() {
  const [wordInfo, setWordInfo] = useState({});
  const [searchedWord, setSearchedWord] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fontValue, setFontValue] = useState({});
  // console.log("Searched word:",searchedWord);
  // TODO: Func to play audio
  function playAudio() {
    wordInfo?.phonetics?.map((phonetic) => {
      const wordAudio = new Audio(`${phonetic.audio}`);
      wordAudio.play();
    });
  }
  // console.log("Font :",fontValue);
  async function getWordInfo() {
    if (searchedWord) {
      try {
        setIsLoading(true);
        const _response = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`
        );
        const _data = _response.data;
        _data.map((word) => setWordInfo(word));
        setIsLoading(false);
        // console.log("Response data:", _data);
        setSearchedWord("");
      } catch (error) {
        alert("Ooops!!! something definitely went wrong :(");
        setIsLoading(false);
      }
    } else {
      alert("Please enter the word you wish to search :)");
    }
  }
  // console.log("word info", wordInfo);

  return (
    <darkThemeContext.Provider
      value={{ darkTheme: darkTheme, setDarkTheme: setDarkTheme }}
    >
      <div
        className={`h-[100vh] overflow-auto ${
          darkTheme ? "bg-[#050505]" : "bg-[#FFFFFF]"
        } ${darkTheme ? "text-[#FFFFFF]" : "text-[#2D2D2D]"}`}
        style={{ fontFamily: `${fontValue.value}` }}
      >
        <Header setFontValue={setFontValue} />
        {/* Search section */}
        <div
          className={`flex justify-between px-[1rem] py-[0.6rem] mt-[1.8rem] ${
            darkTheme ? "bg-[#1F1F1F]" : "bg-[#F4F4F4]"
          } w-[90%] lg:w-[50%] md:w-[75%] mx-auto rounded-md`}
        >
          <input
            value={searchedWord}
            placeholder="which word?"
            type="text"
            className={`${
              darkTheme ? "bg-[#1F1F1F]" : "bg-[#F4F4F4]"
            } focus:outline-none`}
            onChange={(e) => setSearchedWord(e.target.value)}
          />
          <img
            src={searchIcon}
            alt="search icon"
            onClick={getWordInfo}
            className="cursor-pointer"
          />
        </div>
        {/* Loader */}
        {isLoading && (
          <MagnifyingGlass
            visible={true}
            height="60"
            width="60"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass={`mx-auto my-5`}
            glassColor={darkTheme ? "#1F1F1F" : "#F4F4F4"}
            color="#A445ED"
          />
        )}
        {/* Pronunciation and play section */}
        <div className="flex justify-between w-[90%] lg:w-[50%] md:w-[75%] mx-auto items-center mt-[2rem]">
          <div>
            <h1 className="text-2xl font-bold">{wordInfo?.word}</h1>
            {wordInfo?.phonetics?.map((phonetic, index) => (
              <h1 className="text-lg text-[#A445ED]" key={index}>
                {phonetic?.text}
              </h1>
            ))}
          </div>
          <img
            src={playIcon}
            alt="play icon"
            height={40}
            width={40}
            onClick={playAudio}
            className="cursor-pointer"
          />
        </div>
        {/* Meaning section */}
        <div>
          {wordInfo?.meanings?.map((meaning, index) =>
            meaning ? (
              <MeaningSection meaningObject={meaning} key={index} />
            ) : (
              "Ooopsy, Nothing to show :("
            )
          )}
        </div>
        <div className="h-[1px] bg-[#979797] w-[90%] lg:w-[50%] md:w-[75%] mx-auto my-[1rem]"></div>
        {/* Footer section */}
        <div className="mx-[5%] lg:mx-[25%] md:mx-[12.5%] pb-[2rem]">
          <p className="underline">Source</p>
          <div className="flex">
            <a target="_blank" rel="noreferrer" href={`${wordInfo.sourceUrls}`}>
              {wordInfo?.sourceUrls}
            </a>
            <img src={linkIcon} alt="link to new window" />
          </div>
        </div>
      </div>
    </darkThemeContext.Provider>
  );
}

export default App;
