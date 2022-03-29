import React, { useState, useEffect } from "react";
import { CurrentlyShownCharacter } from "../../models/currentlyShownCharacter";
import classes from "./Character.module.css";

export const Character: React.FC = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [currentlyShown, setCurrentlyShown] = useState<CurrentlyShownCharacter>(
    {}
  );

  const saved = localStorage.getItem("currentlyShown");
  useEffect(() => {
    if (saved) {
      setCurrentlyShown(JSON.parse(saved));
      setLoaded(true);
      return;
    }
    setLoaded(false);
  }, [saved]);

  return (
    <div className={classes["character-wrapper"]}>
      <div>
        <div
          className={
            loaded
              ? classes["character-picture-wrapper"]
              : classes["undefined-character-picture-wrapper"]
          }
        >
          {loaded && (
            <img
              className={classes["character-picture"]}
              src={currentlyShown.image}
              alt="character"
            />
          )}
        </div>
      </div>
      <div className={classes["character-info"]}>
        <div className={classes["character-name"]}>
          {loaded ? currentlyShown.name : "???"}
        </div>
        <div
          className={classes["character-specific-info"]}
          style={loaded ? { opacity: 1 } : { opacity: 0 }}
        >
          <div>
            #{currentlyShown.id}, {currentlyShown.status},{" "}
            {currentlyShown.species}, {currentlyShown.gender}.
          </div>
          <div>origin: {currentlyShown.originName}</div>
          <div>location: {currentlyShown.locationName}</div>
        </div>
      </div>
    </div>
  );
};
