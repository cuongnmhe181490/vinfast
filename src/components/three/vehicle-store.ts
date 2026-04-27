"use client";

import { create } from "zustand";

export type InteriorPreset = "driver" | "rear" | "cargo" | "dashboard" | null;

type VehicleViewerState = {
  autoRotate: boolean;
  doorsOpen: boolean;
  trunkOpen: boolean;
  xray: boolean;
  lowPower: boolean;
  explodeAmount: number;
  interiorPreset: InteriorPreset;
  color: string;
  setAutoRotate: (value: boolean) => void;
  setDoorsOpen: (value: boolean) => void;
  setTrunkOpen: (value: boolean) => void;
  setXray: (value: boolean) => void;
  setLowPower: (value: boolean) => void;
  setExplodeAmount: (value: number) => void;
  setInteriorPreset: (value: InteriorPreset) => void;
  setColor: (value: string) => void;
  reset: () => void;
};

const initialState = {
  autoRotate: true,
  doorsOpen: false,
  trunkOpen: false,
  xray: false,
  lowPower: false,
  explodeAmount: 0,
  interiorPreset: null,
  color: "#f7fbff",
};

export const useVehicleStore = create<VehicleViewerState>((set) => ({
  ...initialState,
  setAutoRotate: (autoRotate) => set({ autoRotate }),
  setDoorsOpen: (doorsOpen) => set({ doorsOpen }),
  setTrunkOpen: (trunkOpen) => set({ trunkOpen }),
  setXray: (xray) => set({ xray }),
  setLowPower: (lowPower) => set({ lowPower }),
  setExplodeAmount: (explodeAmount) => set({ explodeAmount }),
  setInteriorPreset: (interiorPreset) => set({ interiorPreset }),
  setColor: (color) => set({ color }),
  reset: () => set(initialState),
}));
