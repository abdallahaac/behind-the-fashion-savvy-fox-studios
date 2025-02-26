import { ecoVanguard, ethicsVanguard, wealthVanguard } from './VanguardResponses';

const updateVanguardStatus = (vanguard, stage, scores) => {
    let newStatus = { eco: 'neutral', ethics: 'neutral', wealth: 'neutral' };

    switch (vanguard) {
        case 'eco':
            if (stage === 'fabric') {
                if (scores.sustainability > 2.25) {
                    return ecoVanguard[0].fabricFeedback.good;
                } else if (scores.sustainability > 1.25) {
                    return ecoVanguard[0].fabricFeedback.neutral;
                } else {
                    return ecoVanguard[0].fabricFeedback.bad;
                }
            } else if (stage === 'manufacturing') {
                if (scores.sustainability === 3) {
                    return ecoVanguard[0].manufacturingFeedback.good;
                } else if (scores.sustainability === 2) {
                    return ecoVanguard[0].manufacturingFeedback.neutral;
                } else {
                    return ecoVanguard[0].manufacturingFeedback.bad;
                }
            }
            break;
        case 'ethics':
            if (stage === 'clothing') {
                if (scores.ethics >= 2) {
                    return ethicsVanguard[0].collectionFeedback.good;
                } else if (scores.ethics < 2 && scores.ethics > 1) {
                    return ethicsVanguard[0].collectionFeedback.neutral;
                } else {
                    return ethicsVanguard[0].collectionFeedback.bad;
                }
            } else if (stage === 'fabric') {
                if (scores.ethics > 2.5) {
                    return ethicsVanguard[0].fabricFeedback.good;
                } else if (scores.ethics > 1.5) {
                    return ethicsVanguard[0].fabricFeedback.neutral;
                } else {
                    return ethicsVanguard[0].fabricFeedback.bad;
                }
            } else if (stage === 'manufacturing') {
                if (scores.ethics === 3) {
                    return ethicsVanguard[0].manufacturingFeedback.good;
                } else if (scores.ethics === 2) {
                    return ethicsVanguard[0].manufacturingFeedback.neutral;
                } else {
                    return ethicsVanguard[0].manufacturingFeedback.bad;
                }
            }
            break;
        case 'wealth':
            if (stage === 'clothing') {
                if (scores.cost <= 71000) {
                    return wealthVanguard[0].collectionFeedback.good;
                } else if (scores.cost <= 122000) {
                    return wealthVanguard[0].collectionFeedback.neutral;
                } else {
                    return wealthVanguard[0].collectionFeedback.bad;
                }
            } else if (stage === 'fabric') {
                if (scores.cost <= 70000) {
                    return wealthVanguard[0].fabricFeedback.good;
                } else if (scores.cost <= 175000) {
                    return wealthVanguard[0].fabricFeedback.neutral;
                } else {
                    return wealthVanguard[0].fabricFeedback.bad;
                }
            } else if (stage === 'manufacturing') {
                if (scores.cost < 60000 && scores.cost > 25000) {
                    return wealthVanguard[0].manufacturingFeedback.good;
                } else if (scores.cost >= 60000) {
                    return wealthVanguard[0].manufacturingFeedback.neutral;
                } else {
                    return wealthVanguard[0].manufacturingFeedback.bad;
                }
            }
            break;
        default:
            break;
    }

    // setVanguardStatus(newStatus);
};

export default updateVanguardStatus;