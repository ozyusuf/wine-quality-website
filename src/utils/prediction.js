export function predictWineQuality(features, wineType) {
    // Simplified heuristic based on SHAP insights provided in the prompt
    // features: object with keys matching the config (alcohol, volatileAcidity, etc.)
    // wineType: 'red' or 'white'

    let score = 0;

    // Universal rules (approximate weights based on prompts logic)
    // High alcohol = good
    score += (features.alcohol - 10) * 0.35;

    // High VA = bad (fault indicator)
    score -= features.volatileAcidity * 2.5;

    // Sulphates - good preservative/antioxidant
    score += features.sulphates * 0.8;

    // Wine-type specific adjustments
    if (wineType === 'white') {
        // Lower density preferred for white
        score -= (features.density - 0.995) * 50;

        // Moderate SO2 is good? Prompt said: score += (features.freeSulfurDioxide - 30) * 0.02
        score += (features.freeSulfurDioxide - 30) * 0.02;
    } else {
        // Red wine
        // Citric Acid: Freshness
        score += features.citricAcid * 0.5;
    }

    // Normalize to probability (Sigmoid)
    // Bias adjustment to center around 0.5 for average wines
    const bias = 0.2;
    const probability = 1 / (1 + Math.exp(-(score + bias)));

    const isGood = probability > 0.5;

    return {
        prediction: isGood ? "Premium Quality" : "Standard Quality",
        label: isGood ? "Good (>=7)" : "Standard (<7)",
        quality: isGood ? "Good" : "Average/Bad",
        confidence: Math.round(Math.abs(probability - 0.5) * 200), // Approximate confidence %
        probability: Math.round(probability * 100),
        rawScore: score // good for debug
    };
}
