import React, { useEffect, useState } from "react";
import { CurrentlyShownCharacter } from "../../models/currentlyShownCharacter";
import classes from "./FetchedCharacters.module.css";

export const FetchedCharacters: React.FC = () => {
  const [savedCharactes, setSavedCharacters] = useState<
    CurrentlyShownCharacter[]
  >([]);

  const saved = localStorage.getItem("savedCharacters");
  const handleClick = (obj: CurrentlyShownCharacter) => {
    localStorage.setItem("currentlyShown", JSON.stringify(obj));
  };

  const clearCache = () => {
    localStorage.clear();
  };

  useEffect(() => {
    if (saved) {
      setSavedCharacters(JSON.parse(saved));
    }
  }, [saved]);

  return (
    <section className={classes["fetched-characters"]}>
      <div className={classes["fetched-title"]}>
        <h2>Saved characters</h2>{" "}
        {savedCharactes.length !== 0 && (
          <h4 onClick={clearCache}>Clear cache?</h4>
        )}
      </div>
      {savedCharactes.length !== 0 ? (
        <div className={classes["fetched-characters-flex"]}>
          {savedCharactes.map((e) => (
            <div onClick={() => handleClick(e)} key={e.id}>
              <CharacterSmallVersion characterImage={e.image} />
            </div>
          ))}
        </div>
      ) : (
        <div>No characters fetched yet.</div>
      )}
    </section>
  );
};

interface CharacterSmallVersionProps {
  characterImage: string | undefined;
}

const CharacterSmallVersion: React.FC<CharacterSmallVersionProps> = ({
  characterImage,
}) => {
  return (
    <div className={classes["small-version-image-wrapper"]}>
      <img
        src={characterImage}
        className={classes["small-version-image"]}
        alt="character"
      />
    </div>
  );
};
