export const ValorantAPI = async (
  endpoint: string,
  query?: string,
) => {
  if (!query) {
    try {
      const response = await fetch(`https://valorant-api.com/v1/${endpoint}`);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('[VALORANT-API]', error);
    }
  }

  try {
    const response = await fetch(`https://valorant-api.com/v1/${endpoint}/${query}`);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('[VALORANT-API]', error);
    }
}