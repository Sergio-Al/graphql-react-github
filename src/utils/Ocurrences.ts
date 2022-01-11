type Reaction = {
  node: {
    content: string;
    id: string;
  };
};

interface Ocurrences {
  [key: string]: number;
}

export function ocurrencesReactions(arr: Array<Reaction>) {
  const ocurrences: Ocurrences = {};
  return arr.reduce(function (total, current) {
    total[current.node.content] = total[current.node.content] + 1 || 1;
    return total;
  }, ocurrences);   
}
