"use client";

import type { ComponentType } from "react";
import { EnergyTimeline } from "./EnergyTimeline";
import { GridEras } from "./GridEras";
import { ApplianceCalculator } from "./ApplianceCalculator";
import { GridBalancer } from "./GridBalancer";
import { ControlStack } from "./ControlStack";
import { TapAndBath } from "./metaphors/TapAndBath";
import { Seesaw } from "./metaphors/Seesaw";
import { EnergyLadder } from "./metaphors/EnergyLadder";
import { AdditionsSketch } from "./metaphors/AdditionsSketch";
import { RoadsMetaphor } from "./metaphors/RoadsMetaphor";
import { ControlMetaphors } from "./metaphors/ControlMetaphors";

/** Register interactive visuals by name so lesson content can reference them. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const VISUALS: Record<string, ComponentType<any>> = {
  EnergyTimeline,
  GridEras,
  ApplianceCalculator,
  GridBalancer,
  ControlStack,
  TapAndBath,
  Seesaw,
  EnergyLadder,
  AdditionsSketch,
  RoadsMetaphor,
  ControlMetaphors,
};
