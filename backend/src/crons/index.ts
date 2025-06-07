import { removeOldTokensCron } from "./tokenLifeDel.cron";

export const cronRunner = async () => {
  removeOldTokensCron.start();
};
