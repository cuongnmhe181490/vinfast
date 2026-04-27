export type AnalyticsEventName =
  | "view_car_detail"
  | "interact_3d_rotate"
  | "interact_3d_explode"
  | "interact_3d_interior"
  | "select_color"
  | "compare_add_car"
  | "compare_view_difference"
  | "click_official_source"
  | "click_test_drive_cta";

export type AnalyticsPayload = Record<string, string | number | boolean | null>;

type AnalyticsAdapter = {
  track: (eventName: AnalyticsEventName, payload?: AnalyticsPayload) => void;
};

let adapter: AnalyticsAdapter | null = null;

export function setAnalyticsAdapter(nextAdapter: AnalyticsAdapter) {
  adapter = nextAdapter;
}

export function trackEvent(eventName: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  adapter?.track(eventName, payload);
}
