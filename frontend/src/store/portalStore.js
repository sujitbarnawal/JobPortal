import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const portalStore = (set) => ({
  authLoading: false,
  setAuthLoading: (loadingVal) => set({ authLoading: loadingVal }),
  user: null, 
  setUser: (userData) => set({ user: userData }),
  jobs:[],
  getAllJobs: async()=>{
    try {
      const response= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/job/get`)
      if(response.data.success){
        set({jobs:response.data.jobs})
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  },
  searchedQuery:"",
  setSearchedQuery:(queryVal)=>set({searchedQuery:queryVal}),
  selectedValues:[],
  setSelectedValues:(value)=>set({selectedValues:value})
});

const usePortalStore = create(
  devtools(
    persist(portalStore, {
      name: "portal-store",
    })
  )
);

export default usePortalStore;