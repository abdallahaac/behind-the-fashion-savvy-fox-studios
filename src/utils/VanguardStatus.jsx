import { ecoVanguard, ethicsVanguard, wealthVanguard } from './VanguardResponses';

const updateVanguardStatus = (vanguard, stage, scores, setVanguardStatus, updateHearts, updateFunds, displayUI) => {
    let newStatus = { eco: 'neutral', ethics: 'neutral', wealth: 'neutral' };

    switch (vanguard) {
        case 'eco':
            if (stage === 'fabric') {
                if (scores.sustainability > 2.25) {
                    return ecoVanguard[stage].good;
                } else if (scores.sustainability > 1.25) {
                    newStatus.eco = 'neutral';
                    updateHearts(ecoVanguard[0].fabricFeedback.neutral.hearts);
                    updateFunds(ecoVanguard[0].fabricFeedback.neutral.funding);
                    displayUI(ecoVanguard[0].fabricFeedback.neutral);
                } else {
                    newStatus.eco = 'bad';
                    updateHearts(ecoVanguard[0].fabricFeedback.bad.hearts);
                    updateFunds(ecoVanguard[0].fabricFeedback.bad.funding);
                    displayUI(ecoVanguard[0].fabricFeedback.bad);
                }
            } else if (stage === 'manufacturing') {
                if (scores.sustainability === 3) {
                    newStatus.eco = 'good';
                    updateHearts(ecoVanguard[0].manufacturingFeedback.good.hearts);
                    updateFunds(ecoVanguard[0].manufacturingFeedback.good.funding);
                    displayUI(ecoVanguard[0].manufacturingFeedback.good);
                } else if (scores.sustainability === 2) {
                    newStatus.eco = 'neutral';
                    updateHearts(ecoVanguard[0].manufacturingFeedback.neutral.hearts);
                    updateFunds(ecoVanguard[0].manufacturingFeedback.neutral.funding);
                    displayUI(ecoVanguard[0].manufacturingFeedback.neutral);
                } else {
                    newStatus.eco = 'bad';
                    updateHearts(ecoVanguard[0].manufacturingFeedback.bad.hearts);
                    updateFunds(ecoVanguard[0].manufacturingFeedback.bad.funding);
                    displayUI(ecoVanguard[0].manufacturingFeedback.bad);
                }
            }
            break;
        case 'ethics':
            if (stage === 'clothing') {
                if (scores.ethics >= 2) {
                    newStatus.ethics = 'good';
                    updateHearts(ethicsVanguard[0].collectionFeedback.good.hearts);
                    updateFunds(ethicsVanguard[0].collectionFeedback.good.funding);
                    displayUI(ethicsVanguard[0].collectionFeedback.good);
                } else if (scores.ethics<2 && scores.ethics > 1) {
                    newStatus.ethics = 'neutral';
                    updateHearts(ethicsVanguard[0].collectionFeedback.neutral.hearts);
                    updateFunds(ethicsVanguard[0].collectionFeedback.neutral.funding);
                    displayUI(ethicsVanguard[0].collectionFeedback.neutral);
                } else {
                    newStatus.ethics = 'bad';
                    updateHearts(ethicsVanguard[0].collectionFeedback.bad.hearts);
                    updateFunds(ethicsVanguard[0].collectionFeedback.bad.funding);
                    displayUI(ethicsVanguard[0].collectionFeedback.bad);
                }
            } else if (stage === 'fabric') {
                if (scores.ethics > 2.5) {
                    newStatus.ethics = 'good';
                    updateHearts(ethicsVanguard[0].fabricFeedback.good.hearts);
                    updateFunds(ethicsVanguard[0].fabricFeedback.good.funding);
                    displayUI(ethicsVanguard[0].fabricFeedback.good);
                } else if (scores.ethics > 1.5) {
                    newStatus.ethics = 'neutral';
                    updateHearts(ethicsVanguard[0].fabricFeedback.neutral.hearts);
                    updateFunds(ethicsVanguard[0].fabricFeedback.neutral.funding);
                    displayUI(ethicsVanguard[0].fabricFeedback.neutral);
                } else {
                    newStatus.ethics = 'bad';
                    updateHearts(ethicsVanguard[0].fabricFeedback.bad.hearts);
                    updateFunds(ethicsVanguard[0].fabricFeedback.bad.funding);
                    displayUI(ethicsVanguard[0].fabricFeedback.bad);
                }
            } else if (stage === 'manufacturing') {
                if (scores.ethics === 3) {
                    newStatus.ethics = 'good';
                    updateHearts(ethicsVanguard[0].manufacturingFeedback.good.hearts);
                    updateFunds(ethicsVanguard[0].manufacturingFeedback.good.funding);
                    displayUI(ethicsVanguard[0].manufacturingFeedback.good);
                } else if (scores.ethics === 2) {
                    newStatus.ethics = 'neutral';
                    updateHearts(ethicsVanguard[0].manufacturingFeedback.neutral.hearts);
                    updateFunds(ethicsVanguard[0].manufacturingFeedback.neutral.funding);
                    displayUI(ethicsVanguard[0].manufacturingFeedback.neutral);
                } else {
                    newStatus.ethics = 'bad';
                    updateHearts(ethicsVanguard[0].manufacturingFeedback.bad.hearts);
                    updateFunds(ethicsVanguard[0].manufacturingFeedback.bad.funding);
                    displayUI(ethicsVanguard[0].manufacturingFeedback.bad);
                }
            }
            break;
        case 'wealth':
            if (stage === 'clothing') {
                if (scores.cost <= 71000) {
                    newStatus.wealth = 'good';
                    updateHearts(wealthVanguard[0].collectionFeedback.good.hearts);
                    updateFunds(wealthVanguard[0].collectionFeedback.good.funding);
                    displayUI(wealthVanguard[0].collectionFeedback.good);
                } else if (scores.cost <= 122000) {
                    newStatus.wealth = 'neutral';
                    updateHearts(wealthVanguard[0].collectionFeedback.neutral.hearts);
                    updateFunds(wealthVanguard[0].collectionFeedback.neutral.funding);
                    displayUI(wealthVanguard[0].collectionFeedback.neutral);
                } else {
                    newStatus.wealth = 'bad';
                    updateHearts(wealthVanguard[0].collectionFeedback.bad.hearts);
                    updateFunds(wealthVanguard[0].collectionFeedback.bad.funding);
                    displayUI(wealthVanguard[0].collectionFeedback.bad);
                }
            } else if (stage === 'fabric') {
                if (scores.cost <= 70000) {
                    newStatus.wealth = 'good';
                    updateHearts(wealthVanguard[0].fabricFeedback.good.hearts);
                    updateFunds(wealthVanguard[0].fabricFeedback.good.funding);
                    displayUI(wealthVanguard[0].fabricFeedback.good);
                } else if (scores.cost <= 175000) {
                    newStatus.wealth = 'neutral';
                    updateHearts(wealthVanguard[0].fabricFeedback.neutral.hearts);
                    updateFunds(wealthVanguard[0].fabricFeedback.neutral.funding);
                    displayUI(wealthVanguard[0].fabricFeedback.neutral);
                } else {
                    newStatus.wealth = 'bad';
                    updateHearts(wealthVanguard[0].fabricFeedback.bad.hearts);
                    updateFunds(wealthVanguard[0].fabricFeedback.bad.funding);
                    displayUI(wealthVanguard[0].fabricFeedback.bad);
                }
            } else if (stage === 'manufacturing') {
                if (scores.cost < 60000 && scores.cost > 25000) {
                    newStatus.wealth = 'good';
                    updateHearts(wealthVanguard[0].manufacturingFeedback.good.hearts);
                    updateFunds(wealthVanguard[0].manufacturingFeedback.good.funding);
                    displayUI(wealthVanguard[0].manufacturingFeedback.good);
                } else if (scores.cost >= 60000) {
                    newStatus.wealth = 'neutral';
                    updateHearts(wealthVanguard[0].manufacturingFeedback.neutral.hearts);
                    updateFunds(wealthVanguard[0].manufacturingFeedback.neutral.funding);
                    displayUI(wealthVanguard[0].manufacturingFeedback.neutral);
                } else {
                    newStatus.wealth = 'bad';
                    updateHearts(wealthVanguard[0].manufacturingFeedback.bad.hearts);
                    updateFunds(wealthVanguard[0].manufacturingFeedback.bad.funding);
                    displayUI(wealthVanguard[0].manufacturingFeedback.bad);
                }
            }
            break;
        default:
            break;
    }

    setVanguardStatus(newStatus);
};

export default updateVanguardStatus;