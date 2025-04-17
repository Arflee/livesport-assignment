export enum EntityType {
  Competition = 1,
  Team = 2,
  IndividualPlayer = 3,
  TeamPlayer = 4
}

export default interface Entity {
  id: string;
  url: string;
  gender: {
    id: string;
    name: string;
  }
  name: string;
  type: {
    id: number;
    name: string;
  }
  participantTypes: [
    {
      id: number;
      name: string;
    }
  ]
  sport: {
    id: number,
    name: string
  }
  favouriteKey: {
    web: string;
    portable: string;
  }
  defaultCountry: {
    id: number;
    name: string;
    images: [
      {
        path: string;
        usageId: number;
        variantTypeId: number;
      }
    ]
  }
  images: [
    {
      path: string;
      usageId: number;
      variantTypeId: number;
    }
  ]
  teams: [
    {
      id: string;
      name: string;
      kind: string;
      participantType: {
        id: number;
        name: string;
      }
    }
  ]
}