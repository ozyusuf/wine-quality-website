import React, { Suspense } from 'react';
import PresentationLayout, { Slide } from '../components/layout/PresentationLayout';
import SlideIntro from '../components/slides/SlideIntro';
import SlideDefiningTarget from '../components/slides/SlideDefiningTarget';
import SlideStatistics from '../components/slides/SlideStatistics';
import SlidePipeline from '../components/slides/SlidePipeline';
import SlideRedWine from '../components/slides/SlideRedWine';
import SlideWhiteWine from '../components/slides/SlideWhiteWine';
import SlideExperiment from '../components/slides/SlideExperiment';
import SlideConclusion from '../components/slides/SlideConclusion';
import SlideDeployment from '../components/slides/SlideDeployment';
import SlideBusinessValue from '../components/slides/SlideBusinessValue';
import SlideResources from '../components/slides/SlideResources';

const ModelDemo = React.lazy(() => import('../components/ModelDemo'));

function Home() {
    return (
        <PresentationLayout>
            {/* Slide 1: Hero / Introduction */}
            <Slide className="bg-gradient-to-br from-black to-wine-darkRed/20">
                <SlideIntro />
            </Slide>

            {/* Slide 2: Defining the Target */}
            <Slide className="bg-black">
                <SlideDefiningTarget />
            </Slide>

            {/* Slide 3: Dataset Stats */}
            <Slide className="bg-gradient-to-bl from-black to-tech-surface">
                <SlideStatistics />
            </Slide>

            {/* Slide 4-5: Pipeline */}
            <Slide className="bg-black">
                <SlidePipeline />
            </Slide>

            {/* Slide 6-8: Case Study 1 - Red Wine */}
            <Slide className="bg-black relative">
                <div className="absolute inset-0 bg-wine-red/5 pointer-events-none" />
                <SlideRedWine />
            </Slide>

            {/* Slide 9-10: Case Study 2 - White Wine */}
            <Slide className="bg-black relative">
                <div className="absolute inset-0 bg-wine-gold/5 pointer-events-none" />
                <SlideWhiteWine />
            </Slide>

            {/* Slide 11-12: Scientific Experiment */}
            <Slide className="bg-gradient-to-r from-tech-dark to-black">
                <SlideExperiment />
            </Slide>

            {/* Slide 13-14: Results */}
            <Slide className="bg-black">
                <SlideConclusion />
            </Slide>

            {/* Slide 15: Deployment */}
            <Slide className="bg-black">
                <SlideDeployment />
            </Slide>

            {/* Slide 16: Business Value */}
            <Slide className="bg-gradient-to-t from-black to-wine-darkRed/30">
                <SlideBusinessValue />
            </Slide>

            {/* Slide 17: Live Inference Demo */}
            <Slide className="bg-black/90 relative p-0">
                <Suspense fallback={
                    <div className="h-full w-full flex flex-col items-center justify-center gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wine-red"></div>
                        <p className="text-wine-red font-mono text-sm animate-pulse">Initializing AI Runtime...</p>
                    </div>
                }>
                    <ModelDemo />
                </Suspense>
            </Slide>

            {/* Slide 18: Resources */}
            <Slide className="bg-black relative">
                <div className="absolute inset-0 bg-gradient-to-br from-wine-red/10 via-black to-black pointer-events-none" />
                <SlideResources />
            </Slide>
        </PresentationLayout>
    );
}

export default Home;
