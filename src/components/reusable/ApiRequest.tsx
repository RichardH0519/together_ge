import { useEffect, useState } from 'react';
import axios from 'axios';

// Set default configuration for Axios
axios.defaults.baseURL = "https://k7kzqi2tnl.execute-api.ap-southeast-2.amazonaws.com";
axios.defaults.headers.post['Content-Type'] = 'application/json';

const useApiRequest = (endpoint: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Create a cache variable to store fetched data
  const cacheKey = `apiData-${endpoint}`;
  const cachedData = localStorage.getItem(cacheKey);
  
  useEffect(() => {
    if (cachedData) {
      setData(JSON.parse(cachedData)); // Set data from cache
      setLoading(false);
    } else {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/${endpoint}`);
          setData(response.data.records);
          localStorage.setItem(cacheKey, JSON.stringify(response.data.records)); // Cache the data
        } catch (error) {
          setError(error instanceof Error ? error : new Error(String(error)));
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [endpoint, cachedData]); // Only run when endpoint changes or no cached data

  return { data, loading, error };
};

export default useApiRequest;
