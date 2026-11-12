"use client";

import type { ComponentType } from "react";
import { EnergyTimeline } from "./EnergyTimeline";
import { GridEras } from "./GridEras";
import { ApplianceCalculator } from "./ApplianceCalculator";
import { GridBalancer } from "./GridBalancer";
import { ControlStack } from "./ControlStack";

/** Register interactive visuals by name so lesson content can reference them. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const VISUALS: Record<string, ComponentType<any>> = {
  EnergyTimeline,
  GridEras,
  ApplianceCalculator,
  GridBalancer,
  ControlStack,
};
