import { assistantData, allVanguards, ecoVanguard, ethicsVanguard, wealthVanguard } from './VanguardResponses';

export const updateVanguardStatus = (vanguard, stage, scores, hearts, mostLikedBy=null) => {

    switch (vanguard) {
        case 'assistant':
            if(stage === 'introduction'){
                return assistantData[0].introduction;
           
            } else if(stage === 'final'){
                return assistantData[0].finalFeedback;

            } 
        
        case 'allVanguards':
            if(stage === 'brand'){
                return allVanguards[0].brand;
            }
            else if (stage === 'finalPersona'){
                if(mostLikedBy === 'eco'){
                    return allVanguards[0].finalPersonaEco;
                }
                else if(mostLikedBy === 'ethics'){
                    return allVanguards[0].finalPersonaEthics;
                }
                else if(mostLikedBy === 'wealth'){
                    return allVanguards[0].finalPersonaWealth;
                }
                else if(mostLikedBy === 'vanguardVisionary'){
                    return allVanguards[0].finalPersonaVanguardVisionary;
                }else if(mostLikedBy === 'trueArtisan'){
                    return allVanguards[0].finalPersonaTrueArtisan;

                }else if(mostLikedBy === 'consciousBuilder'){
                    return allVanguards[0].finalPersonaConsciousBuilder;

                }else if(mostLikedBy === 'ecoEconomist'){
                    return allVanguards[0].finalPersonaEcoEconomist;

                }else if(mostLikedBy === 'hiddenLabel'){
                    return allVanguards[0].finalPersonaHiddenLabel;
                }else{
                    console.log("didn't fit into a category");
                    return;
                }
            }
        
        
        case 'eco':
            if (stage === 'fabric') {
                if (scores.averageSustainability > 2.25) {
                    return ecoVanguard[0].fabricFeedback.good;
                } else if (scores.averageSustainability > 1.25) {
                    return ecoVanguard[0].fabricFeedback.neutral;
                } else {
                    return ecoVanguard[0].fabricFeedback.bad;
                }
            } else if (stage === 'manufacturing') {
                if (scores.averageSustainability === 3) {
                    return ecoVanguard[0].manufacturingFeedback.good;
                } else if (scores.averageSustainability === 2) {
                    return ecoVanguard[0].manufacturingFeedback.neutral;
                } else {
                    return ecoVanguard[0].manufacturingFeedback.bad;
                }
            } else if (stage=='final'){
                if (hearts >= 4){
                    return ecoVanguard[0].finalFeedback.good;
                }
                else if (hearts > 2 && hearts < 4){
                    return ecoVanguard[0].finalFeedback.neutral;
                }
                else{
                    return ecoVanguard[0].finalFeedback.bad;
                }

            }else {
                return { img_path: '', description: 'No feedback available for this stage.', funding: 0, hearts: 0 };
            }
        case 'ethics':
            if (stage === 'clothing') {
                if (scores.averageEthics >= 2) {
                    return ethicsVanguard[0].collectionFeedback.good;
                } else if (scores.averageEthics < 2 && scores.averageEthics > 1) {
                    return ethicsVanguard[0].collectionFeedback.neutral;
                } else {
                    return ethicsVanguard[0].collectionFeedback.bad;
                }
            } else if (stage === 'fabric') {
                if (scores.averageEthics > 2.5) {
                    return ethicsVanguard[0].fabricFeedback.good;
                } else if (scores.averageEthics > 1.5) {
                    return ethicsVanguard[0].fabricFeedback.neutral;
                } else {
                    return ethicsVanguard[0].fabricFeedback.bad;
                }
            } else if (stage === 'manufacturing') {
                if (scores.averageEthics === 3) {
                    return ethicsVanguard[0].manufacturingFeedback.good;
                } else if (scores.averageEthics === 2) {
                    return ethicsVanguard[0].manufacturingFeedback.neutral;
                } else {
                    return ethicsVanguard[0].manufacturingFeedback.bad;
                }
            } else if (stage=='final'){
                if (hearts >= 4){
                    return ethicsVanguard[0].finalFeedback.good;
                }
                else if (hearts > 2 && hearts < 4){
                    return ethicsVanguard[0].finalFeedback.neutral;
                }
                else{
                    return ethicsVanguard[0].finalFeedback.bad;
                }

            }
            break;
        case 'wealth':
            if (stage === 'clothing') {
                if (scores.averageCost <= 79000) {
                    return wealthVanguard[0].collectionFeedback.good;
                } else if ( scores.averageCost > 79001 && scores.averageCost <= 116900) {
                    return wealthVanguard[0].collectionFeedback.neutral;
                } else {
                    return wealthVanguard[0].collectionFeedback.bad;
                }
            } else if (stage === 'fabric') {
                if (scores.averageCost <= 70000) {
                    return wealthVanguard[0].fabricFeedback.good;
                } else if (scores.averageCost > 70000 && scores.averageCost <= 175000) {
                    return wealthVanguard[0].fabricFeedback.neutral;
                } else {
                    return wealthVanguard[0].fabricFeedback.bad;
                }
            } else if (stage === 'manufacturing') {
                if (scores.averageCost < 60000 && scores.averageCost > 25000) {
                    return wealthVanguard[0].manufacturingFeedback.good;
                } else if (scores.averageCost >= 60000) {
                    return wealthVanguard[0].manufacturingFeedback.neutral;
                } else {
                    return wealthVanguard[0].manufacturingFeedback.bad;
                }
            } else if (stage=='final'){
                if (hearts >= 4){
                    return wealthVanguard[0].finalFeedback.good;
                }
                else if (hearts > 2 && hearts < 4){
                    return wealthVanguard[0].finalFeedback.neutral;
                }
                else{
                    return wealthVanguard[0].finalFeedback.bad;
                }

            }
            break;
        default:
            return { img_path: '', description: 'No feedback available for this vanguard.', funding: 0, hearts: 0 };
    }
}