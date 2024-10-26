import { useEffect, useState } from "react";
import { store } from ".";

export const EntityStoreDevTools = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Object.entries(store).forEach(([storeName, manager]) => {
      manager.eventsSubscriber = (event) => {
        console.info(`Entity updated (${storeName}) :`, event);
      };
    });
  }, []);

  return <div></div>;
};
