import React, { useState, useCallback, useEffect } from "react";
import { Character } from "../components/RickAndMorty/Character";
import { FetchedCharacters } from "../components/RickAndMorty/FetchedCharacters";
import { FetchSection } from "../components/RickAndMorty/FetchSection";
import useHttp from "../hooks/use-http";
import { CurrentlyShownCharacter } from "../models/currentlyShownCharacter";
import classes from "./RickMortyPage.module.css";

interface RickMortyPageProps {}

export const RickMortyPage: React.FC<RickMortyPageProps> = ({}) => {
  const [characterID, setCharacterID] = useState<number | undefined>(undefined);
  const uri = `https://rickandmortyapi.com/api/character/${characterID}`;

  const getData = useCallback((obj: any) => {
    const newCharacter: CurrentlyShownCharacter = {
      gender: obj.gender,
      id: obj.id,
      image: obj.image,
      locationName: obj.location.name,
      originName: obj.origin.name,
      name: obj.name,
      species: obj.species,
      status: obj.status,
    };

    localStorage.setItem("currentlyShown", JSON.stringify(newCharacter));

    const dataFromStorage = localStorage.getItem("savedCharacters");
    if (!dataFromStorage) {
      let arr = [];
      arr.push(newCharacter);
      localStorage.setItem("savedCharacters", JSON.stringify(arr));
    } else {
      let arr = JSON.parse(dataFromStorage);
      arr.push(newCharacter);
      localStorage.setItem("savedCharacters", JSON.stringify(arr));
    }
  }, []);

  const { isLoading, sendRequest } = useHttp(getData);

  useEffect(() => {
    if (characterID) {
      sendRequest({ url: uri });
    }
  }, [sendRequest, characterID, uri]);

  return (
    <div className={classes["RickAndMorty-Wrapper"]}>
      <main className={classes["RickAndMorty-Content"]}>
        <section className={classes["fetching-character"]}>
          <FetchSection setCharacterID={setCharacterID} />
          {!isLoading && (
            <div>
              <Character />
            </div>
          )}
        </section>
        <section className={classes["fetched-characters"]}>
          <FetchedCharacters />
        </section>
      </main>
    </div>
  );
};
