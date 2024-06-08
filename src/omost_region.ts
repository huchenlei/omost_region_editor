export interface IOmostRegion {
    rect: [number, number, number, number];
    prefixes: string[];
    suffixes: string[];
    color: [number, number, number];
}

export const SAMPLE_REGIONS: IOmostRegion[] = [
    {
        "rect": [
            0,
            90,
            0,
            90
        ],
        "prefixes": [
            "An Asian girl sitting on a chair."
        ],
        "suffixes": [
            "The image depicts an Asian girl sitting gracefully on a chair.",
            "She has long, flowing black hair and is wearing a traditional Korean dress, known as a hanbok, which is adorned with intricate floral patterns.",
            "Her posture is relaxed yet elegant, with one hand gently resting on her knee and the other hand holding a delicate fan.",
            "The background is a simple, neutral-colored room with soft, natural light filtering in from a window.",
            "The overall atmosphere is serene and contemplative, capturing a moment of quiet reflection.",
            "Asian girl, sitting, chair, traditional dress, hanbok, floral patterns, long black hair, elegant posture, delicate fan, neutral background, natural light, serene atmosphere, contemplative, quiet reflection, simple room, graceful, intricate patterns, flowing hair, cultural attire, traditional Korean dress, relaxed posture."
        ],
        "color": [
            211,
            211,
            211
        ]
    },
    {
        "color": [
            173,
            216,
            230
        ],
        "rect": [
            5,
            45,
            0,
            55
        ],
        "prefixes": [
            "An Asian girl sitting on a chair.",
            "Window."
        ],
        "suffixes": [
            "The window is a simple, rectangular frame with clear glass panes.",
            "It allows natural light to filter into the room, casting soft, diffused light over the scene.",
            "The window is partially open, with a gentle breeze creating a soft, flowing motion in the curtains.",
            "The view outside is blurred, suggesting a peaceful outdoor setting.",
            "The window adds a sense of openness and connection to the outside world, enhancing the serene and contemplative atmosphere of the image.",
            "window, rectangular frame, clear glass panes, natural light, soft light, diffused light, partially open window, gentle breeze, flowing curtains, blurred view, peaceful outdoor setting, sense of openness, connection to outside, serene atmosphere, contemplative.",
            "The window adds a sense of openness and connection to the outside world.",
            "The style is simple and natural, with a focus on soft light and gentle breeze.",
            "High-quality image with detailed textures and natural lighting."
        ]
    },
    {
        "color": [
            139,
            69,
            19
        ],
        "rect": [
            25,
            85,
            5,
            45
        ],
        "prefixes": [
            "An Asian girl sitting on a chair.",
            "Chair."
        ],
        "suffixes": [
            "The chair on which the girl is sitting is a simple, elegant wooden chair.",
            "It has a smooth, polished finish and a classic design with curved legs and a high backrest.",
            "The chair's wood is a rich, dark brown, adding a touch of warmth to the overall scene.",
            "The girl sits gracefully on the chair, her posture relaxed yet elegant.",
            "The chair complements her traditional Korean dress, enhancing the cultural and elegant atmosphere of the image.",
            "chair, wooden chair, elegant design, curved legs, high backrest, polished finish, dark brown wood, warm touch, traditional Korean dress, cultural attire, elegant posture, graceful sitting, classic design, simple chair, rich wood, polished finish.",
            "The chair adds a touch of warmth and elegance to the overall scene.",
            "The style is classic and simple, with a focus on elegant design and polished finish.",
            "High-quality image with detailed textures and natural lighting."
        ]
    },
    {
        "color": [
            245,
            245,
            220
        ],
        "rect": [
            40,
            90,
            40,
            90
        ],
        "prefixes": [
            "An Asian girl sitting on a chair.",
            "Delicate fan."
        ],
        "suffixes": [
            "The delicate fan held by the girl is a traditional accessory, crafted from fine bamboo with intricate carvings.",
            "The fan is adorned with delicate floral designs, adding to its beauty and cultural significance.",
            "The girl holds the fan gently, its soft movements enhancing the graceful and elegant atmosphere of the image.",
            "The fan is a symbol of refinement and tradition, adding a touch of cultural elegance to the overall scene.",
            "delicate fan, traditional accessory, fine bamboo, intricate carvings, floral designs, cultural significance, graceful holding, soft movements, elegant atmosphere, symbol of refinement, cultural elegance, intricate carvings, delicate floral designs, traditional accessory, fine craftsmanship.",
            "The delicate fan adds a touch of cultural elegance and refinement to the scene.",
            "The style is traditional and refined, with a focus on intricate carvings and delicate designs.",
            "High-quality image with detailed textures and natural lighting."
        ]
    },
    {
        "color": [
            255,
            255,
            240
        ],
        "rect": [
            15,
            75,
            15,
            75
        ],
        "prefixes": [
            "An Asian girl sitting on a chair.",
            "Asian girl."
        ],
        "suffixes": [
            "The Asian girl is the focal point of the image.",
            "She is dressed in a traditional Korean hanbok, which is a beautiful garment made from silk and adorned with intricate floral patterns.",
            "Her black hair is long and flowing, cascading down her back in soft waves.",
            "Her expression is calm and thoughtful, with a slight smile playing on her lips.",
            "She sits gracefully on the chair, her posture relaxed yet elegant.",
            "One hand rests gently on her knee, while the other hand holds a delicate fan, adding a touch of grace to her appearance.",
            "Asian girl, focal point, traditional Korean dress, hanbok, intricate floral patterns, long black hair, flowing hair, calm expression, thoughtful, slight smile, graceful posture, relaxed, elegant, delicate fan, cultural attire.",
            "The atmosphere is serene and contemplative, capturing a moment of quiet reflection.",
            "The style is elegant and traditional, with a focus on cultural attire and graceful posture.",
            "High-quality image with detailed textures and natural lighting."
        ]
    },
    {
        "color": [
            218,
            165,
            32
        ],
        "rect": [
            5,
            65,
            45,
            85
        ],
        "prefixes": [
            "An Asian girl sitting on a chair.",
            "Traditional Korean dress."
        ],
        "suffixes": [
            "The traditional Korean dress, known as a hanbok, is a beautiful garment made from silk.",
            "It is adorned with intricate floral patterns in vibrant colors, including reds, blues, and yellows.",
            "The dress is designed to flow gracefully, with delicate folds and soft movements.",
            "The girl wears the dress with pride, its cultural significance evident in its elegant design and intricate details.",
            "The hanbok complements her graceful posture and adds a touch of cultural elegance to the overall scene.",
            "traditional Korean dress, hanbok, beautiful garment, silk fabric, intricate floral patterns, vibrant colors, reds, blues, yellows, graceful flow, delicate folds, soft movements, cultural significance, elegant design, intricate details, graceful posture, cultural elegance.",
            "The hanbok adds a touch of cultural elegance and intricate beauty to the scene.",
            "The style is traditional and elegant, with a focus on intricate floral patterns and vibrant colors.",
            "High-quality image with detailed textures and natural lighting."
        ]
    }
];