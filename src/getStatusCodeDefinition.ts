import {getReasonPhrase} from 'http-status-codes';

export const getCodeDefinition = (code: string) => {
  try {
    const phrase = getReasonPhrase(code);
    return `Code ${code}: ${phrase}\n`;
  } catch (error) {
    return `Code ${code}: I dont know about code "${code}" mate, or I am yet to learn about it \n`;
  }
};
