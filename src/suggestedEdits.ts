export type ImpactGrade =
  | 'low_positive_effect'
  | 'low_adverse_effect'
  | 'low_medium_positive_effect'
  | 'low_medium_adverse_effect'
  | 'medium_positive_effect'
  | 'medium_adverse_effect'
  | 'medium_high_positive_effect'
  | 'medium_high_adverse_effect'
  | 'high_positive_effect'
  | 'high_adverse_effect';

export const ImpactGradeToScore: Record<ImpactGrade, number> = {
  low_positive_effect: 1,
  low_adverse_effect: -1,
  low_medium_positive_effect: 1.5,
  low_medium_adverse_effect: -1.5,
  medium_positive_effect: 2,
  medium_adverse_effect: -2,
  medium_high_positive_effect: 2.5,
  medium_high_adverse_effect: -2.5,
  high_positive_effect: 3,
  high_adverse_effect: -3,
};

export const ImpactGradeToLabel: Record<ImpactGrade, string> = {
  low_positive_effect: 'Low Positive Effect',
  low_adverse_effect: 'Low Adverse Effect',
  low_medium_positive_effect: 'Low/Medium Positive Effect',
  low_medium_adverse_effect: 'Low/Medium Adverse Effect',
  medium_positive_effect: 'Medium Positive Effect',
  medium_adverse_effect: 'Medium Adverse Effect',
  medium_high_positive_effect: 'Medium/High Positive Effect',
  medium_high_adverse_effect: 'Medium/High Adverse Effect',
  high_positive_effect: 'High Positive Effect',
  high_adverse_effect: 'High Adverse Effect',
};

export type ImpactTerm = 'nearTerm' | 'longTerm';

export type ImpactEffect = {
  score: ImpactGrade;
  description: string;
  term?: ImpactTerm;
  additionalMarkers?: { label: string; helperText: string }[];
};

export type SuggestedEditRow = {
  measure: string;
  feasible: boolean;
  safety: ImpactEffect[];
  economic: ImpactEffect[];
  environmental: ImpactEffect[];
  accessToDestinations: ImpactEffect[];
  modeShift: ImpactEffect[];
};

export const impactGoalKeys = [
  'safety',
  'economic',
  'environmental',
  'accessToDestinations',
  'modeShift',
] as const;

export type ImpactGoalKey = (typeof impactGoalKeys)[number];

export function isPositiveImpactGrade(score: ImpactGrade) {
  return ImpactGradeToScore[score] > 0;
}

export function impactGradeMagnitude(score: ImpactGrade) {
  return Math.abs(ImpactGradeToScore[score]);
}

export function getSuggestedEditTotalScore(
  row: SuggestedEditRow,
  goals: readonly ImpactGoalKey[],
) {
  return goals.reduce((total, goal) => {
    return (
      total +
      row[goal].reduce(
        (goalTotal, effect) => goalTotal + ImpactGradeToScore[effect.score],
        0,
      )
    );
  }, 0);
}

export function getSuggestedEditMode(measure: string) {
  const value = measure.toLowerCase();
  if (value.includes('bike')) {
    return 'bike' as const;
  }
  if (value.includes('pedestrian')) {
    return 'pedestrian' as const;
  }
  if (value.includes('bus')) {
    return 'transit' as const;
  }
  return 'vehicle' as const;
}

export const suggestedEditRows: SuggestedEditRow[] = [
  {
    measure: 'Remove bus lanes',
    feasible: true,
    safety: [
      {
        score: 'low_adverse_effect',
        description: `Conflicts and friction due to the need for buses to pull in and out of traffic or stop in the travel lane.`,
      },
      {
        score: 'low_positive_effect',
        description: `Reduced crossing distance for people walking and biking.`,
      },
    ],
    economic: [
      {
        score: 'medium_adverse_effect',
        description: `Reduced ability to move passengers to and from jobs and businesses; increased bus cycle time may also require additional buses to be added to maintain headways, adding to operating costs.`,
      },
    ],
    environmental: [
      {
        score: 'medium_adverse_effect',
        description: `Induces personal vehicle use if it negatively affects transit operations.`,
      },
    ],
    accessToDestinations: [
      {
        score: 'medium_adverse_effect',
        description: `Reduces utility of riding the bus which may promote driving, reduce time spent being active (walking to/from transit), reduce interaction with others, and reduce consistent, reliable access for zero- or low- car households.`,
      },
    ],
    modeShift: [
      {
        score: 'high_adverse_effect',
        description: `Bus reliability and travel times can be significantly slowed by traffic if a bus lane is removed, making transit a less viable and competitive option. In areas where congestion is low, removing a bus lane is likely to have insignificant impacts.`,
      },
    ],
  },
  {
    measure: 'Narrow bus lanes',
    feasible: true,
    safety: [
      {
        score: 'low_adverse_effect',
        description: `If roadway is curved or lane is below 11', or lane is shared with bicycles.`,
      },
    ],
    economic: [],
    environmental: [],
    accessToDestinations: [],
    modeShift: [],
  },
  {
    measure: 'Widen bus lanes',
    feasible: true,
    safety: [
      {
        score: 'low_positive_effect',
        description: `If roadway is curved or lane is below 11', or lane is shared with bicycles.`,
      },
    ],
    economic: [],
    environmental: [],
    accessToDestinations: [],
    modeShift: [],
  },
  {
    measure: 'Add bus lanes',
    feasible: true,
    safety: [
      {
        score: 'low_positive_effect',
        description: `Removes conflicts and friction from buses pulling in and out of traffic or stopping in the travel lane.`,
      },
      {
        score: 'low_adverse_effect',
        description: `Increased crossing distance for people walking and biking.`,
      },
    ],
    economic: [
      {
        score: 'medium_positive_effect',
        description: `Improved ability to move passengers to and from jobs and businesses; reduced bus cycle time may also require fewer buses to be added to maintain headways, reducing operating costs.`,
      },
    ],
    environmental: [
      {
        score: 'medium_positive_effect',
        description: `Reduces personal vehicle use if it positively affects transit operations.`,
      },
    ],
    accessToDestinations: [
      {
        score: 'medium_positive_effect',
        description: `Increases utility of riding the bus which may reduce driving, increase time spent being active (walking to/from transit), increase interaction with others, and improve consistent, reliable access for zero- or low- car households.`,
      },
    ],
    modeShift: [
      {
        score: 'high_positive_effect',
        description: `Bus reliability and travel times can be significantly improved, making transit a more viable and competitive option. In areas where congestion is low, adding a bus lane is likely to have insignificant impacts.`,
      },
    ],
  },
  {
    measure: 'Remove bike lanes',
    feasible: true,
    safety: [
      {
        score: 'high_adverse_effect',
        description: `Removed exclusive biking space leads to reduced comfort of bicyclists, likely leading to more riding in the sidewalk or travel lanes, increased conflicts with motor vehicles and lack of predictable behavior, and less use and less expectation of bicyclist presence and behavior.
FHWA cites a 30 to 49% crash reduction for the addition of painted bicycle lanes and a 40 to 70% crash reduction for upgrading painted bicycle lanes to separated bicycle lanes depending on the vertical elements used.`,
      },
    ],
    economic: [
      {
        score: 'medium_adverse_effect',
        description: `Reduced bicycling access can deter customer access, reduce trip options and negatively affect local economic activity.`,
      },
    ],
    environmental: [
      {
        score: 'medium_adverse_effect',
        description: `Reduced bicycle access can induce driving, increasing vehicle miles traveled and related pollution.`,
      },
    ],
    accessToDestinations: [
      {
        score: 'high_adverse_effect',
        description: `Reduced access to physical activity, reduced incentive for local trips linked to community building and increased direct exposure to pollution. Reduces ability for some communities (such as zero- or low-car households or other underserved communities) to reach the goods and services they need.`,
      },
    ],
    modeShift: [
      {
        score: 'high_adverse_effect',
        description: `Unless there is a low stress, direct alternate route, removing a bike lane decreases comfort and predictability which deters potential cyclists and decreases bike mode share.`,
      },
    ],
  },
  {
    measure: 'Narrow bike lanes',
    feasible: true,
    safety: [
      {
        score: 'medium_adverse_effect',
        description: `If narrowing leads to a width below the minimally safe width or reduces the comfort of bicyclists, there may be less use and less expectation of bicyclist presence and behavior. Reduced separation from motor vehicles can also lead to decreased visibility of bicyclists.`,
      },
    ],
    economic: [
      {
        score: 'low_medium_adverse_effect',
        description: `If the reduction decreases the comfort of bicyclists, it reduces bicycling access which can deter customer access, reduce trip options and negatively affect local economic activity.`,
      },
    ],
    environmental: [
      {
        score: 'medium_adverse_effect',
        description: `If the reduction decreases the comfort of bicyclists, reduced bicycle access can induce driving, increasing vehicle miles traveled and related pollution.`,
      },
    ],
    accessToDestinations: [
      {
        score: 'medium_adverse_effect',
        description: `If the reduction decreases the comfort of bicyclists, causing a decrease in ridership, it reduces physical activity and reduces local trips linked to community building. Reduces ability for some communities (such as zero- or low-car households or other underserved communities) to reach the goods and services they need.`,
      },
    ],
    modeShift: [
      {
        score: 'medium_adverse_effect',
        description: `If the reduction decreases comfort and predictability, it can deter potential cyclists and decrease bike mode share.`,
      },
    ],
  },
  {
    measure: 'Widen bike lanes',
    feasible: true,
    safety: [
      {
        score: 'medium_positive_effect',
        description: `If widening increases width above minimally safe width or increases the comfort of bicyclists, there may be greater use and greater expectation of bicyclist presence and behavior. Increased separation from motor vehicles can also lead to increased visibility of bicyclists.`,
      },
    ],
    economic: [
      {
        score: 'low_medium_positive_effect',
        description: `If the increase improves the comfort of bicyclists, it increases bicycling access and use which can improve access to businesses and services, expand trip options, and support local economic activity.`,
      },
    ],
    environmental: [
      {
        score: 'medium_positive_effect',
        description: `If the increase improves the comfort of bicyclists, increased bicycling access can reduce driving, decreasing vehicle miles traveled and related pollution.`,
      },
    ],
    accessToDestinations: [
      {
        score: 'medium_positive_effect',
        description: `If the increase improves the comfort of bicyclists, causing an increase in ridership, it increases physical activity and increases local trips linked to community building. Increases ability for some communities (such as zero- or low-car households or other underserved communities) to reach the goods and services they need.`,
      },
    ],
    modeShift: [
      {
        score: 'medium_positive_effect',
        description: `If the widening increases the comfort and predictability, it can reduce barriers for potential cyclists and increase bike mode share.`,
      },
    ],
  },
  {
    measure: 'Add bike lanes',
    feasible: true,
    safety: [
      {
        score: 'high_positive_effect',
        description: `Added exclusive biking space leads to increased comfort of bicyclists, leading to increased use and expectation of bicyclist presence and behavior.
FHWA cites a 30 to 49% crash reduction for the addition of painted bicycle lanes and a 40 to 70% crash reduction for upgrading painted bicycle lanes to separated bicycle lanes depending on the vertical elements used.`,
      },
    ],
    economic: [
      {
        score: 'medium_positive_effect',
        description: `Increased bicycling access and use which can improve access to businesses and services, expand trip options, and support local economic activity.`,
      },
    ],
    environmental: [
      {
        score: 'medium_positive_effect',
        description: `Increased bicycling access can reduce driving, decreasing vehicle miles traveled and related pollution.`,
      },
    ],
    accessToDestinations: [
      {
        score: 'high_positive_effect',
        description: `Increased access to physical activity, increased incentive for local trips linked to community building and decreased direct exposure to pollution. Increases ability for some communities (such as zero- or low-car households or other underserved communities) to reach the goods and services they need.`,
      },
    ],
    modeShift: [
      {
        score: 'high_positive_effect',
        description: `Increased comfort and predictability can reduce barriers for potential cyclists and increase bike mode share.`,
      },
    ],
  },
  {
    measure: 'Remove pedestrian infrastructure',
    feasible: true,
    safety: [
      {
        score: 'high_adverse_effect',
        description: `Removing pedestrian infrastructure forces people to walk in or along facilities designed for other motor vehicles; reduces comfort and predictability; deters walking; reduces expectation of pedestrian presence; and removes access for people requiring ADA‑compliant facilities.

FHWA cites an 88% crash reduction when providing sidewalks.`,
      },
    ],
    economic: [
      {
        score: 'high_adverse_effect',
        description: `Removing pedestrian infrastructure eliminates walking access along the corridor, reducing foot traffic, diminishing curb appeal, limiting access to businesses and services, increasing travel costs and trip lengths, and removing space that supports business activity (e.g., outdoor seating, sandwich boards, bike parking).`,
      },
    ],
    environmental: [
      {
        score: 'medium_adverse_effect',
        description: `Reduced propensity to walk to destinations, inducing driving and related pollution.`,
      },
    ],
    accessToDestinations: [
      {
        score: 'high_adverse_effect',
        description: `Reduces access and propensity to walk to destinations, which promotes physical activity, socialization, community building, and propensity for local trips. Also decreases destination accessibility, placemaking and creates an uninviting atmosphere. Reduces ability for some communities (such as zero- or low-car households or underserved communities) to reach the goods and services they need.`,
      },
    ],
    modeShift: [
      {
        score: 'high_adverse_effect',
        description: `Decreased comfort, safety and convenience can deter potential pedestrians and decrease walking mode share.`,
      },
    ],
  },
  {
    measure: 'Narrow pedestrian infrastructure',
    feasible: true,
    safety: [
      {
        score: 'medium_adverse_effect',
        description: `If narrowing reduces width below minimally safe width or ADA standard widths; it can reduce comfort and visibility; increase conflicts with motor vehicles; and limit accessibility for some users.`,
      },
    ],
    economic: [
      {
        score: 'medium_adverse_effect',
        description: `Narrowing pedestrian infrastructure reduces walking comfort and usable space, which can decrease foot traffic, constrain curb appeal, limit access to businesses and services, and constrain space that supports business activity (e.g., outdoor seating, sandwich boards, bike parking).`,
      },
    ],
    environmental: [
      {
        score: 'medium_adverse_effect',
        description: `Reduced propensity to walk to destinations, inducing driving and related pollution.`,
      },
    ],
    accessToDestinations: [
      {
        score: 'high_adverse_effect',
        description: `Reduces access and propensity to walk to destinations, which promotes physical activity, socialization, community building, and propensity for local trips. Also decreases destination accessibility, placemaking and creates an uninviting atmosphere. Reduces ability for some communities (such as zero- or low-car households or underserved communities) to reach the goods and services they need.`,
      },
    ],
    modeShift: [
      {
        score: 'medium_adverse_effect',
        description: `If narrowing decreases comfort, safety and convenience, it can deter potential pedestrians and decrease walking mode share.`,
      },
    ],
  },
  {
    measure: 'Widen pedestrian infrastructure',
    feasible: true,
    safety: [
      {
        score: 'medium_positive_effect',
        description: `If widening increases width above minimally safe width or ADA standard widths, it can improve comfort and visibility; reduce conflicts with motor vehicles; and better accommodate a wider range of users.`,
      },
    ],
    economic: [
      {
        score: 'medium_positive_effect',
        description: `Widening pedestrian infrastructure increases walking comfort and usable space, which can increase foot traffic, enhance curb appeal, improve access to businesses and services, and provide additional space to support business activity (e.g., outdoor seating, sandwich boards, bike parking).`,
      },
    ],
    environmental: [
      {
        score: 'medium_positive_effect',
        description: `Increased propensity to walk to destinations, reducing driving and related pollution.`,
      },
    ],
    accessToDestinations: [
      {
        score: 'high_positive_effect',
        description: `Increases access and propensity to walk to destinations, which promotes physical activity, socialization, community building, and propensity for local trips. Also increases destination accessibility, placemaking and creates an inviting atmosphere. Reduces ability for some communities (such as zero- or low-car households or underserved communities) to reach the goods and services they need.`,
      },
    ],
    modeShift: [
      {
        score: 'medium_positive_effect',
        description: `If widening increases comfort, safety and convenience it can reduce barriers for potential pedestrians and increase walking mode share.`,
      },
    ],
  },
  {
    measure: 'Add pedestrian infrastructure',
    feasible: true,
    safety: [
      {
        score: 'high_positive_effect',
        description: `FHWA cites an 88% crash reduction when providing sidewalks. Pedestrian infrastructure adds separation from motor vehicle traffic; eliminates the need for people to walk in or along facilities dedicated to and designed for motor vehicles, increases pedestrian use, increases expectation of pedestrian presence and adds access for those requiring ADA facilities.`,
      },
    ],
    economic: [
      {
        score: 'high_positive_effect',
        description: `Adding pedestrian infrastructure establishes walking access along the corridor, increasing foot traffic, enhancing curb appeal, improving access to businesses and services, reducing travel costs for short trips, and providing space that supports business activity (e.g., outdoor seating, sandwich boards, bike parking).`,
      },
    ],
    environmental: [
      {
        score: 'medium_positive_effect',
        description: `Increased propensity to walk to destinations, reducing driving and related pollution.`,
      },
    ],
    accessToDestinations: [
      {
        score: 'high_positive_effect',
        description: `Increases access and propensity to walk to destinations, which promotes physical activity, socialization, community building, and propensity for local trips. Also increases destination accessibility, placemaking and creates an inviting atmosphere. Reduces ability for some communities(such as zero- or low-car households or underserved communities) to reach the goods and services they need.`,
      },
    ],
    modeShift: [
      {
        score: 'high_positive_effect',
        description: `Increasing comfort, safety and convenience reduces barriers to potential pedestrians and increases walking mode share.`,
      },
    ],
  },
  {
    measure: 'Remove travel lanes',
    feasible: true,
    safety: [
      {
        score: 'high_positive_effect',
        description: ``,
        term: 'nearTerm',
      },
      {
        score: 'medium_positive_effect',
        description: `Can induce traffic reduction in the long term and reduce ADT, the most closely associated factor with crash risk.`,
        term: 'longTerm',
        additionalMarkers: [
          {
            label: 'compound',
            helperText: `This effect is compound: it combines multiple contributing factors.`,
          },
        ],
      },
    ],
    economic: [
      {
        score: 'medium_adverse_effect',
        description: `Reduced automotive capacity, more delay, and higher cost of goods movement and lower mobility.`,
        term: 'nearTerm',
      },
      {
        score: 'low_positive_effect',
        description: `Opportunity for placemaking.`,
        term: 'nearTerm',
      },
      {
        score: 'low_positive_effect',
        description: `Potential for pass-by trips increased with mode shift from reduced vehicle travel lanes.`,
        term: 'longTerm',
      },
    ],
    environmental: [
      {
        score: 'medium_adverse_effect',
        description: `Worsened local air quality effects due to increased number of stops, stop-and-go traffic, and idling (vehicles occupy smaller area for longer period of time).`,
        term: 'nearTerm',
      },
      {
        score: 'medium_positive_effect',
        description: `Reduced long-term demand for driving and developments associated with driving (less pavement, smaller parking lots, less runoff, lower pollution). These long-term benefits are expected to outweigh short-term adverse effects, which may be partially mitigated by changes in vehicle fleet characteristics (EVs).`,
        term: 'longTerm',
      },
      {
        score: 'medium_adverse_effect',
        description: `If buses share a travel lane, congestion can decrease transit reliability and travel times, thereby decreasing the viability of and attractiveness of transit, reducing the likelihood for mode shift to transit.`,
        term: 'longTerm',
      },
    ],
    accessToDestinations: [
      {
        score: 'medium_positive_effect',
        description: `Travel lane removal helps with placemaking: street crossings are shorter and vehicle speeds and volumes are likely lower, leading to improved health outcomes over time. This impact is reduced if transit shares the lane and increased congestion decreases reliability and travel times.`,
      },
    ],
    modeShift: [
      {
        score: 'high_positive_effect',
        description: `If removing a lane increases motorist travel times, it can significantly increase the likelihood of switching to different modes. This impact is reduced if transit shares the lane and is also affected by congestion.`,
      },
    ],
  },
  {
    measure: 'Narrow travel lanes',
    feasible: true,
    safety: [
      {
        score: 'medium_positive_effect',
        description: `Unless existing lane widths are necessary for design vehicles, narrower lanes can promote slower speeds, reduce crash severity, reduce crossing distance, and shorten signal cycles.`,
      },
    ],
    economic: [],
    environmental: [
      {
        score: 'medium_positive_effect',
        description: `Reduces hard accelerations and cuts pollution through slower, steadier speeds.`,
      },
    ],
    accessToDestinations: [
      {
        score: 'low_positive_effect',
        description: `Vehicle speeds are likely lower.`,
      },
    ],
    modeShift: [
      {
        score: 'low_positive_effect',
        description: `Reduces speeds and travel times, thereby reducing propensity to drive.`,
      },
    ],
  },
  {
    measure: 'Widen travel lanes',
    feasible: true,
    safety: [
      {
        score: 'medium_adverse_effect',
        description: `Unless existing lane widths were inappropriate for design vehicles, wider lanes  allow/promote higher speeds, increase crash severity, increase crossing distances, and lengthen signal cycles.`,
      },
    ],
    economic: [],
    environmental: [
      {
        score: 'medium_adverse_effect',
        description: `Increases speeds and can increase pollution.`,
      },
    ],
    accessToDestinations: [
      {
        score: 'low_adverse_effect',
        description: `Vehicle speeds are likely higher.`,
      },
    ],
    modeShift: [
      {
        score: 'low_adverse_effect',
        description: `Increases speeds and travel times, thereby increasing propensity to drive.`,
      },
    ],
  },
  {
    measure: 'Add travel lanes',
    feasible: true,
    safety: [
      {
        score: 'high_adverse_effect',
        description: `Allows/promotes higher speeds, which are associated with increased crash severity. Longer distances to cross. More challenging clearance intervals for bicyclists. May decrease propensity for double parking.`,
        term: 'nearTerm',
      },
      {
        score: 'medium_adverse_effect',
        description: `Potentially induces more driving in the long term and increases ADT, the most closely associated factor with crash risk.`,
        term: 'longTerm',
        additionalMarkers: [
          {
            label: 'compound',
            helperText: `This effect is compound: it combines multiple contributing factors.`,
          },
        ],
      },
    ],
    economic: [
      {
        score: 'medium_positive_effect',
        description: `Increased automotive capacity, lower cost of goods movement and improved mobility.`,
        term: 'nearTerm',
      },
      {
        score: 'medium_adverse_effect',
        description: `Less opportunity for placemaking.`,
        term: 'nearTerm',
      },
      {
        score: 'low_adverse_effect',
        description: `Potential for reduced pass-by trips with induced driving demand (as opposed to other modes)`,
        term: 'longTerm',
      },
    ],
    environmental: [
      {
        score: 'medium_positive_effect',
        description: `Improved local air quality effects due to decreased number of stops, stop-and-go traffic, and idling (vehicles occupy smaller area for longer period of time).`,
        term: 'nearTerm',
      },
      {
        score: 'medium_adverse_effect',
        description: `Induced demand and developments associated with driving (more pavement, bigger parking lots, more runoff, more pollution). These long-term adverse effects are expected to outweigh short-term positive effects.`,
        term: 'longTerm',
      },
      {
        score: 'medium_positive_effect',
        description: `If buses share a travel lane, decreased congestion can improve reliability and travel times, increasing attractiveness of transit, reducing the amount of induced demand.`,
        term: 'longTerm',
      },
    ],
    accessToDestinations: [
      {
        score: 'medium_adverse_effect',
        description: `Impacts opportunities for placemaking: street crossings are longer, vehicle speeds and volumes are likely higher, and induced demand can increase driving, negatively effecting health outcomes over time. This impact is reduced if transit shares the lane and decreased congestion improves reliability and travel times.`,
      },
    ],
    modeShift: [
      {
        score: 'high_adverse_effect',
        description: `If adding a lane decreases motorist travel times, the likelihood of switching to a different mode is significantly decreased. This impact is reduced if transit shares the lane and is also affected by congestion.`,
      },
    ],
  },
  {
    measure: 'One to Two Way Conversion',
    feasible: true,
    safety: [
      {
        score: 'low_positive_effect',
        description: `Converting streets from one-way to two-way can increase safety by slowing speeds, decreasing risk of a double threat for pedestrians, and creating more pedestrian visibility during left-turns. Two-way streets have more conflict points than one-way streets, negating some safety benefits and contributing to the "low" benefit rating.`,
      },
    ],
    economic: [
      {
        score: 'high_positive_effect',
        description: `Converting streets from one-way to two-way increase access to and awareness of businesses. Studies show high positive impact to business revenue and property values for converted streets.`,
      },
    ],
    environmental: [],
    accessToDestinations: [
      {
        score: 'high_positive_effect',
        description: `Slower speeds and improved multimodal access often improve neighborhood livability and increase biking and walking traffic. Case studies have indicated correlation with a decline in crime in areas near converted streets.`,
      },
    ],
    modeShift: [],
  },
  {
    measure: 'Remove TWLTL',
    feasible: true,
    safety: [
      {
        score: 'medium_adverse_effect',
        description: `Removing a two way left turn lane may increase the frequency of rear end, angle and head on crashes. These effects are most pronounced in environments with many access points. If refuge islands did not exist, removing TWLTL can reduce crossing distance but simultaneously reduces opportunities for pedestrian refuge islands and a wide planted center median.`,
      },
    ],
    economic: [
      {
        score: 'low_adverse_effect',
        description: `Decreases motor vehicle access to businesses/services in areas where there are driveways and access points.`,
      },
    ],
    environmental: [
      {
        score: 'low_positive_effect',
        description: `Decreased capacity and motor vehicle access may lead to decreased volumes over time, which reduces vehicle-related pollution.`,
      },
    ],
    accessToDestinations: [],
    modeShift: [
      {
        score: 'low_positive_effect',
        description: `Decreased capacity and motor vehicle access may lead to decreased volumes over time and can provide opportunities for multimodal upgrades.`,
      },
    ],
  },
  {
    measure: 'Add TWLTL',
    feasible: true,
    safety: [
      {
        score: 'medium_positive_effect',
        description: `Adding a two way left turn lane may decrease the frequency of rear end, angle and head on crashes from 8 to 30%, most pronounced in environments with many access points. A TWLTL can provide space for pedestrian refuge islands, though pedestrian crossing distances may increase where refuges are not provided. In some contexts, adding a TWLTL can support four‑to‑three lane conversions that reduce pedestrian exposure and crossing distance; in corridors without frequent access points, it may alternatively be accommodated as a wide, planted center median.`,
      },
    ],
    economic: [
      {
        score: 'low_positive_effect',
        description: `Increases motor vehicle access to businesses/services in areas where there are driveways and access points and can be a low-cost treatment.`,
      },
    ],
    environmental: [
      {
        score: 'low_adverse_effect',
        description: `Decreased capacity and motor vehicle access may lead to increased volumes over time, which increases vehicle-related pollution.`,
      },
    ],
    accessToDestinations: [],
    modeShift: [
      {
        score: 'low_adverse_effect',
        description: `Increased capacity and motor vehicle access may lead to increased volumes over time and may reduce opportunities for multimodal upgrades.`,
      },
    ],
  },
  {
    measure: 'Remove median',
    feasible: true,
    safety: [
      {
        score: 'high_adverse_effect',
        description: `Motorized vehicle crash rate increases. Increased potential for head-on collisions. Vehicle-vehicle conflict points increased. Vehicle-pedestrian conflict points are increased, as  opportunities for a median refuge for crossings are eliminated. Increases vehicle-bicycle crash frequency at signalized intersections. Increases vehicle-bicycle conflict points.`,
      },
    ],
    economic: [
      {
        score: 'low_positive_effect',
        description: `Can improve traffic flow and corridor safety without harming overall business activity, with most businesses experiencing no decline, and some seeing increases in customers, sales, or property values.`,
      },
      {
        score: 'low_adverse_effect',
        description: `Could reduce sales if people are less willing to shop as a result of fewer pedestrian crossing opportunities (and perceived safety and comfort along a street).`,
      },
    ],
    environmental: [
      {
        score: 'medium_positive_effect',
        description: `May decrease VMT/pollution due to less direct access to sites with off-site parking.`,
      },
      {
        score: 'medium_adverse_effect',
        description: `If landscaped median had trees or stormwater management/drainage effects (increase runoff area).`,
      },
    ],
    accessToDestinations: [
      {
        score: 'medium_high_adverse_effect',
        description: `Decreases pedestrian street crossing quality of service. Creates potential barrier(s) in pedestrian network.`,
      },
    ],
    modeShift: [],
  },
  {
    measure: 'Narrow median',
    feasible: true,
    safety: [
      {
        score: 'low_adverse_effect',
        description: `If the median is reduced to be less than 6 feet wide, it cannot serve as a pedestrian refuge. Narrowing the median also generally provides less separation. (HSM Sec. 13.4.2.7)`,
      },
    ],
    economic: [
      {
        score: 'low_adverse_effect',
        description: `Reduces opportunity for planted median, thus reducing the opportunity for placemaking.`,
      },
    ],
    environmental: [],
    accessToDestinations: [],
    modeShift: [],
  },
  {
    measure: 'Widen median',
    feasible: true,
    safety: [
      {
        score: 'low_positive_effect',
        description: `If the median is widened to be 6 ft or greater, it can serve as a pedestrian refuge. Widening the median also generally provides greater separation and improved safety results.  (HSM Sec. 13.4.2.7)`,
      },
    ],
    economic: [
      {
        score: 'low_positive_effect',
        description: `Wide planted median is opportunity for placemaking.`,
      },
    ],
    environmental: [],
    accessToDestinations: [],
    modeShift: [],
  },
  {
    measure: 'Add median',
    feasible: true,
    safety: [
      {
        score: 'high_positive_effect',
        description: `Medians reduce vehicle crash rates and potential head-on collisions. Installing a median can produce almost a 40% reduction in vehicle-pedestrian crashes and 50% reduction when paired with a marked crosswalk.`,
      },
    ],
    economic: [
      {
        score: 'low_positive_effect',
        description: `Can improve traffic flow and corridor safety without harming overall business activity, with some businesses seeing increases in customers, sales, or property values. Could further improve sales if people are more willing to shop as a result of sufficient pedestrian crossing opportunities (and perceived safety and comfort along a street).`,
      },
      {
        score: 'low_adverse_effect',
        description: `Decrease sales for auto-dependent businesses such as gas stations if access is affected.`,
      },
    ],
    environmental: [
      {
        score: 'medium_adverse_effect',
        description: `May increase VMT/pollution due to less direct access to sites with off-site parking.`,
      },
      {
        score: 'medium_positive_effect',
        description: `If landscaped median will have trees or other stormwater management/drainage benefits (reduce runoff area).`,
      },
    ],
    accessToDestinations: [
      {
        score: 'medium_high_positive_effect',
        description: `Increases pedestrian street crossing quality of service. Increases continuity of pedestrian network. Improves opportunities for treated midblock crossings.`,
      },
    ],
    modeShift: [],
  },
  {
    measure: 'Remove parking',
    feasible: true,
    safety: [
      {
        score: 'low_positive_effect',
        description: `Decreased conflicts with all users from parking maneuvers, can increase visibility for pedestrians. Studies have shown crash reductions of 22 to 40% on urban roads where parking is removed. Reduced access to parking may decrease driving demand/VMT, thereby reducing crashes.`,
      },
      {
        score: 'low_adverse_effect',
        description: `All else is equal, can increase likelihood of double parking (hazardous behavior). Further, street parking can act as traffic calming.`,
      },
    ],
    economic: [
      {
        score: 'medium_adverse_effect',
        description: `Decreased meter revenue, may make customer access (finding parking) more difficult for businesses without off-street parking, and may remove space for loading/unloading delivery vehicles.`,
      },
    ],
    environmental: [
      {
        score: 'medium_positive_effect',
        description: `Decreased parking access can reduce demand for driving over time, reducing VMT/pollution.`,
        term: 'longTerm',
      },
      {
        score: 'medium_adverse_effect',
        description: `Can lead to increased circling for parking and associated pollution, provided that street parking constitutes a meaningful share of area parking.`,
        term: 'nearTerm',
      },
    ],
    accessToDestinations: [
      {
        score: 'low_adverse_effect',
        description: `All else equal, increases amount of time spent circling for parking, with decreased utility for motorists.`,
      },
    ],
    modeShift: [
      {
        score: 'high_positive_effect',
        description: `Decreasing parking supply can increase barriers to driving, increases likelihood of switching to different modes.`,
      },
    ],
  },
  {
    measure: 'Narrow parking',
    feasible: true,
    safety: [
      {
        score: 'low_positive_effect',
        description: `Reduces pedestrian crossing exposure if space is allocated to pedestrian facilities.`,
      },
      {
        score: 'low_adverse_effect',
        description: `If bicycle facilities are adjacent, it may increase likelihood of "dooring"; may increase conflicts between people entering/exiting their vehicles and moving motor vehicles.`,
      },
    ],
    economic: [],
    environmental: [],
    accessToDestinations: [],
    modeShift: [],
  },
  {
    measure: 'Widen parking',
    feasible: true,
    safety: [
      {
        score: 'low_positive_effect',
        description: `If bicycle facilities are adjacent, it may decrease likelihood of "dooring"; may decrease conflicts between people entering/exiting their vehicles and moving motor vehicles.`,
      },
      {
        score: 'low_adverse_effect',
        description: `Increases pedestrian crossing exposure if space is allocated from pedestrian facilities.`,
      },
    ],
    economic: [],
    environmental: [],
    accessToDestinations: [],
    modeShift: [],
  },
  {
    measure: 'Add parking',
    feasible: true,
    safety: [
      {
        score: 'low_adverse_effect',
        description: `Increased conflicts from parking maneuvers; increased access to parking may increase driving demand/VMT, thereby increasing crashes. Potential sight distance issues for driveways or at intersections.`,
      },
      {
        score: 'low_positive_effect',
        description: `All else is equal, decreased likelihood of double parking (hazardous behavior); street parking can act as traffic calming and serves as a buffer to sidewalks and some bicycle facilities.`,
      },
    ],
    economic: [
      {
        score: 'medium_positive_effect',
        description: `Increases access to commercial uses, if managed appropriately; improves ability to serve for loading/unloading delivery vehicles; and may improve customer access (finding parking) for businesses without off-street parking.`,
      },
    ],
    environmental: [
      {
        score: 'medium_positive_effect',
        description: `Decreased circling for parking and associated pollution -- provided all else equal, and that street parking constitutes a meaningful share of area parking.`,
      },
    ],
    accessToDestinations: [
      {
        score: 'low_positive_effect',
        description: `All else equal, decreases amount of time spent circling for parking, with increased utility for motorists.`,
      },
    ],
    modeShift: [
      {
        score: 'high_adverse_effect',
        description: `Increasing parking supply can decrease barriers to driving, increasing propensity of driving.`,
      },
    ],
  },
];
