export const getRecommendations = async () =>  {
   return await fetch(`http://directus.bsqgroup.co.uk/items/recommendations/?fields=*.*.*`)
   .then(data => data.json())
}

export const getRecommendationByName = (recommendations: any, name: string) => {
   return recommendations.find((q: any) => q.name === name);
}