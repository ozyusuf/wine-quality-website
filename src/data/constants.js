export const MODEL_METRICS = {
    redWine: {
        champion: "Random Forest",
        accuracy: 83.82,
        f1Score: 0.55,
        rocAuc: 0.87,
        precision: 0.43,
        recall: 0.51
    },
    whiteWine: {
        champion: "Random Forest",
        accuracy: 81.34,
        f1Score: 0.60,
        rocAuc: 0.85,
        precision: 0.54,
        recall: 0.68
    },
    combined: {
        champion: "XGBoost",
        accuracy: 81.02,
        f1Score: 0.58,
        rocAuc: 0.85
    }
};

export const FEATURE_IMPORTANCE = {
    redWine: [
        { name: "Alcohol", importance: 0.35, direction: "positive" },
        { name: "Volatile Acidity", importance: 0.25, direction: "negative" },
        { name: "Sulphates", importance: 0.15, direction: "positive" },
        { name: "Total SO2", importance: 0.08, direction: "neutral" },
        { name: "Density", importance: 0.07, direction: "negative" }
    ],
    whiteWine: [
        { name: "Alcohol", importance: 0.30, direction: "positive" },
        { name: "Density", importance: 0.22, direction: "negative" },
        { name: "Free SO2", importance: 0.12, direction: "mixed" },
        { name: "Volatile Acidity", importance: 0.10, direction: "negative" },
        { name: "Residual Sugar", importance: 0.08, direction: "neutral" }
    ]
};

export const DATASET_STATS = {
    totalSamples: 6497,
    redWineSamples: 1599,
    whiteWineSamples: 4898,
    features: 11,
    goodWineThreshold: 7,
    trainTestSplit: "80/20"
};

export const FEATURES_CONFIG = [
    { name: 'fixedAcidity', label: 'Fixed Acidity', min: 4, max: 16, step: 0.1, unit: 'g/L', default: 7.0 },
    { name: 'volatileAcidity', label: 'Volatile Acidity', min: 0.1, max: 1.6, step: 0.01, unit: 'g/L', default: 0.3 },
    { name: 'citricAcid', label: 'Citric Acid', min: 0, max: 1, step: 0.01, unit: 'g/L', default: 0.3 },
    { name: 'residualSugar', label: 'Residual Sugar', min: 0.5, max: 20, step: 0.1, unit: 'g/L', default: 5.0 },
    { name: 'chlorides', label: 'Chlorides', min: 0.01, max: 0.2, step: 0.001, unit: 'g/L', default: 0.05 },
    { name: 'freeSulfurDioxide', label: 'Free SO2', min: 1, max: 70, step: 1, unit: 'mg/L', default: 30 },
    { name: 'totalSulfurDioxide', label: 'Total SO2', min: 6, max: 300, step: 1, unit: 'mg/L', default: 120 },
    { name: 'density', label: 'Density', min: 0.99, max: 1.01, step: 0.0001, unit: 'g/cm³', default: 0.995 },
    { name: 'pH', label: 'pH', min: 2.8, max: 4.0, step: 0.01, unit: '', default: 3.2 },
    { name: 'sulphates', label: 'Sulphates', min: 0.3, max: 2, step: 0.01, unit: 'g/L', default: 0.5 },
    { name: 'alcohol', label: 'Alcohol', min: 8, max: 15, step: 0.1, unit: '%', default: 10.5 },
];
