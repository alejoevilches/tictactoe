import { WINNER_COMBOS } from "../constants";

export const checkWinner=(boardToCheck)=>{
    for (const combos of WINNER_COMBOS){
      const [a,b,c]=combos;
      if (boardToCheck[a] && boardToCheck[a]==boardToCheck[b] && boardToCheck[a]==boardToCheck[c]){
        return boardToCheck[a];
      }
    }
    return null
  }