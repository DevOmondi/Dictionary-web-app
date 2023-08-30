// import React from 'react'

const MeaningSection = ({ meaningObject }) => {
  return (
    <div className="w-[90%] mx-auto lg:w-[50%] md:w-[75%]">
      <div className="flex items-center w-[90%] mx-auto gap-2 mt-[2rem]">
        <p className="font-bold italic">{meaningObject.partOfSpeech}</p>
        <div className="h-[1px] bg-[#979797] w-[100%]"></div>
      </div>
      <p className="text-[#757575] py-[1rem]">Meaning</p>
      <div className="ml-[5%]">
        {meaningObject?.definitions?.map((definitionObject, index) => (
          <ul className="list-disc disc-[#A445ED]" key={index}>
            <li>{definitionObject?.definition}</li>
          </ul>
        ))}
      </div>
      {/* Synonyms section */}
      <div className="flex justify-between items-center w-[80%]">
        <p className="text-[#757575] py-[1rem]">Synonyms</p>
        {meaningObject?.synonyms?.map((synonym, index) => (
          <div className="text-[#A445ED] flex gap-1" key={index}>
            <p>{synonym}</p>
          </div>
        ))}
      </div>
      {/* Antonyms section */}
      <div className="flex justify-between items-center w-[80%]">
        <p className="text-[#757575] py-[1rem]">Antonyms</p>
        {meaningObject?.antonyms?.map((antonym, index) => (
          <div className="text-[#A445ED]  flex gap-1" key={index}>
            <p>{antonym}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeaningSection;
