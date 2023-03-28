import { makeAutoObservable } from "mobx";

export default class DashboardStore {
  constructor() {
    makeAutoObservable(this);
  }
}
