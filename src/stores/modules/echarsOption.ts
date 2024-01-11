import { defineStore } from "pinia";
import piniaPersistConfig from "@/stores/helper/persist";

export const useEcharsOptionStore = defineStore({
  id: "echars-option",
  state: () => ({
    echarsOption: {}
  }),
  getters: {},
  actions: {
    setOption(option: object) {
      this.echarsOption = option;
    }
  },
  persist: piniaPersistConfig("echars-option")
});
