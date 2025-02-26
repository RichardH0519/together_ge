/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_REACT_BACKEND_API_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }