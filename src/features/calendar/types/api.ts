export interface ApiResponse {
  Events: ApiEvent[];
  TotalCount: number;
}

export interface ApiEvent {
  _id: string;
  IsLive: boolean;
  IsSuspended: boolean;
  IsTeamSwap: boolean;
  IsTopLeague: boolean;
  LeagueGroupId: string;
  LeagueId: string;
  LeagueOrder: number;
  LiveGameState: ApiLiveGameState;
  MarketGroups: string[];
  MasterLeagueId: string;
  Metadata: ApiEventMetadata;
  RegionCode: string;
  Score: ApiScore;
  Settings: ApiEventSettings;
  SportId: string;
  SportOrder: number;
  StartEventDate: string;
  Status: number;
  Timestamps: ApiTimestamps;
  TotalActiveMarketsCount: number;
  TotalMarketsCount: number;
  Type: string;
  EventName: string;
  BetslipLine: string;
  SportName: string;
  RegionName: string;
  LeagueName: string;
  UrlLeagueName: string;
  UrlRegionName: string;
  UrlSportName: string;
  UrlEventName: string;
  Participants: ApiParticipant[];
  IsEarlyPayout: boolean;
  Markets: ApiMarket[];
}

export interface ApiLiveGameState {
  ClockRunning: boolean;
  ClockDirection: number;
  GameTimeBFFGotAt: number;
}

export interface ApiEventMetadata {
  HomeShirtColorPrimary?: string;
  AwayShirtColorPrimary?: string;
}

export interface ApiScore {
  AwayScore: string;
  HomeScore: string;
  CombinedSecondTierScores: unknown[];
  AdditionalScores: Record<string, unknown>;
}

export interface ApiEventSettings {
  IsBetBuilderEnabled: boolean;
  HasStatistics: boolean;
}

export interface ApiTimestamps {
  EventCreation: string;
  ScoreUpdate: string;
  StatusUpdate: string;
}

export interface ApiParticipant {
  _id: string;
  Name: string;
  Country: string;
  VenueRole: "Home" | "Away";
}

export interface ApiMarket {
  _id: string;
  ComboBonuses: unknown[];
  EventId: string;
  InMarketGroups: ApiMarketGroupEntry[];
  IsLive: boolean;
  IsSuspended: boolean;
  LeagueId: string;
  MarketGroupOrder: number;
  MarketOrder: number;
  MarketTableRole: string;
  MarketType: ApiMarketType;
  SplitTypeId: number;
  SportId: string;
  StartDate: string;
  Tags: unknown[];
  UPDATE_TIMESTAMP: string;
  BetslipLine: string;
  Name: string;
  TemplateGroupSettings: unknown[];
  Selections: ApiSelection[];
  NewGroups: unknown;
  NewInMarketGroups: unknown;
  IsEarlyPayout: boolean;
}

export interface ApiMarketGroupEntry {
  _id: string;
  SortingKey: number;
  Name: string;
}

export interface ApiMarketType {
  _id: string;
  Name: string;
  IsCastMarket: boolean;
  LineTypeName: string;
  LineTypeId: number;
  RecommendedOddsStyle: string;
}

export interface ApiSelection {
  _id: string;
  MarketId: string;
  EventId: string;
  Side: number;
  Type: number;
  TypeName: string;
  BetslipLine: string;
  IsDisabled: boolean;
  Name: string;
  IsOption: boolean;
  DisplayOdds: ApiDisplayOdds;
  TrueOdds: number;
  OutcomeType: string;
  Points?: number;
  Group: number;
  Status: number;
  QAParam1: number;
  QAParam2: number;
  TemplateOddsSettingsIndex: number;
  TemplateGroupSettingsIndex: number;
  TemplateCashoutSettingsIndex: number;
  Metadata: Record<string, unknown>;
}

export interface ApiDisplayOdds {
  Decimal: string;
  Malay: string;
  HK: string;
  Indo: string;
  American: string;
  Fractional: string;
}
