
import { useEffect, useState } from "react"
import { AxiosRequestConfig } from "axios";
import { CanceledError } from "../services/api-pefa"
import apiExoclick from "@/services/api-exoclick";

export interface Zones {
    "id": 0,
    "idsite": 0,
    "site_name": "string",
    "name": "string",
    "publisher_ad_type": 0,
    "pricing_models": [
        0
    ],
    "border_color": "string",
    "size": "468x60",
    "border": "1",
    "minimum_cpm": 0,
    "alternate_html": "string",
    "alternate_url": "string",
    "premium": "-1",
    "idname": 0,
    "im_capping": 0,
    "sound_enabled": 0,
    "slider_on_complete": "hide",
    "branding_enabled": 1,
    "maximum_width": 500,
    "in_stream_skip_after": 0,
    "pop_trigger_method": 1,
    "pop_trigger_classes": "class1, class2",
    "popup_fallback": 0,
    "popup_force": 0,
    "new_tab": 0,
    "chrome_enabled": 0,
    "frequency_trigger_type": 0,
    "first_trigger_clicks": 0,
    "next_trigger_clicks": 0,
    "native_ad_configuration": {
        "format": 0,
        "font_family": "string",
        "widget_background_color": "string",
        "widget_width": 0,
        "widget_height": 0,
        "minimum_width_for_full_sized_layout": 0,
        "item_height": 0,
        "item_padding": 0,
        "mobile_responsive_type": 0,
        "open_in_new_window": 0,
        "header_enabled": 0,
        "header_font_size": 0,
        "header_font_color": "string",
        "header_is_on_top": 0,
        "header_text_align": "string",
        "title_enabled": 0,
        "title_font_size": 0,
        "title_font_color": "string",
        "title_font_weight": 0,
        "title_decoration": 0,
        "title_hover_color": "string",
        "title_hover_font_weight": 0,
        "title_hover_decoration": 0,
        "description_font_size": 0,
        "description_font_color": "string",
        "description_font_weight": 0,
        "description_decoration": 0,
        "description_hover_color": "string",
        "description_hover_font_weight": 0,
        "description_hover_decoration": 0,
        "is_responsive_zone": 0,
        "postback_url": "string",
        "description_enabled": 0,
        "brand_enabled": 0,
        "brand_font_size": 0,
        "brand_font_color": "string",
        "brand_font_weight": "0",
        "brand_decoration": "0",
        "image_height": 0,
        "image_width": 0,
        "image_border_size": "string",
        "image_border_color": "string",
        "customcss_enabled": 0,
        "customcss": "string",
        "text_margin_top": 0,
        "text_margin_bottom": 0,
        "text_position": "bottom",
        "text_box_size": "string",
        "text_align": "left",
        "mobile_breakpoint": 0,
        "spacing_h": 0,
        "spacing_v": 0,
        "zoom": 0,
        "mobile_limit_per_row": 0,
        "mobile_limit_per_col": 0,
        "mobile_image_width": 0,
        "mobile_image_height": 0,
        "mobile_text_box_size": 0,
        "mobile_text_enabled": 0,
        "mobile_text_position": 0,
        "text_enabled": 0
    },
    "web_push_notification_configuration": {
        "is_self_hosted": 1,
        "soft_ask": 1,
        "soft_ask_horizontal_position": "left",
        "soft_ask_vertical_position": "top",
        "soft_ask_delay": 0,
        "soft_ask_title_enabled": 1,
        "soft_ask_title": "string",
        "soft_ask_description": "string",
        "soft_ask_button_yes": "string",
        "soft_ask_button_no": "string"
    },
    "vmap_configuration": {
        "preroll_enabled": true,
        "preroll_max_ads": 0,
        "preroll_ads_settings": {
            "time_offset_start": [
                "start",
                "start"
            ]
        },
        "midroll_enabled": true,
        "midroll_max_ads": 0,
        "midroll_ads_settings": {
            "time_offset_time": [
                "00:00:15.000",
                "00:00:16.000"
            ],
            "time_offset_percentage": [
                "10%",
                "50%"
            ],
            "time_offset_position": [
                "#1",
                "#2"
            ]
        },
        "postroll_enabled": true,
        "postroll_max_ads": 0,
        "postroll_ads_settings": {
            "time_offset_end": [
                "end",
                "end"
            ]
        }
    },
    "interstitial_type": 1,
    "ad_trigger_type": 1,
    "in_video_vast_configuration": {
        "vast_event": "preRoll",
        "vast_offset": 0,
        "vast_offset_unit": "seconds",
        "vast_valign": "top",
        "vast_hide_after_seconds": 0
    },
    "marketing_tags": [
        {
            "id": 0,
            "name": "string"
        }
    ],
    "product_categories": [
        {
            "id": 0,
            "name": "string",
            "parent": 0
        }
    ],
    "compliance_rules": [
        {
            "id": 0,
            "name": "string"
        }
    ],
    "idad_exchange_partner": 0,
    "maximum_screen_density": 20,
    "ad_refresh_rate": 0,
    "cta_overlay_enabled": 1,
    "fallback_ads": 2,
    "vmap_enabled": 1,
    "pop_trigger_delay": 30,
    "capping_enabled": 1,
    "zones": [
        {
            "id": 0,
            "layout": 0,
            "publisher_ad_type": 0,
            "name": "string"
        }
    ],
    "warning": {
        "hasWarning": true,
        "message": [
            "message1",
            "message2"
        ]
    },
    "enable_ad_transparency_dialog": 1,
    "enable_bid_shading": 0,
    "vast_version_id": 1,
    "count_only_viewed_impressions": 1
}

export interface FetchResponse<T> {
    "result": T[],
    "request_metadata": {
        "limit": 0,
        "offset": 0,
        "count": 0
    },
    "count": true
}

export interface SingleZone {
    "id": 0,
    "idsite": 0,
    "site_name": "string",
    "name": "string",
    "publisher_ad_type": 0,
    "pricing_models": [
        0
    ],
    "border_color": "string",
    "size": "468x60",
    "border": "1",
    "minimum_cpm": 0,
    "alternate_html": "string",
    "alternate_url": "string",
    "premium": "-1",
    "idname": 0,
    "im_capping": 0,
    "sound_enabled": 0,
    "slider_on_complete": "hide",
    "branding_enabled": 1,
    "maximum_width": 500,
    "in_stream_skip_after": 0,
    "pop_trigger_method": 1,
    "pop_trigger_classes": "class1, class2",
    "popup_fallback": 0,
    "popup_force": 0,
    "new_tab": 0,
    "chrome_enabled": 0,
    "frequency_trigger_type": 0,
    "first_trigger_clicks": 0,
    "next_trigger_clicks": 0,
    "native_ad_configuration": {
        "format": 0,
        "font_family": "string",
        "widget_background_color": "string",
        "widget_width": 0,
        "widget_height": 0,
        "minimum_width_for_full_sized_layout": 0,
        "item_height": 0,
        "item_padding": 0,
        "mobile_responsive_type": 0,
        "open_in_new_window": 0,
        "header_enabled": 0,
        "header_font_size": 0,
        "header_font_color": "string",
        "header_is_on_top": 0,
        "header_text_align": "string",
        "title_enabled": 0,
        "title_font_size": 0,
        "title_font_color": "string",
        "title_font_weight": 0,
        "title_decoration": 0,
        "title_hover_color": "string",
        "title_hover_font_weight": 0,
        "title_hover_decoration": 0,
        "description_font_size": 0,
        "description_font_color": "string",
        "description_font_weight": 0,
        "description_decoration": 0,
        "description_hover_color": "string",
        "description_hover_font_weight": 0,
        "description_hover_decoration": 0,
        "is_responsive_zone": 0,
        "postback_url": "string",
        "description_enabled": 0,
        "brand_enabled": 0,
        "brand_font_size": 0,
        "brand_font_color": "string",
        "brand_font_weight": "0",
        "brand_decoration": "0",
        "image_height": 0,
        "image_width": 0,
        "image_border_size": "string",
        "image_border_color": "string",
        "customcss_enabled": 0,
        "customcss": "string",
        "text_margin_top": 0,
        "text_margin_bottom": 0,
        "text_position": "bottom",
        "text_box_size": "string",
        "text_align": "left",
        "mobile_breakpoint": 0,
        "spacing_h": 0,
        "spacing_v": 0,
        "zoom": 0,
        "mobile_limit_per_row": 0,
        "mobile_limit_per_col": 0,
        "mobile_image_width": 0,
        "mobile_image_height": 0,
        "mobile_text_box_size": 0,
        "mobile_text_enabled": 0,
        "mobile_text_position": 0,
        "text_enabled": 0
    },
    "web_push_notification_configuration": {
        "is_self_hosted": 1,
        "soft_ask": 1,
        "soft_ask_horizontal_position": "left",
        "soft_ask_vertical_position": "top",
        "soft_ask_delay": 0,
        "soft_ask_title_enabled": 1,
        "soft_ask_title": "string",
        "soft_ask_description": "string",
        "soft_ask_button_yes": "string",
        "soft_ask_button_no": "string"
    },
    "vmap_configuration": {
        "preroll_enabled": true,
        "preroll_max_ads": 0,
        "preroll_ads_settings": {
            "time_offset_start": [
                "start",
                "start"
            ]
        },
        "midroll_enabled": true,
        "midroll_max_ads": 0,
        "midroll_ads_settings": {
            "time_offset_time": [
                "00:00:15.000",
                "00:00:16.000"
            ],
            "time_offset_percentage": [
                "10%",
                "50%"
            ],
            "time_offset_position": [
                "#1",
                "#2"
            ]
        },
        "postroll_enabled": true,
        "postroll_max_ads": 0,
        "postroll_ads_settings": {
            "time_offset_end": [
                "end",
                "end"
            ]
        }
    },
    "interstitial_type": 1,
    "ad_trigger_type": 1,
    "in_video_vast_configuration": {
        "vast_event": "preRoll",
        "vast_offset": 0,
        "vast_offset_unit": "seconds",
        "vast_valign": "top",
        "vast_hide_after_seconds": 0
    },
    "marketing_tags": [
        {
            "id": 0,
            "name": "string"
        }
    ],
    "product_categories": [
        {
            "id": 0,
            "name": "string",
            "parent": 0
        }
    ],
    "compliance_rules": [
        {
            "id": 0,
            "name": "string"
        }
    ],
    "idad_exchange_partner": 0,
    "maximum_screen_density": 20,
    "ad_refresh_rate": 0,
    "cta_overlay_enabled": 1,
    "fallback_ads": 2,
    "vmap_enabled": 1,
    "pop_trigger_delay": 30,
    "capping_enabled": 1,
    "zones": [
        {
            "id": 0,
            "layout": 0,
            "publisher_ad_type": 0,
            "name": "string"
        }
    ],
    "warning": {
        "hasWarning": true,
        "message": [
            "message1",
            "message2"
        ]
    },
    "enable_ad_transparency_dialog": 1,
    "enable_bid_shading": 0,
    "vast_version_id": 1,
    "count_only_viewed_impressions": 1
}

export interface FetchSingleResponse<T> {
    "result": {
        "zone": T
    }
    ,
    "request_metadata": {
        "limit": 0,
        "offset": 0,
        "count": 0
    }
}

function useExo<T>(endpoint: string, requestConfig?: AxiosRequestConfig, dep?: any[]) {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)

        const controller = new AbortController();

        apiExoclick
            .get<FetchResponse<T>>(endpoint, { signal: controller.signal, ...requestConfig })
            .then(response => {
                setData(response.data.result)
                setLoading(false)
            })
            .catch(error => {
                if (error instanceof CanceledError) return;
                setError(error);
                // switch (error.status) {
                //     case 400:
                //     case 404:
                //     case 401:
                //     case 403:
                //         setError(error.response.data.message);
                //         break;
                //     case 500:
                //         if (error.response.data.message === "jwt malformed") {
                //             setError("Please log in first.");
                //         }
                //         else if (error.response.data.message === "jwt expired") {
                //             setError("Please refresh.");
                //         }
                //         else {
                //             setError(error.response.data.message);
                //         }
                //         break;
                //     default:
                //         setError("Error Status Code 500! An unexpected error occurred");
                // }
                setLoading(false)
            })

        return () => {
            controller.abort()
        }
    }, dep ? [...dep] : [])

    return { data, error, loading };
}

export function useSingleExo<T>(endpoint: string, requestConfig?: AxiosRequestConfig, dep?: any[]) {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)

        const controller = new AbortController();

        apiExoclick
            .get<FetchSingleResponse<T>>(endpoint, { signal: controller.signal, ...requestConfig })
            .then(response => {
                setData(response.data.result.zone)
                setLoading(false)
            })
            .catch(error => {
                if (error instanceof CanceledError) return;
                setError(error)
                // switch (error.status) {
                //     case 400:
                //     case 404:
                //     case 401:
                //     case 403:
                //         setError(error.response.data.message);
                //         break;
                //     case 500:
                //         if (error.response.data.message === "jwt malformed") {
                //             setError("Please log in first.");
                //         }
                //         else if (error.response.data.message === "jwt expired") {
                //             setError("Please refresh.");
                //         }
                //         else {
                //             setError(error.response.data.message);
                //         }
                //         break;
                //     default:
                //         setError("Error Status Code 500! An unexpected error occurred");
                // }
                setLoading(false)
            })

        return () => {
            controller.abort()
        }
    }, dep ? [...dep] : [])

    return { data, error, loading };
}

export default useExo;